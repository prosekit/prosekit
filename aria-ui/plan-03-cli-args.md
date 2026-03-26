# Plan: Add `--prefix` and `--import-source` CLI Arguments

## Overview

Add two new CLI arguments to the `aria-ui` CLI tool:

1. **`--prefix`**: Specifies the prefix for custom element tag names (default: `aria-ui`)
2. **`--import-source`** (required): Specifies the module specifier used in generated import statements (can be a relative path like `../../popover/index.ts` or a package name like `@my-org/elements`)

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
# With relative path import source (current project usage)
aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated --import-source ../../popover/index.ts

# With package name import source
aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated --import-source @my-org/elements

# With custom prefix
aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated --import-source ../../popover/index.ts --prefix my-lib

# Both custom prefix and package name
aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated --prefix my-lib --import-source @my-org/elements
```

### Phase 1: Add `--prefix` argument [x]

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

### Phase 2: Add `--import-source` argument [x]

#### 2.1 Add option to `bin.ts`

Add a new required `--import-source` option:

```typescript
const importSourceOption = Options.text('import-source')
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
        importSource: options.importSource,
      })
    }),
)
```

#### 2.2 Update `GenerateOptions`

```typescript
export interface GenerateOptions {
  prefix: string
  importSource: string
}
```

#### 2.3 Update import path resolution

Currently `getRelativePathToSource()` uses ts-morph to compute a relative path from the generated file to the source file. This logic is removed entirely. Instead, `importSource` is always used directly as the module specifier in import declarations.

The value can be either:

- **A package name** (e.g., `@my-org/elements`): All components import from this single module specifier.
- **A relative path** (e.g., `../../popover/index.ts`): A path relative to each generated file. Since all generated files for a given framework are in the same directory (e.g., `generated/react/`), a single relative path works for all of them.

Both cases are handled the same way — the `importSource` value is used directly as the module specifier.

**Deletions**: Remove the `getRelativePathToSource` function entirely. The `project` parameter is no longer needed by generation functions (it was only used for relative path computation). However, `project` is still needed by `generateFiles` itself for creating source files via `project.createSourceFile`, so it remains there.

**Impact on function signatures**: Since `getRelativePathToSource` required a `SourceFile`, `ComponentInfo`, and `Project`, and now we just use `options.importSource` directly, the generation functions no longer need the `project` parameter:

```typescript
// Before
function generateReactComponentFile(sourceFile, component, project)
// After
function generateReactComponentFile(sourceFile, component, options)
```

The `generateSvelteComponentSvelteFile` function also no longer needs `project` — it previously used it to create a temporary source file solely for `getRelativePathToSource`. Now it just uses `options.importSource` directly.

#### 2.4 Update function signatures

Each generation function receives `options: GenerateOptions` instead of `project: Project`:

```typescript
function generateReactComponentFile(
  sourceFile: SourceFile,
  component: ComponentInfo,
  options: GenerateOptions,
): void {
  const { tagName, ... } = getComponentMeta(component, options.prefix)
  // Use options.importSource directly as the module specifier
  // ... rest unchanged
}
```

Similarly for all other `generate*` functions.

`addSourceFileImports` changes its `relativePathToSource` parameter to just use the value from `options.importSource`:

```typescript
const { propsTypeName, eventsTypeName } = addSourceFileImports({
  sourceFile,
  component,
  importSource: options.importSource,  // was: relativePathToSource
  order: 'props-first',
  includeRegister: true,
  includeElementType: true,
})
```

The `SourceImportOptions` type updates accordingly:

```typescript
type SourceImportOptions = {
  sourceFile: SourceFile
  component: ComponentInfo
  importSource: string  // was: relativePathToSource
  order: ElementTypeImportOrder
  includeRegister: boolean
  includeElementType: boolean
}
```

### Phase 3: Integration [x]

#### 3.1 Update the generation loop in `generateFiles`

Pass `options` instead of `project` to each generation function:

```typescript
for (const component of components) {
  const fileName = getComponentFileName(component)

  const reactPath = path.join(outputDirs.react, fileName)
  yield* writeSourceFile(reactPath, (sourceFile) =>
    generateReactComponentFile(sourceFile, component, options))

  // ... same for preact, solid, vue, svelte
}
```

Note: `project` is still created in `generateFiles` for `project.createSourceFile()` calls within `writeSourceFile`, but it is no longer passed to the individual generation functions.

#### 3.2 Simplify `generateSvelteComponentSvelteFile`

This function no longer needs `project` — it previously created a temporary source file solely for `getRelativePathToSource`. Now it uses `options.importSource` directly:

```typescript
function generateSvelteComponentSvelteFile(
  component: ComponentInfo,
  options: GenerateOptions,
): string {
  const { tagName, eventHandlers, componentName } = getComponentMeta(component, options.prefix)

  // ... use tagName instead of `aria-ui-${kebabName}`
  // ... use options.importSource directly as import path
}
```

#### 3.3 Delete `getRelativePathToSource`

Remove the `getRelativePathToSource` function entirely (lines 585-599 of current `generate.ts`). It is no longer needed since `importSource` is always provided.

#### 3.4 Update `build:gen` script

Update `packages/elements/package.json` to pass the new required `--import-source` option:

```json
"build:gen": "aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated --import-source ../../popover/index.ts"
```

The `--prefix` option is not needed here since the default `aria-ui` is correct for this project.

## Summary of Files Changed

| File | Change |
|---|---|
| `packages/cli/src/bin.ts` | Add `--prefix` and `--import-source` options, pass to `generateFiles` |
| `packages/cli/src/generate.ts` | Add `GenerateOptions` interface; add `tagName` to `ComponentMeta`; delete `getRelativePathToSource`; remove `project` param from all generation functions; use `options.importSource` directly; update `getComponentMeta` to accept `prefix`; rename `relativePathToSource` to `importSource` in `SourceImportOptions` |
| `packages/elements/package.json` | Add `--import-source ../../popover/index.ts` to `build:gen` script |

No changes needed to `parse.ts` — the parser extracts component info independently of tag names and import paths.

## Verification

After implementation:

1. Run `pnpm --filter @aria-ui-v2/elements run build:gen` — should produce identical output (the `--import-source ../../popover/index.ts` resolves to the same path as the old auto-computed relative path)
2. Run typecheck: `pnpm --filter @aria-ui-v2/cli typecheck`
3. Verify generated files still have correct imports and tag names
