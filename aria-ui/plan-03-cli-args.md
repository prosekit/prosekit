# Plan: Add `--prefix` and `--import-source` CLI Arguments

## Overview

Add two new CLI arguments to the `aria-ui` CLI tool:

1. **`--prefix`**: Specifies the prefix for custom element tag names (default: `aria-ui`)
2. **`--import-source`**: Specifies how generated files should import from source component files (can be a relative path or a package name)

## Current State

### CLI invocation

```bash
aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated
```

### How element tag names are constructed

The tag name `aria-ui-{kebab-name}` is hard-coded in `generate.ts` in **6 places**:

1. **React** (line 202): `'aria-ui-${kebabName}'`
2. **Preact** (line 282): `'aria-ui-${kebabName}'`
3. **Solid** (line 385): `'aria-ui-${kebabName}'`
4. **Vue** (line 476): `'aria-ui-${kebabName}'`
5. **Svelte `.svelte`** (line 572): `<aria-ui-${kebabName}` and `</aria-ui-${kebabName}>`
6. **Svelte `.svelte`** (line 581): same closing tag

### How import paths are constructed

`getRelativePathToSource()` uses ts-morph's `getRelativePathAsModuleSpecifierTo()` to compute a relative path from the generated file to the source file. For example, `../../popover/popover-root`.

This is always a relative path computed from file locations. There is no option to use a package name or a custom path.

## Proposed Changes

### New CLI Usage

```bash
# Default behavior (same as today)
aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated

# With custom prefix
aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated --prefix my-lib

# With custom import source (relative path)
aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated --import-source ../../popover/index.ts

# With custom import source (package name)
aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated --import-source @my-org/elements

# Both
aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated --prefix my-lib --import-source @my-org/elements
```

### Phase 1: Add `--prefix` argument

#### 1.1 Add option to `bin.ts`

Add a new `--prefix` option with a default value of `'aria-ui'`:

```typescript
const prefixOption = Options.text('prefix').pipe(Options.withDefault('aria-ui'))
```

Update the command definition to include the new option:

```typescript
const command = Command.make(
  'aria-ui',
  { tsconfig: tsconfigOption, entry: entryOption, output: outputOption, prefix: prefixOption },
  (options) =>
    Effect.gen(function*() {
      // ...
      yield* generateFiles(parsed, outputDir, { prefix: options.prefix })
    }),
)
```

#### 1.2 Update `generateFiles` signature

Add an options parameter to `generateFiles`:

```typescript
export interface GenerateOptions {
  prefix: string
}

export function generateFiles(
  components: ComponentInfo[],
  outputDir: string,
  options: GenerateOptions,
): Effect.Effect<void, PlatformError, Path.Path | FileSystem.FileSystem> {
```

#### 1.3 Thread `prefix` through all generation functions

Currently `getComponentMeta` computes `kebabName` from the component name. The prefix is then hard-coded as `'aria-ui-'` in each generation function's template string.

**Approach**: Add a `tagName` field to `ComponentMeta` that includes the full tag name:

```typescript
type ComponentMeta = {
  componentName: string
  kebabName: string
  tagName: string  // e.g., "aria-ui-popover-root" or "my-lib-popover-root"
  // ... rest unchanged
}

function getComponentMeta(component: ComponentInfo, prefix: string): ComponentMeta {
  const componentName = component.name
  const kebabName = toKebabCase(componentName)
  return {
    componentName,
    kebabName,
    tagName: `${prefix}-${kebabName}`,
    // ... rest unchanged
  }
}
```

Then replace all `'aria-ui-${kebabName}'` occurrences with `'${tagName}'`:

- **React** (line 202): `` `'${tagName}'` ``
- **Preact** (line 282): `` `'${tagName}'` ``
- **Solid** (line 385): `` `'${tagName}'` ``
- **Vue** (line 476): `` `'${tagName}'` ``
- **Svelte `.svelte`** (lines 572, 581): `` `<${tagName}` `` and `` `</${tagName}>` ``

Each generation function signature needs `prefix` added (or they can just receive it through `getComponentMeta`):

```typescript
// Before
function generateReactComponentFile(sourceFile, component, project)
// After
function generateReactComponentFile(sourceFile, component, project, prefix)
```

### Phase 2: Add `--import-source` argument

#### 2.1 Add option to `bin.ts`

Add a new optional `--import-source` option:

```typescript
const importSourceOption = Options.text('import-source').pipe(Options.optional)
```

Update the command:

```typescript
const command = Command.make(
  'aria-ui',
  { tsconfig: tsconfigOption, entry: entryOption, output: outputOption, prefix: prefixOption, importSource: importSourceOption },
  (options) =>
    Effect.gen(function*() {
      // ...
      yield* generateFiles(parsed, outputDir, {
        prefix: options.prefix,
        importSource: Option.getOrUndefined(options.importSource),
      })
    }),
)
```

#### 2.2 Update `GenerateOptions`

```typescript
export interface GenerateOptions {
  prefix: string
  importSource?: string
}
```

#### 2.3 Update import path resolution

Currently `getRelativePathToSource()` always computes a relative path from the generated file to the source file using ts-morph. We need to change the behavior based on `importSource`:

**When `importSource` is not set**: Behavior unchanged — use `getRelativePathToSource()` as today.

**When `importSource` is set**: The `importSource` value replaces the auto-computed relative path, but we need to handle two cases:

- **Package name** (e.g., `@my-org/elements`): All components import from this single module specifier regardless of which component file they are in. The import path is just `@my-org/elements`.
- **Relative path** (e.g., `../../popover/index.ts`): This is a path relative to each generated file. Since all generated files for a given framework are in the same directory (e.g., `generated/react/`), a single relative path works for all of them.

**Detection**: If `importSource` starts with `.` or `/`, treat it as a relative path. Otherwise, treat it as a package name. However, both cases are actually handled the same way — the `importSource` value is used directly as the module specifier in the import declaration.

**Implementation**: Replace the `getRelativePathToSource` call with a conditional:

```typescript
function getImportPath(
  sourceFile: SourceFile,
  component: ComponentInfo,
  project: Project,
  importSource?: string,
): string {
  if (importSource) {
    return importSource
  }
  return getRelativePathToSource(sourceFile, component, project)
}
```

This function is called in these locations:
1. `generateReactComponentFile` — line 143-147
2. `generatePreactComponentFile` — line 221-225
3. `generateSolidComponentFile` — line 301-305
4. `generateVueComponentFile` — line 416-420
5. `generateSvelteComponentFile` — line 512-516
6. `generateSvelteComponentSvelteFile` — line 560

Each of these needs to pass `importSource` through.

#### 2.4 Update function signatures

Each generation function needs access to `importSource`. Pass it through the options:

```typescript
function generateReactComponentFile(
  sourceFile: SourceFile,
  component: ComponentInfo,
  project: Project,
  options: GenerateOptions,
): void {
  const { prefix, importSource } = options
  const meta = getComponentMeta(component, prefix)
  const relativePathToSource = getImportPath(sourceFile, component, project, importSource)
  // ... rest unchanged
}
```

Similarly for all other `generate*` functions.

### Phase 3: Integration

#### 3.1 Update the generation loop in `generateFiles`

Pass the `options` to each generation function:

```typescript
for (const component of components) {
  const fileName = getComponentFileName(component)

  const reactPath = path.join(outputDirs.react, fileName)
  yield* writeSourceFile(reactPath, (sourceFile) =>
    generateReactComponentFile(sourceFile, component, project, options))

  // ... same for preact, solid, vue, svelte
}
```

#### 3.2 Update `generateSvelteComponentSvelteFile`

This function also needs access to `importSource`:

```typescript
function generateSvelteComponentSvelteFile(
  component: ComponentInfo,
  project: Project,
  outputFilePath: string,
  options: GenerateOptions,
): string {
  const { tagName, eventHandlers, componentName } = getComponentMeta(component, options.prefix)

  const svelteSourceFile = project.createSourceFile(outputFilePath, '', { overwrite: true })
  const importPath = getImportPath(svelteSourceFile, component, project, options.importSource)

  // ... use tagName instead of `aria-ui-${kebabName}`
  // ... use importPath instead of relativePathToSource
}
```

## Summary of Files Changed

| File | Change |
|---|---|
| `packages/cli/src/bin.ts` | Add `--prefix` and `--import-source` options, pass to `generateFiles` |
| `packages/cli/src/generate.ts` | Add `GenerateOptions` interface; add `tagName` to `ComponentMeta`; add `getImportPath` helper; update all 6 generation functions to accept options and use `tagName`/`getImportPath`; update `getComponentMeta` to accept `prefix` |

No changes needed to `parse.ts` — the parser extracts component info independently of tag names and import paths.

## Verification

After implementation:

1. Run `pnpm --filter @aria-ui-v2/elements run build:gen` — should produce identical output (since defaults match current behavior)
2. Run typecheck: `pnpm --filter @aria-ui-v2/cli typecheck`
3. Verify generated files still have correct imports and tag names
