import { access } from 'node:fs/promises'
import {
  join,
  normalize,
} from 'node:path'

import type { DumpOptions } from 'js-yaml'

import { isSubDirectory } from './is-sub-directory'
import { listGitFiles } from './list-git-files'
import { VirtualFile } from './virtual-file'

/**
 * Lazy virtual file system built on top of git tracked files.
 */
export class VirtualFileSystem {
  private readonly files = new Map<string, VirtualFile>()

  constructor(readonly rootDir: string) {}

  /** Reads a text file and caches the content. */
  async read(filePath: string): Promise<string> {
    const file = this.ensureFile(filePath)
    const content: string = await file.read()
    return content
  }

  /** Reads and parses a JSON file with JSON5 support. */
  async readJSON<T = unknown>(filePath: string): Promise<T> {
    const file = this.ensureFile(filePath)
    return await file.readJSON<T>()
  }

  /** Reads and parses a YAML file. */
  async readYAML<T = unknown>(filePath: string): Promise<T> {
    const file = this.ensureFile(filePath)
    return await file.readYAML<T>()
  }

  /** Updates a file with raw text. */
  updateText(filePath: string, content: string): void {
    const file = this.ensureFile(filePath)
    file.update(content)
  }

  /** Updates a JSON file by serializing the given object. */
  updateJSON(filePath: string, json: unknown): void {
    const file = this.ensureFile(filePath)
    file.updateJSON(json)
  }

  /** Updates a YAML file. */
  updateYAML(filePath: string, yaml: unknown, options?: DumpOptions): void {
    const file = this.ensureFile(filePath)
    file.updateYAML(yaml, options)
  }

  /** Checks if a path exists inside the virtual file map. */
  async pathExists(filePath: string): Promise<boolean> {
    const normalizedPath = normalize(filePath)
    const cached = this.files.get(normalizedPath)
    if (cached) {
      return !cached.deleted
    }
    try {
      await access(join(this.rootDir, normalizedPath))
      return true
    } catch {
      return false
    }
  }

  /**
   * Returns all file paths under the directory. Filtered by .gitignore.
   */
  async getFiles(): Promise<string[]> {
    return await listGitFiles(this.rootDir)
  }

  /** Returns all tracked files under a directory. */
  async getFilePathsByDir(dir: string): Promise<string[]> {
    const normalizedDir = normalize(dir)
    const diskFiles = (await this.getFiles()).filter((file) => {
      return file === normalizedDir || file.startsWith(`${normalizedDir}/`)
    })
    const virtualFiles = []
    for (const file of this.files.values()) {
      if (file.deleted) continue
      if (isSubDirectory(normalizedDir, file.path)) {
        virtualFiles.push(file.path)
      }
    }
    const unique = new Set([...diskFiles, ...virtualFiles])
    return Array.from(unique).sort()
  }

  /** Removes files inside a directory; optionally limited to generated files. */
  async cleanFilesInDir(dir: string, onlyGenerated = false): Promise<void> {
    const normalizedDir = normalize(dir)
    const targets = await this.getFilePathsByDir(normalizedDir)
    for (const filePath of targets) {
      const file = this.ensureFile(filePath)
      if (onlyGenerated && !file.isGenerated) continue
      file.delete()
    }
  }

  /** Flushes pending changes to disk. */
  async commit(): Promise<boolean> {
    process.chdir(this.rootDir)
    const updated = await Promise.all(this.files.values().map((file) => file.commit()))
    this.files.clear()
    return updated.some((updated) => updated)
  }

  /** Ensures a file entry exists before mutating it. */
  private ensureFile(filePath: string): VirtualFile {
    const normalizedPath = normalize(filePath)
    let file = this.files.get(normalizedPath)
    if (!file) {
      file = new VirtualFile(this.rootDir, normalizedPath)
      this.files.set(normalizedPath, file)
    }
    return file
  }
}
