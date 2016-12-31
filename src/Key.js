class Key {
  /**
   * Creates a key.
   * 
   * @param {Object} key
   * 
   * @constructor
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Get the label of the key.
   * 
   * @return {String}
   */
  getLabel() {
    if (this.key.label) {
      return `\\(${this.key.label}\\)`;
    }
    return `<i class="material-icons">${this.key.$label}</i>`;
  }

  /**
   * Get the click listener of the key.
   * 
   * @return {Function}
   */
  getClickListener() {
    return this.key.onClick;
  }

  /**
   * Check if the key is set.
   * 
   * @return {Boolean}
   */
  exists() {
    return !!this.key;
  }
}

export default Key;