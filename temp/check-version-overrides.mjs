#!/usr/bin/env node

import { execSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const PROJECT_DIR = "/Users/ocavue/code/github/prosekit"
const EXPECTED_BRANCH = "ocavue/astro-next"

// ANSI colors for better readability
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
}

function log(message) {
  const timestamp = new Date().toISOString().slice(11, 19)
  console.log(`${colors.cyan}[${timestamp}]${colors.reset} ${message}`)
}

function logStep(step, message) {
  console.log(
    `\n${colors.bright}${colors.blue}[Step ${step}]${colors.reset} ${colors.bright}${message}${colors.reset}`
  )
}

function logSuccess(message) {
  console.log(`  ${colors.green}✓${colors.reset} ${message}`)
}

function logInfo(message) {
  console.log(`  ${colors.cyan}ℹ${colors.reset} ${message}`)
}

function logWarning(message) {
  console.log(`  ${colors.yellow}⚠${colors.reset} ${colors.yellow}${message}${colors.reset}`)
}

function logError(message) {
  console.error(`  ${colors.red}✗${colors.reset} ${colors.red}${message}${colors.reset}`)
}

function exec(cmd, options = {}) {
  log(`Running: ${cmd}`)
  try {
    const result = execSync(cmd, {
      cwd: PROJECT_DIR,
      encoding: "utf-8",
      stdio: options.silent ? "pipe" : "inherit",
      ...options,
    })
    return result
  } catch (error) {
    if (options.ignoreError) {
      return error.stdout || ""
    }
    throw error
  }
}

function execOutput(cmd, options = {}) {
  try {
    const result = execSync(cmd, {
      cwd: PROJECT_DIR,
      encoding: "utf-8",
      stdio: "pipe",
      ...options,
    })
    return result.trim()
  } catch (error) {
    if (options.ignoreError) {
      return ""
    }
    throw error
  }
}

async function getLatestVersion(packageName, wantBeta) {
  const tag = wantBeta ? "beta" : "latest"

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
        { ignoreError: true }
      )
      if (allVersionsJson) {
        const versions = JSON.parse(allVersionsJson)
        const betaVersions = versions.filter((v) => v.includes("beta"))
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
  console.log(
    `\n${colors.bright}========================================${colors.reset}`
  )
  console.log(
    `${colors.bright}  Version Overrides Update Script${colors.reset}`
  )
  console.log(
    `${colors.bright}========================================${colors.reset}\n`
  )

  // Step 1: Change to project directory
  logStep(1, "Changing to project directory")
  try {
    process.chdir(PROJECT_DIR)
    logSuccess(`Working directory: ${PROJECT_DIR}`)
  } catch (error) {
    logError(`Failed to change to project directory: ${error.message}`)
    process.exit(1)
  }

  // Step 2: Check current git branch
  logStep(2, "Checking current git branch")
  let currentBranch
  try {
    currentBranch = execOutput("git branch --show-current")
    logInfo(`Current branch: ${currentBranch}`)
  } catch (error) {
    logError(`Failed to get current branch: ${error.message}`)
    process.exit(1)
  }

  if (currentBranch !== EXPECTED_BRANCH) {
    logError(`Wrong branch! Expected "${EXPECTED_BRANCH}", got "${currentBranch}"`)
    logWarning("Please switch to the correct branch and run again")
    process.exit(1)
  }
  logSuccess(`On correct branch: ${currentBranch}`)

  // Step 3: Fetch all remotes
  logStep(3, "Fetching all remotes")
  try {
    exec("git fetch --all")
    logSuccess("Fetched all remotes successfully")
  } catch (error) {
    logError(`Failed to fetch remotes: ${error.message}`)
    process.exit(1)
  }

  // Step 4: Squash all commits into one above origin/master
  logStep(4, "Squashing commits onto origin/master")

  // Get the list of files changed compared to origin/master
  let changedFiles
  try {
    changedFiles = execOutput("git diff --name-only origin/master")
    if (changedFiles) {
      logInfo(`Files changed from origin/master:\n${changedFiles}`)
    } else {
      logInfo("No files changed from origin/master")
    }
  } catch (error) {
    logError(`Failed to get changed files: ${error.message}`)
    process.exit(1)
  }

  // Soft reset to origin/master (keeps all changes staged)
  try {
    exec("git reset --soft origin/master")
    logSuccess("Reset to origin/master (changes preserved)")
  } catch (error) {
    logError(`Failed to reset to origin/master: ${error.message}`)
    process.exit(1)
  }

  // If there are staged changes, commit them
  try {
    const stagedChanges = execOutput("git diff --cached --name-only")
    if (stagedChanges) {
      logInfo(`Staged changes:\n${stagedChanges}`)
      exec('git commit -m "update"')
      logSuccess("Created squashed commit")
    } else {
      logInfo("No changes to commit after reset")
    }
  } catch (error) {
    logError(`Failed to create squashed commit: ${error.message}`)
    process.exit(1)
  }

  // Step 5: Update pnpm.overrides
  logStep(5, "Updating pnpm.overrides")
  const packageJsonPath = join(PROJECT_DIR, "package.json")

  let packageJson
  try {
    const content = readFileSync(packageJsonPath, "utf-8")
    packageJson = JSON.parse(content)
    logSuccess(`Read package.json successfully`)
  } catch (error) {
    logError(`Failed to read package.json: ${error.message}`)
    process.exit(1)
  }

  const overrides = packageJson.pnpm?.overrides
  if (!overrides || Object.keys(overrides).length === 0) {
    logWarning("No pnpm.overrides found in package.json")
    process.exit(1)
  }

  logInfo(`Found ${Object.keys(overrides).length} packages in pnpm.overrides`)
  console.log("")

  let updatedCount = 0
  let unchangedCount = 0
  let errorCount = 0

  for (const [pkg, currentVersion] of Object.entries(overrides)) {
    const wantBeta = currentVersion.includes("beta")
    const versionType = wantBeta ? "beta" : "latest"

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
    console.log("")
  }

  logInfo(`Summary: ${updatedCount} updated, ${unchangedCount} unchanged, ${errorCount} errors`)

  if (errorCount > 0) {
    logWarning(`${errorCount} packages failed to update`)
  }

  if (updatedCount > 0) {
    try {
      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n")
      logSuccess("Wrote updated package.json")
    } catch (error) {
      logError(`Failed to write package.json: ${error.message}`)
      process.exit(1)
    }
  } else {
    logInfo("No updates needed for package.json")
  }

  // Step 6: Run pnpm install and dedupe
  logStep(6, "Running pnpm install and dedupe")
  try {
    exec("pnpm install")
    logSuccess("pnpm install completed successfully")
  } catch (error) {
    logError(`pnpm install failed: ${error.message}`)
    process.exit(1)
  }

  try {
    exec("pnpm dedupe --ignore-scripts")
    logSuccess("pnpm dedupe completed successfully")
  } catch (error) {
    logError(`pnpm dedupe failed: ${error.message}`)
    process.exit(1)
  }

  // Step 7: Amend commit with new changes and force push
  logStep(7, "Updating commit and force pushing")

  // Check if there are changes to commit
  let hasChanges = false
  try {
    const status = execOutput("git status --porcelain")
    hasChanges = status.length > 0
    if (hasChanges) {
      logInfo(`Changes detected:\n${status}`)
    } else {
      logInfo("No new changes detected")
    }
  } catch (error) {
    logError(`Failed to check git status: ${error.message}`)
    process.exit(1)
  }

  if (hasChanges) {
    try {
      exec("git add -A")
      logSuccess("Staged all changes")
    } catch (error) {
      logError(`Failed to stage changes: ${error.message}`)
      process.exit(1)
    }

    // Check if we have a commit above origin/master to amend
    const commitCount = execOutput("git rev-list --count origin/master..HEAD")

    if (commitCount === "0") {
      // No existing commit, create a new one
      try {
        exec('git commit -m "update"')
        logSuccess("Created new commit")
      } catch (error) {
        logError(`Failed to create commit: ${error.message}`)
        process.exit(1)
      }
    } else {
      // Amend the existing commit to keep only one commit above origin/master
      try {
        exec('git commit --amend --no-edit -m "update"')
        logSuccess("Amended commit with new changes")
      } catch (error) {
        logError(`Failed to amend commit: ${error.message}`)
        process.exit(1)
      }
    }
  }

  // Verify we have exactly one commit above origin/master
  try {
    const commitCount = execOutput("git rev-list --count origin/master..HEAD")
    logInfo(`Commits above origin/master: ${commitCount}`)
    if (commitCount !== "1" && commitCount !== "0") {
      logWarning(`Expected 1 commit above origin/master, but found ${commitCount}`)
    }
  } catch (error) {
    logWarning(`Failed to count commits: ${error.message}`)
  }

  try {
    exec("git push -f")
    logSuccess("Force pushed successfully")
  } catch (error) {
    logError(`Failed to force push: ${error.message}`)
    process.exit(1)
  }

  // Done
  console.log(
    `\n${colors.bright}${colors.green}========================================${colors.reset}`
  )
  console.log(
    `${colors.bright}${colors.green}  Script completed successfully!${colors.reset}`
  )
  console.log(
    `${colors.bright}${colors.green}========================================${colors.reset}\n`
  )

  logInfo(`Packages updated: ${updatedCount}`)
  logInfo(`Packages unchanged: ${unchangedCount}`)
  if (errorCount > 0) {
    logWarning(`Packages with errors: ${errorCount}`)
  }
}

main().catch((err) => {
  console.error("")
  logError(`Unexpected error: ${err.message}`)
  if (err.stack) {
    console.error(`${colors.red}${err.stack}${colors.reset}`)
  }
  process.exit(1)
})
