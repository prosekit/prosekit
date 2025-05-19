/* eslint-disable @typescript-eslint/no-unsafe-return */

import fs from 'node:fs/promises'
import path, { normalize } from 'node:path'

import {
  getPackages,
  type Package,
} from '@manypkg/get-packages'
import Yaml from 'js-yaml'
import JSON5 from 'json5'
import { sortBy } from 'lodash-es'

import { findRootDir } from './find-root-dir.js'
import {
  isPrivatePackage,
  isPublicPackage,
} from './is-public-package.js'
import { isSubDirectory } from './is-sub-directory.js'
import { listGitFiles } from './list-git-files.js'
import { normalizePackageJson } from './normalize-package-json.js'
import { removePath } from './remove-path.js'
import { writeJson } from './write-json.js'
import { writeText } from './write-text.js'

class VirtualFile {
  public distConetnt: string | null = null
  public content: string | null = null
  public deleted = false
  public updated = false

  constructor(public path: string) {}

  get isGenerated() {
    return path.parse(this.path).name.endsWith('.gen')
  }

  async read() {
    if (this.content === null) {
      this.distConetnt = await fs.readFile(await this.getAbsPath(), 'utf8')
      this.content = this.distConetnt
    }
    return this.content
  }

  async readJSON() {
    const text = await this.read()
    return JSON5.parse(text)
  }

  async readYaml() {
    const text = await this.read()
    return Yaml.load(text)
  }

  delete() {
    this.deleted = true
    this.updated = true
    this.content = null
  }

  update(content: string) {
    this.content = content
    this.deleted = false
    this.updated = true
  }

  updateJSON(json: any) {
    this.update(JSON.stringify(json, null, 2) + '\n')
  }

  updateYaml(yaml: any) {
    this.update(Yaml.dump(yaml))
  }

  async commit(): Promise<boolean> {
    const absPath = await this.getAbsPath()

    if (this.deleted) {
      return await removePath(absPath)
    } else if (this.updated) {
      if (this.content === null) {
        throw new Error(`Unable to write ${absPath}: no content provided`)
      }
      if (absPath.endsWith('.json')) {
        return await writeJson(absPath, JSON5.parse(this.content))
      } else {
        return await writeText(absPath, this.content)
      }
    } else {
      return false
    }
  }

  async getAbsPath() {
    return path.join(await findRootDir(), this.path)
  }

  async getLastUpdateTime() {
    const absPath = await this.getAbsPath()
    try {
      const stats = await fs.stat(absPath)
      return stats.mtime.getTime()
    } catch (error) {
      console.error(
        `Error getting file last updated time for ${absPath}:`,
        error,
      )
      return 0
    }
  }
}

class VirtualFileSystem {
  private store: {
    rootDir?: string
    packages?: Package[]
    files?: Map<string, VirtualFile>
  } = {}

  async getRootDir() {
    if (!this.store.rootDir) {
      this.store.rootDir = await findRootDir()
    }
    return this.store.rootDir
  }

  async getPackages() {
    if (!this.store.packages) {
      const { packages } = await getPackages(await this.getRootDir())
      this.store.packages = sortBy(
        sortBy(packages, (pkg) => pkg.packageJson.name),
        (pkg) => {
          if (pkg.packageJson.name === 'prosekit') {
            return 1
          } else if (pkg.packageJson.name === '@prosekit/pm') {
            return 2
          } else {
            return 3
          }
        },
      )
    }
    return this.store.packages
  }

  async getPackageByName(name: string) {
    const packages = await this.getPackages()
    const pkg = packages.find((pkg) => pkg.packageJson.name === name)
    if (!pkg) {
      throw new Error(`Failed to find package by name ${name}`)
    }
    return pkg
  }

  async getPublicPackages() {
    const packages = await this.getPackages()
    return packages.filter(isPublicPackage)
  }

  async getPrivatePackages() {
    const packages = await this.getPackages()
    return packages.filter(isPrivatePackage)
  }

  async getScopedPublicPackages() {
    const packages = await this.getPublicPackages()
    return packages.filter((pkg) => pkg.packageJson.name.startsWith('@'))
  }

  private async getFiles() {
    if (!this.store.files) {
      const rootDir = await this.getRootDir()
      const filePaths = await listGitFiles(rootDir)
      this.store.files = new Map(
        filePaths
          .map(normalize)
          .map((filePath) => [filePath, new VirtualFile(filePath)]),
      )
    }
    return this.store.files
  }

  private async getFilePaths() {
    const files = await this.getFiles()
    return Array.from(files.keys()).sort()
  }

  async getFile(filePath: string) {
    filePath = normalize(filePath)
    const files = await this.getFiles()
    const file = files.get(filePath)
    if (!file) {
      throw new Error(`Failed to find file ${filePath}`)
    }
    return file
  }

  async getFilePathsByDir(dir: string) {
    const filePaths = await this.getFilePaths()
    return filePaths.filter((filePath) => isSubDirectory(dir, filePath))
  }

  async getFilePathsByPackage(pkg: Package) {
    return await this.getFilePathsByDir(pkg.relativeDir)
  }

  async ensureFile(filePath: string) {
    const files = await this.getFiles()
    const file = files.get(filePath) ?? new VirtualFile(filePath)
    files.set(filePath, file)
    return file
  }

  async read(filePath: string) {
    const file = await this.ensureFile(filePath)
    return await file.read()
  }

  async updateText(filePath: string, content: string) {
    const file = await this.ensureFile(filePath)
    file.update(content)
  }

  async updateTextInPackage(pkg: Package, filePath: string, content: string) {
    return await this.updateText(path.join(pkg.relativeDir, filePath), content)
  }

  async updateJSON(filePath: string, json: any) {
    const file = await this.getFile(filePath)
    file.updateJSON(json)
  }

  async updatePackage(pkg: Package) {
    await normalizePackageJson(pkg)
    const filePath = path.join(pkg.relativeDir, 'package.json')
    const file = await this.getFile(filePath)
    file.updateJSON(pkg.packageJson)
  }

  async pathExists(filePath: string) {
    const files = await this.getFiles()
    return files.has(filePath)
  }

  async findExistingFileInPackage(pkg: Package, relativeFilePaths: string[]) {
    for (const relativeFilePath of relativeFilePaths) {
      const filePath = path.join(pkg.relativeDir, relativeFilePath)
      if (await this.pathExists(filePath)) {
        return relativeFilePath
      }
    }
    return null
  }

  async getExistingFileInPackage(pkg: Package, relativeFilePaths: string[]) {
    const relativeFilePath = await this.findExistingFileInPackage(
      pkg,
      relativeFilePaths,
    )
    if (!relativeFilePath) {
      throw new Error(
        `Failed to find file ${relativeFilePaths} in directory ${pkg.dir}`,
      )
    }
    return relativeFilePath
  }

  async cleanGeneratedFilesInPackage(pkg: Package) {
    return await this.cleanFilesInDir(pkg.relativeDir, true)
  }

  async cleanFilesInDir(dir: string, onlyGenerated = false) {
    const files = await this.getFiles()
    for (const file of files.values()) {
      if (onlyGenerated && !file.isGenerated) continue
      if (isSubDirectory(dir, file.path)) {
        file.delete()
      }
    }
  }

  async commit(): Promise<boolean> {
    let updated = false
    process.chdir(await this.getRootDir())

    for (const pkg of await this.getPackages()) {
      await this.updatePackage(pkg)
    }

    const files = await this.getFiles()
    for (const file of files.values()) {
      if (await file.commit()) {
        updated = true
      }
    }
    this.store = {}

    return updated
  }
}

export const vfs = new VirtualFileSystem()
export { type VirtualFile }
