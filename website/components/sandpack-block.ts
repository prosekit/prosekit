import clsx from 'clsx'
import { Sandpack } from 'sandpack-vue3'
import { PackageJson } from 'type-fest'
import { useData } from 'vitepress'
import { defineComponent, h } from 'vue'

import * as injection from './sandpack-injection.gen'

import './sandpack-block.css'

export interface SandpackBlockProps {
  files: Record<string, { hidden: boolean; code: string }>
  expand?: boolean
}

export const SandpackBlock = defineComponent<SandpackBlockProps>(
  (props) => {
    const { isDark } = useData()

    return () =>
      h(
        'div',
        {
          class: clsx(
            'sandpack-block',
            props.expand && 'sandpack-block-expand',
          ),
        },
        [
          h(Sandpack, {
            theme: isDark.value ? 'dark' : 'light',
            customSetup: {
              dependencies: injection.dependencies,
              environment: 'node',
            },
            files: {
              ...injection.files,
              ...patchFiles(props.files),
            },
            options: {
              showLineNumbers: true,
              editorHeight: '100%',
              showTabs: true,
            },
          }),
        ],
      )
  },
  {
    props: ['files', 'expand'],
  },
)

function patchFiles(files: Record<string, { hidden: boolean; code: string }>) {
  const patched = structuredClone(files)
  patched['/package.json']['code'] = patchPackageJson(
    patched['/package.json']['code'],
  )
  return patched
}

function patchPackageJson(packageJsonString: string): string {
  const packageJson = JSON.parse(packageJsonString) as PackageJson

  patchDependencyVersion(packageJson)
  patchWorkspaceVersions(packageJson)
  removeDevDependencies(packageJson)
  removeProseKit(packageJson)

  return JSON.stringify(packageJson, null, 2) + '\n'
}

// Downgrade vite for Sandpack
// See issue https://github.com/codesandbox/sandpack/issues/959
function patchDependencyVersion(packageJson: PackageJson) {
  for (const [dep, version] of [
    ['vite', '4.2.3'],
    ['esbuild-wasm', '0.17.12'],
  ]) {
    if (packageJson?.dependencies?.[dep]) {
      packageJson.dependencies[dep] = version
    }
    if (packageJson?.devDependencies?.[dep]) {
      packageJson.devDependencies[dep] = version
    }
  }
}

function patchWorkspaceVersions(packageJson: PackageJson) {
  for (const deps of [
    packageJson.dependencies,
    packageJson.devDependencies,
    packageJson.peerDependencies,
  ]) {
    if (!deps) continue

    for (const [packageName, version] of Object.entries(deps)) {
      if (version === 'workspace:*') {
        deps[packageName] = 'next'
      }
    }
  }
}

function removeDevDependencies(packageJson: PackageJson) {
  if (packageJson.devDependencies) {
    delete packageJson.devDependencies
  }
}

function removeProseKit(packageJson: PackageJson) {
  if (packageJson.dependencies?.['prosekit']) {
    delete packageJson.dependencies['prosekit']
  }
}
