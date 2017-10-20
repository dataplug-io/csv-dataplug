const dataplug = require('@dataplug/dataplug');
const CsvStreamReader = require('./csvStreamReader');
const CsvStreamWriter = require('./csvStreamWriter');

const sourceConfigDeclaration = dataplug.config.declare
  .parameters({
    files: {
      description: 'Source files to stream data from',
      type: 'array',
      required: true
    },
    autoParse: {
      description: 'If true, the parser will attempt to convert input string to native types',
      type: 'boolean'
    },
    autoParseDate: {
      description: 'If true, the parser will attempt to convert input string to dates (depends on autoParse)',
      type: 'boolean'
    },
    comment: {
      description: 'Treat all the characters after this one as a comment',
      type: 'string',
      default: ''
    },
    delimiter: {
      description: 'Field delimiter',
      type: 'string',
      default: ','
    },
    escape: {
      description: 'Escape character',
      type: 'string',
      default: '"'
    },
    ltrim: {
      description: 'If true, ignore whitespace immediately following the delimiter (i.e. left-trim all fields)',
      type: 'boolean',
      default: false
    },
    quote: {
      description: 'Character surrounding a field',
      type: 'string',
      default: '"'
    },
    relax: {
      description: 'Preserve quotes inside unquoted field',
      type: 'boolean'
    },
    relasColumnCount: {
      description: 'Discard inconsistent columns count',
      type: 'boolean',
      default: false
    },
    rowDelimiter: {
      description: 'One or multiple characters used to delimit record rows, defaults to auto discovery if not specified',
      type: 'string'
    },
    rtrim: {
      description: 'If true, ignore whitespace immediately preceding the delimiter (i.e. right-trim all fields)',
      type: 'boolean',
      default: false
    },
    skipEmptyLines: {
      description: 'Don\'t generate records for empty lines (line matching /\s*/)',
      type: 'boolean',
      default: false
    },
    skipLinesWithEmptyValues: {
      description: 'Don\'t generate records for lines containing empty column values (column matching /\s*/)',
      type: 'boolean',
      default: false
    },
    trim: {
      description: 'If true, ignore whitespace immediately around the delimiter',
      type: 'boolean',
      default: false
    }
  });
const sourceConfigToOptionsMapping = dataplug.config.mapping
  .rename('autoParse', 'auto_parse')
  .rename('autoParseDate', 'auto_parse_date')
  .asIs('comment')
  .asIs('delimiter')
  .asIs('escape')
  .asIs('ltrim')
  .asIs('quote')
  .asIs('relax')
  .rename('relasColumnCount', 'relax_column_count')
  .asIs('rowDelimiter')
  .asIs('rtrim')
  .rename('skipEmptyLines', 'skip_empty_lines')
  .rename('skipLinesWithEmptyValues', 'skip_lines_with_empty_values')
  .asIs('trim');

const targetConfigDeclaration = dataplug.config.declare
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
const targetConfigToOptionsMapping = dataplug.config.mapping
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
  source: dataplug.source(sourceConfigDeclaration, () => {
    throw new Error('Generic collection does not provide a source implementation.');
  }),
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

  collection.source = dataplug.source(sourceConfigDeclaration, (params) => {
    const options = sourceConfigToOptionsMapping.apply(params);
    return new CsvStreamReader([].concat(params.files), name, options);
  });

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
