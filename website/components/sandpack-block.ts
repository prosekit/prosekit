import clsx from 'clsx'
import { Sandpack } from 'sandpack-vue3'
import { PackageJson } from 'type-fest'
import { useData } from 'vitepress'
import { defineComponent, h } from 'vue'

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
              environment: 'node',
            },
            files: {
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
  removeDevDependencies(packageJson)

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

function removeDevDependencies(packageJson: PackageJson) {
  if (packageJson.devDependencies) {
    delete packageJson.devDependencies
  }
}
