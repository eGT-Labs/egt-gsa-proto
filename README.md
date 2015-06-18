# Egt gsa proto [![Generated with](https://img.shields.io/badge/generated%20with-bangular-blue.svg?style=flat-square)](https://github.com/42Zavattas/generator-bangular)




##Setting up the development environment


###One time setup

* Install node and npm
* Install bower `npm install -g bower`
* Install gulp `npm install -g gulp`

###Each time project dependencies may have been changed

Always run this on build server, becasue we don't know which commit might have changed package.json or bower.json

* Update npm dependencies `npm install`
* Update bower dependenceis `bower install`

### Build tasks

* Run application locally `gulp`
* Build the production artifacts `gulp build` (Build artifacts located in `dist` folder)
* Launch client and server tests, using Karma and Mocha, both by default. `gulp test [--client || --server]`

