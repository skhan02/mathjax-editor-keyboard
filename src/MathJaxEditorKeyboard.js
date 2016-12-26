import MathJaxEditor from 'mathjax-editor';
import loadStyles from './loadStyles';
import keyboard from './keyboard';

let Element = null;
const { keyRows, keyColumns, getKey } = keyboard;

class MathJaxEditorKeyboard {
  constructor(options) {
    Element = Element || MathJax.HTML.Element;

    const $container = Element('div', { className: 'mjk-container' });
    const $keyboard = Element('div', { className: 'mjk-keyboard' });

    $container.appendChild($keyboard);
    document.body.appendChild($container);

    const editor = new MathJaxEditor(options);
    editor.on('focus', this.showKeyboard.bind(this));
    editor.on('blur', this.hideKeyboard.bind(this));

    this.$keyboard = $keyboard;
    this.editor = editor;

    setTimeout(() =>
      this.showKeyboard()
    );
  }

  showKeyboard() {
    // This should be at least 320px, 20 for padding.
    const width = this.$keyboard.offsetWidth - 20;
    const keyWidth = width / keyColumns;
    const keyWidthPx = `${keyWidth}px`;
    let i = 0;
    for (; i < keyRows; i++) {
      const $row = Element('div', { className: 'mjk-keyRow' });
      let j = 0;
      for (j; j < keyColumns; j++) {
        const key = getKey(i, j);
        const $key = Element('div', {
          className: 'mjk-key',
          style: {
            fontSize: '16px',
            height: keyWidthPx,
            width: keyWidthPx
          }
        });
        $key.innerHTML = key.getLabel();
        $row.appendChild($key);
      }
      this.$keyboard.append($row);
    }
  }

  hideKeyboard() {}
}

module.exports = MathJaxEditorKeyboard;