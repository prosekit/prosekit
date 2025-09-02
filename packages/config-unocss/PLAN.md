# Color Removal Plan

## Objective
Simplify the build script by removing the complex `colors.ts` file and inlining color definitions directly in `classes.ts`, while maintaining the exact same output in `classes.gen.json`.

## Strategy
Remove colors incrementally, one at a time, to ensure safety and verify that each step maintains identical output.

## Current Status
- ✅ **ring** - Removed and committed (commit: a56e06b5)
- ✅ **input** - Removed and committed (commit: 842fc624) - was not used anywhere

## Remaining Colors to Remove
From the COLORS array in `src/colors.ts`:
- [ ] **border** - `['border', 'gray-200', 'gray-800']`
- [ ] **accent** - `['accent', 'gray-200', 'gray-700']`
- [ ] **muted-foreground** - `['muted-foreground', 'gray-500', 'gray-500']`
- [ ] **muted** - `['muted', 'gray-100', 'gray-800']`
- [ ] **secondary-foreground** - `['secondary-foreground', 'gray-900', 'gray-50']`
- [ ] **secondary** - `['secondary', 'gray-100', 'gray-800']`
- [ ] **primary-foreground** - `['primary-foreground', 'gray-50', 'gray-900']`
- [ ] **primary** - `['primary', 'gray-900', 'gray-50']`
- [ ] **foreground** - `['foreground', 'gray-900', 'gray-50']`
- [ ] **background** - `['background', 'white', 'gray-950']`

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