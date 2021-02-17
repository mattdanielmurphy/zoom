const { exec } = require('child_process')

function errorHandler(err, stdout, sdterr) {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)
}

// git clone
exec('', errorHandler)
