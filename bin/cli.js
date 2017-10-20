#!/usr/bin/env node

require('@dataplug/dataplug-cli')
  .fromFactory(require('../lib/factory'))
  .argv;
