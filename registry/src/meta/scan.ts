/* eslint-disable no-console */

import path, { basename } from 'node:path/posix'

import { once } from '@ocavue/utils'
import {
  listGitFiles,
  vfs,
} from '@prosekit/dev'
import {
  parseImportsExports,
  type ImportsExports,
} from 'parse-imports-exports'

import type {
  Framework,
  ItemAccumulator,
  ItemCategory,
} from './types'
import {
  FRAMEWORKS,
  REGISTRY_SRC_DIR,
} from './types'

const REGISTRY_FRAMEWORK_DIR: Record<Framework, string> = {
  react: path.join(REGISTRY_SRC_DIR, 'react'),
  preact: path.join(REGISTRY_SRC_DIR, 'preact'),
  vue: path.join(REGISTRY_SRC_DIR, 'vue'),
  svelte: path.join(REGISTRY_SRC_DIR, 'svelte'),
  solid: path.join(REGISTRY_SRC_DIR, 'solid'),
}

const REGISTRY_FILE_EXTENSIONS = new Set([
  '.css',
  '.cts',
  '.js',
  '.jsx',
  '.json',
  '.mts',
  '.svelte',
  '.ts',
  '.tsx',
  '.vue',
])

const SCRIPT_FILE_EXTENSIONS = new Set([
  '.cts',
  '.js',
  '.jsx',
  '.mts',
  '.ts',
  '.tsx',
])

const SFC_EXTENSIONS = new Set(['.svelte', '.vue'])

const MODULE_RESOLUTION_EXTENSIONS = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mts',
  '.cts',
  '.mjs',
  '.cjs',
  '.json',
  '.css',
]

interface ClassificationResult {
  readonly framework: Framework
  readonly category: ItemCategory
  readonly slug: string
}

interface ImportResolutionContext {
  readonly importer: string
  readonly specifier: string
  readonly fileSet: Set<string>
}

/**
 * Remove the trailing extension (if any) from a path segment.
 */
function stripExtension(segment: string): string {
  const lastDot = segment.lastIndexOf('.')
  return lastDot === -1 ? segment : segment.slice(0, lastDot)
}

/**
 * Determine whether a specifier refers to a relative import.
 */
function isRelativeImport(specifier: string): boolean {
  return specifier.startsWith('.')
}

/**
 * Create a canonical registry item name for a framework entry.
 */
function toItemName(framework: Framework, category: ItemCategory, slug: string): string {
  return `${framework}-${category}-${slug}`
}

/**
 * Build a fresh accumulator for a registry item.
 */
function createItemAccumulator(
  framework: Framework,
  category: ItemCategory,
  slug: string,
): ItemAccumulator {
  const name = toItemName(framework, category, slug)
  return {
    framework,
    category,
    name,
    title: name,
    type: category === 'example' ? 'registry:block' : 'registry:component',
    story: category === 'example' ? slug : '',
    description: '',
    files: new Set<string>(),
    registryDependencies: new Set<string>(),
    dependencies: new Set<string>(),
    meta: {
      accumulatedFiles: new Set<string>(),
      internalDependencies: new Set<string>(),
    },
  }
}

/**
 * Classify a registry file into an item bucket (examples, samples, UI, etc.).
 */
function classifyRegistryFile(filePath: string): ClassificationResult | null {
  for (const framework of FRAMEWORKS) {
    const frameworkDir = REGISTRY_FRAMEWORK_DIR[framework]
    if (!filePath.startsWith(`${frameworkDir}/`)) {
      continue
    }

    const relativePath = filePath.slice(frameworkDir.length + 1)
    const [bucket, ...rest] = relativePath.split('/')
    if (!bucket || rest.length === 0) {
      return null
    }

    switch (bucket) {
      case 'examples':
        return { framework, category: 'example', slug: stripExtension(rest[0]) }
      case 'sample':
        return { framework, category: 'sample', slug: stripExtension(rest[0]) }
      case 'ui':
        return { framework, category: 'ui', slug: stripExtension(rest[0]) }
      default:
        return null
    }
  }

  return null
}

/**
 * Decide whether a file should appear inside the generated registry payload.
 */
function shouldIncludeInRegistry(filePath: string): boolean {
  return REGISTRY_FILE_EXTENSIONS.has(path.extname(filePath))
}

/**
 * Generate candidate absolute file paths for a module specifier.
 */
function* generateCandidatePaths({
  importer,
  specifier,
}: ImportResolutionContext): Iterable<string> {
  const importerDir = path.dirname(importer)
  const base = path.normalize(path.join(importerDir, specifier))
  const ext = path.extname(base)

  if (ext) {
    yield base
  } else {
    for (const candidateExt of MODULE_RESOLUTION_EXTENSIONS) {
      yield `${base}${candidateExt}`
    }
    for (const candidateExt of MODULE_RESOLUTION_EXTENSIONS) {
      yield path.join(base, `index${candidateExt}`)
    }
  }
}

/**
 * Resolve a relative import specifier to a concrete file path tracked in Git.
 */
function resolveRelativeImport(context: ImportResolutionContext): string | null {
  for (const candidate of generateCandidatePaths(context)) {
    if (context.fileSet.has(candidate)) {
      return candidate
    }
  }
  return null
}

/**
 * Normalize an external dependency specifier down to an npm package name.
 */
function normalizeExternalDependency(specifier: string): string | null {
  if (specifier.startsWith('.') || specifier.startsWith('/')) {
    return null
  }

  if (/^(?:node:|https?:|data:)/.test(specifier)) {
    return null
  }

  const cleaned = specifier.replace(/[#?].*$/, '')

  if (cleaned.startsWith('@')) {
    const [scope, name] = cleaned.split('/', 2)
    if (!scope || !name) {
      return null
    }
    return `${scope}/${name}`
  }

  const [packageName] = cleaned.split('/')
  return packageName
}

function collectImportSpecifiersFromSource(
  source: string,
  specifiers: Set<string>,
): void {
  const parsed: ImportsExports = parseImportsExports(source, {
    ignoreDynamicImports: true,
    ignoreStringLiterals: true,
    ignoreRequires: true,
    ignoreRegexpLiterals: true,
  })
  for (
    const record of [
      parsed.namedImports,
      parsed.namespaceImports,
      parsed.dynamicImports,
      parsed.requires,
      parsed.typeNamedImports,
      parsed.typeNamespaceImports,
      parsed.typeDynamicImports,
    ]
  ) {
    if (!record) {
      continue
    }
    for (const specifier of Object.keys(record)) {
      specifiers.add(specifier)
    }
  }
}

/**
 * Extract all import specifiers from a file, supporting TS/TSX/JS, Vue, and Svelte.
 */
async function extractImportSpecifiersFromFilePath(
  filePath: string,
): Promise<Set<string>> {
  const ext = path.extname(filePath)
  if (!SCRIPT_FILE_EXTENSIONS.has(ext) && !SFC_EXTENSIONS.has(ext)) {
    return new Set()
  }

  const source = await vfs.read(filePath)
  const specifiers = new Set<string>()

  if (SFC_EXTENSIONS.has(ext)) {
    const scriptRegex = /<script\b[^>]*>([\S\s]*?)<\/script>/gi
    let match: RegExpExecArray | null
    while ((match = scriptRegex.exec(source))) {
      const scriptContent = match[1] ?? ''
      collectImportSpecifiersFromSource(scriptContent, specifiers)
    }
  } else {
    collectImportSpecifiersFromSource(source, specifiers)
  }

  return specifiers
}

async function scanRegistryImpl(): Promise<ItemAccumulator[]> {
  const rootDir = await vfs.getRootDir()
  const gitFiles = await listGitFiles(rootDir)
  const gitFileSet = new Set(gitFiles)
  const registryFiles = gitFiles.filter((filePath) => {
    return FRAMEWORKS.some((framework) => {
      return filePath.startsWith(`${REGISTRY_FRAMEWORK_DIR[framework]}/`)
    })
  })

  const itemsByName = new Map<string, ItemAccumulator>()
  const fileToItemName = new Map<string, string>()

  for (const filePath of registryFiles) {
    const classification = classifyRegistryFile(filePath)
    if (!classification) {
      continue
    }

    const { framework, category, slug } = classification
    const name = toItemName(framework, category, slug)
    fileToItemName.set(filePath, name)

    let item = itemsByName.get(name)
    if (!item) {
      item = createItemAccumulator(framework, category, slug)
      itemsByName.set(name, item)
    }

    if (shouldIncludeInRegistry(filePath)) {
      item.files.add(filePath)
      item.meta.accumulatedFiles.add(filePath)
    }
  }

  const unresolvedImports: Array<{ importer: string; specifier: string }> = []

  for (const filePath of registryFiles) {
    const itemName = fileToItemName.get(filePath)
    if (!itemName) {
      continue
    }

    const item = itemsByName.get(itemName)
    if (!item) {
      continue
    }

    const specifiers = await extractImportSpecifiersFromFilePath(filePath)
    for (const specifier of specifiers) {
      if (isRelativeImport(specifier)) {
        const resolved = resolveRelativeImport({
          importer: filePath,
          specifier,
          fileSet: gitFileSet,
        })

        if (!resolved) {
          unresolvedImports.push({ importer: filePath, specifier })
          continue
        }

        const targetItemName = fileToItemName.get(resolved)
        if (!targetItemName || targetItemName === itemName) {
          continue
        }

        item.registryDependencies.add(`@prosekit/${targetItemName}`)
        item.meta.internalDependencies.add(targetItemName)
      } else {
        const dependency = normalizeExternalDependency(specifier)
        if (dependency) {
          item.dependencies.add(dependency)
        }
      }
    }
  }

  if (unresolvedImports.length > 0) {
    console.warn(
      `[${filename}] Unable to resolve the following imports:`,
      unresolvedImports,
    )
  }

  const collectedItemNames = new Set<string>()
  const collectFilesFromDependencies = (item: ItemAccumulator): void => {
    if (collectedItemNames.has(item.name)) {
      return
    }
    collectedItemNames.add(item.name)

    for (const dependency of item.meta.internalDependencies) {
      const targetItem = itemsByName.get(dependency)
      if (!targetItem) {
        throw new Error(`Internal dependency ${dependency} not found`)
      }
      collectFilesFromDependencies(targetItem)
      for (const file of targetItem.meta.accumulatedFiles) {
        item.meta.accumulatedFiles.add(file)
      }
    }
  }

  for (const item of itemsByName.values()) {
    collectFilesFromDependencies(item)
  }

  const sortedItems = Array.from(itemsByName.values())
    .filter((item) => item.files.size > 0)
    .sort((a, b) => {
      return (
        (FRAMEWORKS.indexOf(a.framework) - FRAMEWORKS.indexOf(b.framework))
        || a.category.localeCompare(b.category)
        || a.name.localeCompare(b.name)
      )
    })

  return sortedItems
}

export const scanRegistry = once(async () => {
  const startTime = performance.now()
  console.debug(`[registry] Scanning registry...`)
  const result = await scanRegistryImpl()
  const endTime = performance.now()
  const duration = Math.round(endTime - startTime)
  console.debug(`[registry] Scanning registry completed in ${duration}ms`)
  return result
})

const filename = basename(import.meta.filename)
