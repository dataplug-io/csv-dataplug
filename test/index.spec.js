/* eslint-env node, mocha */
require('chai')
  .should()
const dataplugTestsuite = require('@dataplug/dataplug-testsuite')
const csvDataplug = require('../lib')

describe('csv-dataplug', () => {
  dataplugTestsuite
    .forCollectionFactory('csv', csvDataplug)
    .execute()
})
