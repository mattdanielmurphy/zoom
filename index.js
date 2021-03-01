#!/usr/bin/env node
const { exec } = require('child_process')
const chalk = require('chalk')

// FUNCTIONS

const error = (message) => console.log(chalk.bold.red(message))
const log = console.log
const execLog = (message) => log(chalk.yellow(message))

function shell(command, options = {}) {
  let verboseMode
  if (options.verboseMode) {
    console.log('verbose mode')
    delete options.verboseMode
    verboseMode = true
  }
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) console.warn(error)
      if (verboseMode) {
        log(chalk.bold(`[${command}]`))
        execLog(stdout)
      }
      resolve(stdout ? stdout : stderr)
    })
  })
}

async function removeInstallerFiles(projectName) {
  const installerFiles = [
    'package.json',
    'package-lock.json',
    'index.js',
    'readme.md',
  ]
  await shell(`rm ${installerFiles.join(' ')}`, { cwd: projectName })
}

async function createReadme(projectName) {
  await shell(`touch readme.md; echo "# ${projectName}" >> readme.md`, {
    cwd: projectName,
  })
}

async function cloneRepo(projectName) {
  log(`cloning repo into folder '${projectName}'...`)
  await shell(
    `gh repo clone mattdanielmurphy/create-node-project ${projectName}`,
  )
  log('done clone')
}

async function createProject(projectName) {
  await cloneRepo(projectName)
  await removeInstallerFiles(projectName)
  await createReadme(projectName)
}

// * PROGRAM START *

// 1. CHECK FOR PROJECT NAME

const projectName = process.argv.slice(2).join('-')

if (projectName) createProject(projectName)
else
  error('Please provide a project name:\n\tcreate-node-project <project-name>')
