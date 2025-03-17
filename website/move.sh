#!/bin/bash
set -e

# Working directory
cd "$(dirname "$0")"

echo "Creating shared directories..."
mkdir -p src/shared/common
mkdir -p src/shared/react
mkdir -p src/shared/vue
mkdir -p src/shared/preact
mkdir -p src/shared/solid
mkdir -p src/shared/svelte

#################################################
# COMMON FILES (shared across all frameworks)
#################################################

# user-data.ts
echo "Moving user-data.ts to shared/common..."
cp src/examples/react/full/user-data.ts src/shared/common/user-data.ts

# Remove original files and create symlinks
rm src/examples/react/full/user-data.ts
rm src/examples/react/user-menu-dynamic/user-data.ts
rm src/examples/react/user-menu/user-data.ts
rm src/examples/svelte/full/user-data.ts
rm src/examples/vue/full/user-data.ts
rm src/examples/vue/user-menu-dynamic/user-data.ts
rm src/examples/vue/user-menu/user-data.ts

# Create symlinks
ln -sf ../../../shared/common/user-data.ts src/examples/react/full/user-data.ts
ln -sf ../../../shared/common/user-data.ts src/examples/react/user-menu-dynamic/user-data.ts
ln -sf ../../../shared/common/user-data.ts src/examples/react/user-menu/user-data.ts
ln -sf ../../../shared/common/user-data.ts src/examples/svelte/full/user-data.ts
ln -sf ../../../shared/common/user-data.ts src/examples/vue/full/user-data.ts
ln -sf ../../../shared/common/user-data.ts src/examples/vue/user-menu-dynamic/user-data.ts
ln -sf ../../../shared/common/user-data.ts src/examples/vue/user-menu/user-data.ts

# tag-data.ts
echo "Moving tag-data.ts to shared/common..."
cp src/examples/react/full/tag-data.ts src/shared/common/tag-data.ts

# Remove original files
rm src/examples/react/full/tag-data.ts
rm src/examples/react/user-menu/tag-data.ts
rm src/examples/svelte/full/tag-data.ts
rm src/examples/vue/full/tag-data.ts
rm src/examples/vue/user-menu/tag-data.ts

# Create symlinks
echo "Creating symlinks for user-data.ts and tag-data.ts..."
for framework in react vue preact solid svelte; do
  ln -sf ../../../shared/common/user-data.ts src/shared/$framework/user-data.ts
  ln -sf ../../../shared/common/tag-data.ts src/shared/$framework/tag-data.ts
done

ln -sf ../../../shared/common/tag-data.ts src/examples/react/full/tag-data.ts
ln -sf ../../../shared/common/tag-data.ts src/examples/react/user-menu/tag-data.ts
ln -sf ../../../shared/common/tag-data.ts src/examples/svelte/full/tag-data.ts
ln -sf ../../../shared/common/tag-data.ts src/examples/vue/full/tag-data.ts
ln -sf ../../../shared/common/tag-data.ts src/examples/vue/user-menu/tag-data.ts

# issue-link.ts
echo "Moving issue-link.ts to shared/common..."
cp src/examples/react/mark-rule/issue-link.ts src/shared/common/issue-link.ts

# Remove original files
rm src/examples/react/mark-rule/issue-link.ts
rm src/examples/vue/mark-rule/issue-link.ts

# Create symlinks
ln -sf ../../../shared/common/issue-link.ts src/examples/react/mark-rule/issue-link.ts
ln -sf ../../../shared/common/issue-link.ts src/examples/vue/mark-rule/issue-link.ts

#################################################
# FRAMEWORK-SPECIFIC FILES
#################################################

# use-readonly.ts (for each framework)
echo "Moving use-readonly.ts to shared directories..."

# React version
cp src/examples/react/readonly/use-readonly.ts src/shared/react/use-readonly.ts
rm src/examples/react/readonly/use-readonly.ts
ln -sf ../../../shared/react/use-readonly.ts src/examples/react/readonly/use-readonly.ts

# Vue version
cp src/examples/vue/readonly/use-readonly.ts src/shared/vue/use-readonly.ts
rm src/examples/vue/readonly/use-readonly.ts
ln -sf ../../../shared/vue/use-readonly.ts src/examples/vue/readonly/use-readonly.ts

# Preact version
cp src/examples/preact/readonly/use-readonly.ts src/shared/preact/use-readonly.ts
rm src/examples/preact/readonly/use-readonly.ts
ln -sf ../../../shared/preact/use-readonly.ts src/examples/preact/readonly/use-readonly.ts

# Solid version
cp src/examples/solid/readonly/use-readonly.ts src/shared/solid/use-readonly.ts
rm src/examples/solid/readonly/use-readonly.ts
ln -sf ../../../shared/solid/use-readonly.ts src/examples/solid/readonly/use-readonly.ts

# Svelte version
cp src/examples/svelte/readonly/use-readonly.ts src/shared/svelte/use-readonly.ts
rm src/examples/svelte/readonly/use-readonly.ts
ln -sf ../../../shared/svelte/use-readonly.ts src/examples/svelte/readonly/use-readonly.ts

# use-submit-keymap.ts (for each framework)
echo "Moving use-submit-keymap.ts to shared directories..."

# React version
cp src/examples/react/keymap/use-submit-keymap.ts src/shared/react/use-submit-keymap.ts
rm src/examples/react/keymap/use-submit-keymap.ts
ln -sf ../../../shared/react/use-submit-keymap.ts src/examples/react/keymap/use-submit-keymap.ts

# Vue version
cp src/examples/vue/keymap/use-submit-keymap.ts src/shared/vue/use-submit-keymap.ts
rm src/examples/vue/keymap/use-submit-keymap.ts
ln -sf ../../../shared/vue/use-submit-keymap.ts src/examples/vue/keymap/use-submit-keymap.ts

# Preact version
cp src/examples/preact/keymap/use-submit-keymap.ts src/shared/preact/use-submit-keymap.ts
rm src/examples/preact/keymap/use-submit-keymap.ts
ln -sf ../../../shared/preact/use-submit-keymap.ts src/examples/preact/keymap/use-submit-keymap.ts

# Solid version
cp src/examples/solid/keymap/use-submit-keymap.ts src/shared/solid/use-submit-keymap.ts
rm src/examples/solid/keymap/use-submit-keymap.ts
ln -sf ../../../shared/solid/use-submit-keymap.ts src/examples/solid/keymap/use-submit-keymap.ts

# Svelte version
cp src/examples/svelte/keymap/use-submit-keymap.ts src/shared/svelte/use-submit-keymap.ts
rm src/examples/svelte/keymap/use-submit-keymap.ts
ln -sf ../../../shared/svelte/use-submit-keymap.ts src/examples/svelte/keymap/use-submit-keymap.ts

# user-menu.tsx (React)
echo "Moving user-menu.tsx to shared/react..."
cp src/examples/react/full/user-menu.tsx src/shared/react/user-menu.tsx
rm src/examples/react/full/user-menu.tsx
rm src/examples/react/user-menu/user-menu.tsx
ln -sf ../../../shared/react/user-menu.tsx src/examples/react/full/user-menu.tsx
ln -sf ../../../shared/react/user-menu.tsx src/examples/react/user-menu/user-menu.tsx

# user-menu.vue (Vue)
echo "Moving user-menu.vue to shared/vue..."
cp src/examples/vue/full/user-menu.vue src/shared/vue/user-menu.vue
rm src/examples/vue/full/user-menu.vue
rm src/examples/vue/user-menu/user-menu.vue
ln -sf ../../../shared/vue/user-menu.vue src/examples/vue/full/user-menu.vue
ln -sf ../../../shared/vue/user-menu.vue src/examples/vue/user-menu/user-menu.vue

# tag-menu.tsx (React)
echo "Moving tag-menu.tsx to shared/react..."
cp src/examples/react/full/tag-menu.tsx src/shared/react/tag-menu.tsx
rm src/examples/react/full/tag-menu.tsx
rm src/examples/react/user-menu/tag-menu.tsx
ln -sf ../../../shared/react/tag-menu.tsx src/examples/react/full/tag-menu.tsx
ln -sf ../../../shared/react/tag-menu.tsx src/examples/react/user-menu/tag-menu.tsx

# tag-menu.vue (Vue)
echo "Moving tag-menu.vue to shared/vue..."
cp src/examples/vue/full/tag-menu.vue src/shared/vue/tag-menu.vue
rm src/examples/vue/full/tag-menu.vue
rm src/examples/vue/user-menu/tag-menu.vue
ln -sf ../../../shared/vue/tag-menu.vue src/examples/vue/full/tag-menu.vue
ln -sf ../../../shared/vue/tag-menu.vue src/examples/vue/user-menu/tag-menu.vue

# Make script executable
chmod +x move.sh

echo "Successfully moved shared files to the shared directory and created symlinks"
