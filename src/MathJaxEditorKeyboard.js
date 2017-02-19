import Core from './Core';

class MathJaxEditorKeyboard {
  /**
   * Surface on top of Core class.
   * 
   * @param {Object} options
   * 
   * @constructor
   */
  constructor(options) {
    const core = new Core(options);

    this.editor = core.editor;
    this.version = '1.1.3';
  }

  /**
   * Get editor's value.
   * 
   * @return {String}
   */
  getValue() {
    return this.editor.getValue();
  }

  /**
   * Set editor's value.
   * 
   * @return {String}
   */
  setValue(value) {
    return this.editor.setValue(value);
  }

  /**
   * Listen to an editor event.
   * 
   * @param {String} type
   * @param {Function} listener
   * 
   * @return {Void}
   */
  on(type, listener) {
    this.editor.on(type, listener);
  }
}

module.exports = MathJaxEditorKeyboard;