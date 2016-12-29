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
  }

  /**
   * Get editor's value.
   * 
   * @return {String}
   */
  getValue() {
    return this.editor.getValue();
  }
}

module.exports = MathJaxEditorKeyboard;