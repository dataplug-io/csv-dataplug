const dataplug = require('@dataplug/dataplug');

const genericCollection = {
  origin: 'csv',
  name: null,
  //source: dataplug.source()
  //TODO: source w/o actual handler, just parameters
  //TODO: target w/o actual handler
}

/**
 * Creates collection with specified name
 */
function createCollection(name) {
  let collection = {};

  collection.origin = 'csv';
  collection.name = name;

  return collection;
}

module.exports = {
  createCollection,
  genericCollection
};
