# Color Removal Plan

## Objective
Simplify the build script by removing the complex `colors.ts` file and inlining color definitions directly in `classes.ts`, while maintaining the exact same output in `classes.gen.json`.

## Strategy
Remove colors incrementally, one at a time, to ensure safety and verify that each step maintains identical output.

## ✅ COMPLETED - All Colors Removed!

### Individual Color Removal (Incremental Phase)
- ✅ **ring** - Removed and committed (commit: a56e06b5)
- ✅ **input** - Removed and committed (commit: 842fc624) - was not used anywhere
- ✅ **border** - Removed and committed (commit: b6e493a5)
- ✅ **accent** - Removed and committed (commit: 0f1fc94f)
- ✅ **muted-foreground** - Removed and committed (commit: 92984905)
- ✅ **muted** - Removed and committed (commit: 39ffcc77) - was not used anywhere
- ✅ **secondary-foreground** - Removed and committed (commit: 5147be49)
- ✅ **secondary** - Removed and committed (commit: 450d8560)
- ✅ **primary-foreground** - Removed and committed (commit: e4365051)
- ✅ **primary** - Removed and committed (commit: 3e56004e)
- ✅ **foreground** - Removed and committed (commit: 29026a02) - was not used anywhere
- ✅ **background** - Removed and committed (commit: 8951b02a)

### Final Cleanup Phase
- ✅ **Complete removal** - Removed colors.ts entirely and updated all references (commit: d690f06e)

## 🎉 Mission Accomplished!

The complex `colors.ts` file has been completely removed and all color logic has been successfully inlined into `classes.ts`. The build process is now significantly simpler while maintaining **identical output**.

## Step-by-Step Process for Each Color

### 1. Remove Color from Array
Edit `src/colors.ts` and remove one color entry from the COLORS array.

### 2. Find and Replace Usage
Search for the color alias in `src/classes.ts`:
```bash
grep -n "alias-name" src/classes.ts
```
Replace color aliases with direct Tailwind classes:
- `bg-background` → `bg-white dark:bg-gray-950`
- `text-foreground` → `text-gray-900 dark:text-gray-50`
- `border-border` → `border-gray-200 dark:border-gray-800`
- etc.

### 3. Regenerate and Verify
```bash
nr gen
git diff lib/classes.gen.json
```
The diff should be empty (no changes to the JSON output).

### 4. Commit the Change
```bash
git add -A
git commit -m "Remove [color-name] color from COLORS array

[Brief description of changes made]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 5. Repeat
Continue with the next color until all are removed.

## Safety Measures
- Two fake colors (`fakefakefake1`, `fakefakefake2`) are kept in the COLORS array to prevent COLOR_REGEX from crashing during the cleanup process
- Each step is verified by ensuring `classes.gen.json` remains unchanged
- Each step is committed separately for easy rollback if needed

## Final Cleanup (After All Colors Removed)
1. Remove the entire `colors.ts` file
2. Update `src/classes.ts`:
   - Remove `import { replaceColor } from './colors'`
   - Update `cn` function to just use `twMerge(clsx(...args))`
3. Update `src/index.ts`:
   - Remove `import { Colors } from './colors'`
   - Create a static Colors object or remove UnoCSS shortcuts entirely
4. Update `src/files.ts`:
   - Remove `'colors.ts'` from the watch paths
5. Test and commit final cleanup

## Notes
- Some colors might not be used anywhere (like `input`), making the replacement step unnecessary
- The process maintains backward compatibility throughout
- The output `classes.gen.json` should remain identical until the final cleanup