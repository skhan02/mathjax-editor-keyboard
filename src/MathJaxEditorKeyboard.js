const { toArray } = require('mathjax-editor/src/utils');
const Core = require('./Core');

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

    this.core = core;
    this.mathjaxEditor = core.mathjaxEditor;
    this.version = '1.2.2';
  }

  /**
   * Get editor's value.
   * 
   * @return {String}
   */
  getValue() {
    return this.mathjaxEditor.getValue();
  }

  /**
   * Set editor's value.
   * 
   * @return {String}
   */
  setValue(value) {
    return this.mathjaxEditor.setValue(value);
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
    this.mathjaxEditor.on(type, listener);
  }

  /**
   * Destroys the editor's keyboard.
   * 
   * @return {Void}
   */
  destroy() {
    this.core.destroy();
  }
}

/**
 * This is the HTML API to quickly use the editor.
 */
window.addEventListener('load', () => {
  toArray(document.getElementsByClassName('mathjax-editor-html'))
    .forEach($el => {
      const scroll = $el.getAttribute('data-scroll');
      const newLine = $el.getAttribute('data-new-line');
      const value = $el.getAttribute('data-value');
      const keyboardZIndex = $el.getAttribute('data-keyboard-z-index');

      const options = {
        el: $el,
        scroll: scroll === 'true',
        newLine: newLine === 'true',
        keyboardZIndex
      };

      if (value && value.length) {
        options.value = value;
      }

      $el.mathjaxEditor = new MathJaxEditorKeyboard(options);
    });
});

module.exports = MathJaxEditorKeyboard;