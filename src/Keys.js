import Key from './Key';
import data from './pages';

let { pages, controlKeys } = data;

const pagesLength = pages.length;
const keyRows = pages[0].length + 1; // controlKeys are the last row, so plus 1.
const keyColumns = pages[0][0].length;

pages = pages.map(page => {
  page.push(controlKeys);
  return page;
});

class Keys {
  /**
   * Get a page.
   * 
   * @param {Number} index
   * 
   * @return {Array}
   */
  static getPage(index) {
    return pages[index];
  }

  /**
   * Get the number of pages.
   * 
   * @return {Number}
   */
  static getPagesLength() {
    return pagesLength;
  }

  /**
   * Get the number of key rows.
   * 
   * @return {Number}
   */
  static getKeyRows() {
    return keyRows;
  }

  /**
   * Get the number of key columns.
   * 
   * @return {Number}
   */
  static getKeyColumns() {
    return keyColumns;
  }

  /**
   * Get a key.
   * 
   * @param {Number} pageIndex
   * @param {Number} i
   * @param {Number} j
   * 
   * @return {Key}
   */
  static getKey(pageIndex, i, j) {
    return new Key(pages[pageIndex][i][j]);
  }
}

export default Keys;