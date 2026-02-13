#!/usr/bin/env bun

/**
 * TEMPORARY SCRIPT for updating Astro beta overrides
 *
 * This script updates the overrides in pnpm-workspace.yaml to their latest versions.
 * It rebases the current branch onto origin/master (so master changes take precedence),
 * then squashes all commits into a single commit above origin/master.
 * It fetches the latest versions for each override (respecting beta tags), runs pnpm install
 * and dedupe, then amends the commit and force pushes the changes.
 *
 * Usage:
 *   bun scripts/check-version-overrides.mjs
 *
 * Requirements:
 *   - Must be on the "ocavue/astro-next" branch
 *   - Bun runtime (for built-in YAML support)
 *
 * This script will be removed once the Astro upgrade is complete.
 */

import { execSync } from 'node:child_process'
import { join } from 'node:path'
import path from 'node:path'
import { styleText } from 'node:util'
import { file, YAML } from 'bun'

const PROJECT_DIR = path.resolve(import.meta.dirname, '..')
const EXPECTED_BRANCH = 'ocavue/astro-next'

function log(message) {
  const timestamp = new Date().toISOString().slice(11, 19)
  console.log(`${styleText('cyan', `[${timestamp}]`)} ${message}`)
}

function logStep(step, message) {
  console.log(
    `\n${styleText(['bold', 'blue'], `[Step ${step}]`)} ${styleText('bold', message)}`,
  )
}

function logSuccess(message) {
  console.log(`  ${styleText('green', '✓')} ${message}`)
}

function logInfo(message) {
  console.log(`  ${styleText('cyan', 'ℹ')} ${message}`)
}

function logWarning(message) {
  console.log(`  ${styleText('yellow', `⚠ ${message}`)}`)
}

function logError(message) {
  console.error(`  ${styleText('red', `✗ ${message}`)}`)
}

function exec(cmd, options = {}) {
  log(`Running: ${cmd}`)
  try {
    const result = execSync(cmd, {
      cwd: PROJECT_DIR,
      encoding: 'utf-8',
      stdio: options.silent ? 'pipe' : 'inherit',
    })
    return result
  } catch (error) {
    if (options.ignoreError) {
      return error.stdout || ''
    }
    throw error
  }
}

function execOutput(cmd, options = {}) {
  try {
    const result = execSync(cmd, {
      cwd: PROJECT_DIR,
      encoding: 'utf-8',
      stdio: 'pipe',
    })
    return result.trim()
  } catch (error) {
    if (options.ignoreError) {
      return ''
    }
    throw error
  }
}

async function getLatestVersion(packageName, wantBeta) {
  const tag = wantBeta ? 'beta' : 'latest'

  // Try to get version from the specific tag
  try {
    const version = execOutput(`npm view ${packageName}@${tag} version`, {
      ignoreError: true,
    })
    if (version) {
      logInfo(`Found ${packageName}@${tag}: ${version}`)
      return version
    }
  } catch {
    // Tag might not exist
  }

  // If beta tag doesn't exist, find the latest beta version manually
  if (wantBeta) {
    logInfo(`Beta tag not found for ${packageName}, searching all versions...`)
    try {
      const allVersionsJson = execOutput(
        `npm view ${packageName} versions --json`,
        { ignoreError: true },
      )
      if (allVersionsJson) {
        const versions = JSON.parse(allVersionsJson)
        const betaVersions = versions.filter((v) => v.includes('beta'))
        if (betaVersions.length > 0) {
          const latestBeta = betaVersions[betaVersions.length - 1]
          logInfo(`Found latest beta version: ${latestBeta}`)
          return latestBeta
        }
        logWarning(`No beta versions found for ${packageName}`)
      }
    } catch (error) {
      logWarning(`Failed to fetch versions for ${packageName}: ${error.message}`)
    }
  }

  // Fall back to latest
  logInfo(`Falling back to latest tag for ${packageName}`)
  const version = execOutput(`npm view ${packageName}@latest version`)
  if (!version) {
    throw new Error(`Failed to get any version for ${packageName}`)
  }
  return version
}

async function main() {
  console.log(`\n${styleText('bold', '========================================')}`)
  console.log(styleText('bold', '  Version Overrides Update Script'))
  console.log(`${styleText('bold', '========================================')}\n`)

  // Step 1: Change to project directory
  logStep(1, 'Changing to project directory')
  try {
    process.chdir(PROJECT_DIR)
    logSuccess(`Working directory: ${PROJECT_DIR}`)
  } catch (error) {
    logError(`Failed to change to project directory: ${error.message}`)
    process.exit(1)
  }

  // Step 2: Check current git branch
  logStep(2, 'Checking current git branch')
  let currentBranch
  try {
    currentBranch = execOutput('git branch --show-current')
    logInfo(`Current branch: ${currentBranch}`)
  } catch (error) {
    logError(`Failed to get current branch: ${error.message}`)
    process.exit(1)
  }

  if (currentBranch !== EXPECTED_BRANCH) {
    logError(`Wrong branch! Expected "${EXPECTED_BRANCH}", got "${currentBranch}"`)
    logWarning('Please switch to the correct branch and run again')
    process.exit(1)
  }
  logSuccess(`On correct branch: ${currentBranch}`)

  // Step 3: Fetch all remotes
  logStep(3, 'Fetching all remotes')
  try {
    exec('git fetch --all')
    logSuccess('Fetched all remotes successfully')
  } catch (error) {
    logError(`Failed to fetch remotes: ${error.message}`)
    process.exit(1)
  }

  // Step 4: Rebase onto origin/master (master changes take precedence)
  logStep(4, 'Rebasing onto origin/master')

  // Get the list of files changed compared to origin/master before rebase
  try {
    const changedFiles = execOutput('git diff --name-only origin/master')
    if (changedFiles) {
      logInfo(`Files changed from origin/master:\n${changedFiles}`)
    } else {
      logInfo('No files changed from origin/master')
    }
  } catch (error) {
    logError(`Failed to get changed files: ${error.message}`)
    process.exit(1)
  }

  // Rebase onto origin/master with strategy to prefer master's changes on conflicts
  try {
    exec('git rebase origin/master -X theirs')
    logSuccess('Rebased onto origin/master (master changes take precedence on conflicts)')
  } catch (error) {
    logError(`Failed to rebase onto origin/master: ${error.message}`)
    logWarning('You may need to resolve conflicts manually')
    process.exit(1)
  }

  // Step 5: Squash all commits into one above origin/master
  logStep(5, 'Squashing commits into one')

  try {
    const commitCount = execOutput('git rev-list --count origin/master..HEAD')
    logInfo(`Commits above origin/master before squash: ${commitCount}`)

    if (parseInt(commitCount, 10) > 0) {
      // Soft reset to origin/master (keeps all changes staged)
      exec('git reset --soft origin/master')
      logSuccess('Reset to origin/master (changes preserved)')

      // Create a single commit with all changes
      exec('git commit -m "update"')
      logSuccess('Created single squashed commit')
    } else {
      logInfo('No commits to squash')
    }
  } catch (error) {
    logError(`Failed to squash commits: ${error.message}`)
    process.exit(1)
  }

  // Step 6: Update overrides in pnpm-workspace.yaml
  logStep(6, 'Updating overrides in pnpm-workspace.yaml')
  const workspaceYamlPath = join(PROJECT_DIR, 'pnpm-workspace.yaml')

  let workspaceConfig
  let originalContent
  try {
    originalContent = await file(workspaceYamlPath).text()
    // Fix trailing commas in flow-style mappings (e.g., `},` -> `}`)
    const fixedContent = originalContent.replace(/,(\s*})/g, '$1')
    workspaceConfig = YAML.parse(fixedContent)
    logSuccess(`Read pnpm-workspace.yaml successfully`)
  } catch (error) {
    logError(`Failed to read pnpm-workspace.yaml: ${error.message}`)
    process.exit(1)
  }

  const overrides = workspaceConfig.overrides
  if (!overrides || Object.keys(overrides).length === 0) {
    logWarning('No overrides found in pnpm-workspace.yaml')
    process.exit(1)
  }

  logInfo(`Found ${Object.keys(overrides).length} packages in overrides`)
  console.log('')

  let updatedCount = 0
  let unchangedCount = 0
  let errorCount = 0

  for (const [pkg, currentVersion] of Object.entries(overrides)) {
    // Skip GitHub-based or non-NPM overrides
    if (
      currentVersion.startsWith('github:')
      || currentVersion.startsWith('https://')
      || currentVersion.includes('gitpkg')
    ) {
      logInfo(`Skipping ${pkg}: non-NPM override`)
      console.log('')
      continue
    }

    const wantBeta = currentVersion.includes('beta')
    const versionType = wantBeta ? 'beta' : 'latest'

    logInfo(`Processing: ${pkg} (want: ${versionType})`)
    logInfo(`  Current version: ${currentVersion}`)

    try {
      const latestVersion = await getLatestVersion(pkg, wantBeta)
      const newVersion = `^${latestVersion}`

      if (newVersion !== currentVersion) {
        logSuccess(`  Updated: ${currentVersion} -> ${newVersion}`)
        overrides[pkg] = newVersion
        updatedCount++
      } else {
        logInfo(`  Unchanged: ${currentVersion}`)
        unchangedCount++
      }
    } catch (error) {
      logError(`  Failed to get version: ${error.message}`)
      errorCount++
    }
    console.log('')
  }

  logInfo(`Summary: ${updatedCount} updated, ${unchangedCount} unchanged, ${errorCount} errors`)

  if (errorCount > 0) {
    logWarning(`${errorCount} packages failed to update`)
  }

  if (updatedCount > 0) {
    try {
      // Update the overrides values in the original content to preserve formatting
      let updatedContent = originalContent
      for (const [pkg, newVersion] of Object.entries(overrides)) {
        // Match the package entry in the YAML and update its version
        const escapedPkg = pkg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`("${escapedPkg}":\\s*)"[^"]*"`, 'g')
        updatedContent = updatedContent.replace(regex, `$1"${newVersion}"`)
      }
      await Bun.write(workspaceYamlPath, updatedContent)
      logSuccess('Wrote updated pnpm-workspace.yaml')
    } catch (error) {
      logError(`Failed to write pnpm-workspace.yaml: ${error.message}`)
      process.exit(1)
    }
  } else {
    logInfo('No updates needed for pnpm-workspace.yaml')
  }

  // Step 7: Run pnpm install and dedupe
  logStep(7, 'Running pnpm install and dedupe')
  try {
    exec('pnpm install')
    logSuccess('pnpm install completed successfully')
  } catch (error) {
    logError(`pnpm install failed: ${error.message}`)
    process.exit(1)
  }

  try {
    exec('pnpm dedupe --ignore-scripts')
    logSuccess('pnpm dedupe completed successfully')
  } catch (error) {
    logError(`pnpm dedupe failed: ${error.message}`)
    process.exit(1)
  }

  // Step 8: Amend commit with new changes and force push
  logStep(8, 'Updating commit and force pushing')

  // Check if there are changes to commit
  let hasChanges = false
  try {
    const status = execOutput('git status --porcelain')
    hasChanges = status.length > 0
    if (hasChanges) {
      logInfo(`Changes detected:\n${status}`)
    } else {
      logInfo('No new changes detected')
    }
  } catch (error) {
    logError(`Failed to check git status: ${error.message}`)
    process.exit(1)
  }

  if (hasChanges) {
    try {
      exec('git add -A')
      logSuccess('Staged all changes')
    } catch (error) {
      logError(`Failed to stage changes: ${error.message}`)
      process.exit(1)
    }

    // Check if we have commits above origin/master to amend
    const commitCount = execOutput('git rev-list --count origin/master..HEAD')

    if (commitCount === '0') {
      // No existing commit, create a new one
      try {
        exec('git commit -m "update"')
        logSuccess('Created new commit')
      } catch (error) {
        logError(`Failed to create commit: ${error.message}`)
        process.exit(1)
      }
    } else {
      // Amend the last commit to include the override updates
      try {
        exec('git commit --amend --no-edit -m "update"')
        logSuccess('Amended last commit with new changes')
      } catch (error) {
        logError(`Failed to amend commit: ${error.message}`)
        process.exit(1)
      }
    }
  }

  // Log commit count above origin/master
  try {
    const commitCount = execOutput('git rev-list --count origin/master..HEAD')
    logInfo(`Commits above origin/master: ${commitCount}`)
  } catch (error) {
    logWarning(`Failed to count commits: ${error.message}`)
  }

  try {
    exec('git push -f')
    logSuccess('Force pushed successfully')
  } catch (error) {
    logError(`Failed to force push: ${error.message}`)
    process.exit(1)
  }

  // Done
  console.log(`\n${styleText(['bold', 'green'], '========================================')}`)
  console.log(styleText(['bold', 'green'], '  Script completed successfully!'))
  console.log(`${styleText(['bold', 'green'], '========================================')}\n`)

  logInfo(`Packages updated: ${updatedCount}`)
  logInfo(`Packages unchanged: ${unchangedCount}`)
  if (errorCount > 0) {
    logWarning(`Packages with errors: ${errorCount}`)
  }
}

main().catch((err) => {
  console.error('')
  logError(`Unexpected error: ${err.message}`)
  if (err.stack) {
    console.error(styleText('red', err.stack))
  }
  process.exit(1)
})
