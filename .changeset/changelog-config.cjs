// @ts-check

/** @type import('@changesets/types').GetReleaseLine */
async function getReleaseLine(changeset) {
  const packageNames = changeset.releases.map((release) =>
    release.name.replace(/^@/, ''),
  )
  if (packageNames.includes('prosekit') && packageNames.length >= 2) {
    const prosekitIndex = packageNames.indexOf('prosekit')
    packageNames.splice(prosekitIndex, 1)
  }

  const packageLine = packageNames
    .map((packageName) => `**${packageName}**`)
    .join(' ')

  let returnVal = `- ${
    changeset.commit ? `[${changeset.commit}] ` : ''
  }${packageLine}\n`

  for (const line of changeset.summary.split('\n')) {
    returnVal += `\n  ${line.trimEnd()}`
  }

  return returnVal + '\n'
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
