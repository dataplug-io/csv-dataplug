/* eslint-env node, mocha */
require('chai')
  .should()
const dataplugTestsuite = require('@dataplug/dataplug-testsuite')
const csvDataplug = require('../lib')

describe('toggl-dataplug', () => {
  dataplugTestsuite
    .forCollectionFactory('csv', csvDataplug)
    .use()
})
