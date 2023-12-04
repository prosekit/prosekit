// @ts-check

/** @type import('@changesets/types').GetReleaseLine */
async function getReleaseLine(changeset) {
  let packages = changeset.releases.map((release) => release.name)

  if (packages.length >= 2) {
    packages = packages.filter((packageName) => packageName !== 'prosekit')
  }

  const packageLine = packages.map(formatModuleBadge).join(' ')

  let returnVal = `- ` + formatCommit(changeset.commit) + packageLine + '\n'

  for (const line of changeset.summary.split('\n')) {
    returnVal += `\n  ${line.trimEnd()}`
  }

  return returnVal + '\n'
}

/**
 * @param {string} name
 */
function formatModuleBadge(name) {
  const logo = moduleLogos[name]

  const url =
    'https://img.shields.io/badge/' +
    name.replaceAll('/', '%2F').replace('@', '') +
    '-444444' +
    (logo ? `?logo=${logo}` : '')

  return `![${name}](${url})`
}

/**
 * @param {string | null | undefined} commit
 */
function formatCommit(commit) {
  if (!commit || typeof commit !== 'string' || commit.length < 7) {
    return ''
  }

  const shortCommit = commit.slice(0, 7)

  return `[\`${shortCommit}\`](https://github.com/ocavue/prosekit/commit/${commit}) `
}

/**
 * https://shields.io/docs/logos
 *
 * @type {Object.<string, string>}
 */
const moduleLogos = {
  '@prosekit/vue': 'vuedotjs',
  '@prosekit/react': 'react',
  '@prosekit/preact': 'preact',
  '@prosekit/lit': 'lit',
  '@prosekit/svelte': 'svelte',
  '@prosekit/solid': 'solid',
}

/** @type import('@changesets/types').GetDependencyReleaseLine */
async function getDependencyReleaseLine() {
  return ''
}

/** @type import('@changesets/types').ChangelogFunctions */
const functions = {
  getReleaseLine,
  getDependencyReleaseLine,
}

module.exports = functions
