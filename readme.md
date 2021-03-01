## create-node-project

A tool I created for myself to create new node projects.

### Features

- configs:

  - gitignore
  - prettier

- node_modules won't sync with iCloud thanks to the [.nosync alias fix](https://davidsword.ca/prevent-icloud-syncing-node_modules-folder/)

## steps to create

- require first argument: name
- get project name from first argument
- git clone project-template folder: `gh repo clone mattdanielmurphy/create-node-project`
- create git repo and project folder

- `npm init -y` & install packages
- create node_modules.nosync & alias: `mkdir node_modules.nosync && ln -s node_modules.nosync node_modules`

## project-template

Include:

- gitignore with `node_modules*`
- prettier config

## requirements

- github-cli `npm i -g gh`
