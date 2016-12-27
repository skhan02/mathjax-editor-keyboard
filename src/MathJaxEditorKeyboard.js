import MathJaxEditor from 'mathjax-editor';
import { addClass, removeClass } from 'mathjax-editor/src/utils';
import { applyStyles, emptyElement } from './utils';
import styles from './styles';
import keys from './keys';

let Element = null;
let Typeset = null;
const { keyRows, keyColumns, getKey, keyList } = keys;

class MathJaxEditorKeyboard {
  constructor(options) {
    Element = Element || MathJax.HTML.Element;
    Typeset = Typeset || MathJax.Hub.Typeset;

    const $container = Element('div', { className: 'mjk-container' });
    const $keyboard = Element('div', { className: 'mjk-keyboard' });

    $container.appendChild($keyboard);
    document.body.appendChild($container);

    const editor = new MathJaxEditor(options);
    // editor.on('focus', this.showKeyboard.bind(this));
    // editor.on('blur', this.hideKeyboard.bind(this));

    this.editor = editor;
    this.$container = $container;
    this.$keyboard = $keyboard;
    this.$editorContainer = editor.core.$container;
    this.$editorContainerParent = editor.core.$container.parentNode;
    this.$editorInput = editor.core.$input;

    this.render()
  }

  render() {
    const { $keyboard, editor } = this;
    const keyboardWidth = $keyboard.offsetWidth;
    const width = keyboardWidth - 20; // at least 320px.
    const keyWidth = width / keyColumns;
    const keyWidthPx = `${keyWidth}px`;

    emptyElement($keyboard);

    keyList.forEach((rows, i) => {
      const $row = Element('div', { className: 'mjk-keyRow' });

      rows.forEach((column, j) => {
        const key = getKey(i, j);
        const listener = key.getClickListener();
        const $key = Element('button', {
          className: 'mjk-key',
          style: {
            fontSize: '16px',
            height: keyWidthPx,
            width: keyWidthPx
          }
        });

        $key.innerHTML = key.getLabel();
        $key.addEventListener('click', () => {
          listener(editor);
          this.updateInputElement();
        });

        $row.appendChild($key);
      });

      $keyboard.appendChild($row);
    })

    Typeset($keyboard);
    this.updateInputElement();
  }

  updateInputElement() {
    const { $keyboard, $container, $editorContainer, $editorInput } = this;
    const keyboardWidth = $keyboard.offsetWidth;
    const { top } = $keyboard.getBoundingClientRect();
    
    // Below 640px is mobile version
    if (keyboardWidth < 640) {
      $editorInput.setAttribute('readonly', 'true');
      $container.appendChild($editorContainer);
      addClass($editorContainer, 'mjk-input');

      applyStyles($editorContainer, {
        fontSize: '12px',
        left: 0,
        width: `${keyboardWidth}px`
      });

      applyStyles($editorContainer, {
        top: `${top - $editorContainer.offsetHeight}px`
      });
    }
  }
}

module.exports = MathJaxEditorKeyboard;