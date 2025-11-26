import { normalize } from 'node:path'

import type { DumpOptions } from 'js-yaml'

import { isSubDirectory } from './is-sub-directory'
import { listGitFiles } from './list-git-files'
import { VirtualFile } from './virtual-file'

/**
 * Lazy virtual file system built on top of git tracked files.
 */
export class VirtualFileSystem {
  private files?: Map<string, VirtualFile>

  constructor(private readonly rootDir: string) {}

  /** Returns the absolute root directory managed by the virtual file system. */
  getRootDir() {
    return this.rootDir
  }

  /** Reads a text file and caches the content. */
  async read(filePath: string): Promise<string> {
    const file = await this.ensureFile(filePath)
    const content: string = await file.read()
    return content
  }

  /** Reads and parses a JSON file with JSON5 support. */
  async readJSON<T = unknown>(filePath: string): Promise<T> {
    const file = await this.ensureFile(filePath)
    return await file.readJSON<T>()
  }

  /** Reads and parses a YAML file. */
  async readYAML<T = unknown>(filePath: string): Promise<T> {
    const file = await this.ensureFile(filePath)
    return await file.readYAML<T>()
  }

  /** Updates a file with raw text. */
  async updateText(filePath: string, content: string) {
    const file = await this.ensureFile(filePath)
    file.update(content)
  }

  /** Updates a JSON file by serializing the given object. */
  async updateJSON(filePath: string, json: any) {
    const file = await this.ensureFile(filePath)
    file.updateJSON(json)
  }

  /** Updates a YAML file. */
  async updateYAML(filePath: string, yaml: any, options?: DumpOptions) {
    const file = await this.ensureFile(filePath)
    file.updateYAML(yaml, options)
  }

  /** Checks if a path exists inside the virtual file map. */
  async pathExists(filePath: string) {
    const files = await this.getFiles()
    return files.has(normalize(filePath))
  }

  /** Returns all tracked files under a directory. */
  async getFilePathsByDir(dir: string) {
    const files = await this.getFiles()
    const normalizedDir = normalize(dir)
    const result: string[] = []
    for (const filePath of files.keys()) {
      if (isSubDirectory(normalizedDir, filePath)) {
        result.push(filePath)
      }
    }
    return result.sort()
  }

  /** Removes files inside a directory; optionally limited to generated files. */
  async cleanFilesInDir(dir: string, onlyGenerated = false) {
    const files = await this.getFiles()
    const normalizedDir = normalize(dir)
    for (const file of files.values()) {
      if (onlyGenerated && !file.isGenerated) continue
      if (isSubDirectory(normalizedDir, file.path)) {
        file.delete()
      }
    }
  }

  /** Flushes pending changes to disk. */
  async commit(): Promise<boolean> {
    let updated = false
    process.chdir(this.rootDir)

    const files = await this.getFiles()
    for (const file of files.values()) {
      if (await file.commit()) {
        updated = true
      }
    }
    this.files = undefined

    return updated
  }

  /** Loads git tracked files into memory. */
  private async getFiles() {
    if (!this.files) {
      const filePaths = await listGitFiles(this.rootDir)
      this.files = new Map(
        filePaths.map((filePath) => [
          normalize(filePath),
          new VirtualFile(this.rootDir, normalize(filePath)),
        ]),
      )
    }
    return this.files
  }

  /** Ensures a file entry exists before mutating it. */
  private async ensureFile(filePath: string) {
    const files = await this.getFiles()
    const normalizedPath = normalize(filePath)
    const file = files.get(normalizedPath)
      ?? new VirtualFile(this.rootDir, normalizedPath)
    files.set(normalizedPath, file)
    return file
  }
}
