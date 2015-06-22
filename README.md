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
    * The artifacts in the `dist` folder can either be run in place or copied to the production machine. The contents 
      of the folder can be run using the `npm start` command
* Launch client and server tests, using Karma and Mocha, both by default. `gulp test [--client || --server]`



# Development resources


Angular JS: https://angularjs.org/

Bootstrap: http://getbootstrap.com/

UI Bootstrap (directives to ease integration of angular and bootstrap): https://angular-ui.github.io/bootstrap/


1. Item 1
  1. A corollary to the above item.
  2. Yet another point to consider.
2. Item 2
  * A corollary that does not need to be ordered.
    * This is indented four spaces, because it's two spaces further than the item above.
    * You might want to consider making a new list.
3. Item 3


## Testing

We're using Protractor for integration tests.

https://angular.github.io/protractor/#/tutorial

*One time* setup: `gulp e2e:update`

Once webdriver is installed, the end-to-end tests can be run with `gulp e2e`
