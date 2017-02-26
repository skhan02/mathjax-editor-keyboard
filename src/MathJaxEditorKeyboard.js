import { toArray } from 'mathjax-editor/src/utils'
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
    this.version = '1.1.4';
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

// HTML API WIP

window.addEventListener('load', () => {
  toArray(document.getElementsByClassName('mathjax-editor-html'))
    .forEach($el => {
      const scroll = $el.getAttribute('data-scroll');
      const options = {
        el: $el,
        scroll: scroll === 'true'
      };
      $el.mathjaxEditor = new MathJaxEditorKeyboard(options);
    });
});

module.exports = MathJaxEditorKeyboard;