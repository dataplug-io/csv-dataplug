const {
  Readable
} = require('stream');
const oboe = require('oboe');

/**
 * Reads data from specified CSV files and transforms it to output object stream
 */
class CsvStreamReader extends Readable {
  /**
   * @constructor
   * @param {string[]} csvFiles List of CSV files
   * @param {string} Collection Collection name
   * @param {Object} [options=undefined] Options, see http://csv.adaltas.com/parse/#parser-options
   */
  constructor(csvFiles, collection, options = undefined) {
    super({
      objectMode: true
    });

    this._csvFiles = [].concat(csvFiles);
    this._collection = collection;
    this._options = Object.assign({}, options);

    //TODO: options.columns = true
  }

  /**
   * https://nodejs.org/api/stream.html#stream_readable_read_size_1
   */
  _read(size) {
    console.log('this._csvFiles', this._csvFiles);
  }
}

module.exports = CsvStreamReader;
