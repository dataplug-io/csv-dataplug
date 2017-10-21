const dataplug = require('@dataplug/dataplug');
const CsvStreamWriter = require('./csvStreamWriter');

const targetConfigDeclaration = dataplug.config.declare()
  .parameters({
    targetDir: {
      description: 'Target directory to create CSV files in, default to current',
      type: 'string'
    },
    delimiter: {
      description: 'Field delimiter',
      type: 'string',
      default: ','
    },
    eof: {
      description: 'Adds extra row delimiter after last row',
      type: 'boolean',
      default: true
    },
    rowDelimiter: {
      description: 'String used as a row delimiter or one of special values: "unix", "mac", "windows", and "unicode"',
      type: 'string'
    },
    header: {
      description: 'Insert column names as first row (if available)',
      type: 'boolean',
      default: true
    },
    forceQoute: {
      description: 'Quote non-empty fields',
      type: 'boolean',
      default: false
    },
    forceQouteEmpty: {
      description: 'Quote empty fields',
      type: 'boolean'
    },
    forceQouteString: {
      description: 'Quote string fields',
      type: 'boolean'
    },
    escape: {
      description: 'Escape character',
      type: 'string',
      default: '"'
    }
  });
const targetConfigToOptionsMapping = dataplug.config.map()
  .asIs('delimiter')
  .asIs('eof')
  .asIs('rowDelimiter')
  .asIs('header')
  .rename('forceQoute', 'quoted')
  .rename('forceQouteEmpty', 'quotedEmpty')
  .rename('forceQouteString', 'quotedString')
  .asIs('escape')
  .asIs('quote');

const genericCollection = {
  origin: 'csv',
  name: null,
  target: dataplug.target(targetConfigDeclaration, () => {
    throw new Error('Generic collection does not provide a target implementation.');
  })
};

/**
 * Creates collection with specified name
 */
function createCollection(name) {
  let collection = Object.assign({}, genericCollection);

  collection.name = name;

  collection.target = dataplug.target(targetConfigDeclaration, (params) => {
    const options = targetConfigToOptionsMapping.apply(params);
    return new CsvStreamWriter(name, params.targetDir, options);
  });

  return collection;
}

module.exports = {
  createCollection,
  genericCollection
};
