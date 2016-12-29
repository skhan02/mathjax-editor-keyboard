import MathJaxEditor from 'mathjax-editor';
import { addClass, removeClass } from 'mathjax-editor/src/utils';
import { applyStyles, emptyElement, findNode } from './utils';
import styles from './styles';
import keys from './keys';

const { keyRows, keyColumns, getKey, keyList } = keys;
const keyboardWidth = 320;

class Core {
  /**
   * Initiates the keyboard.
   * 
   * @param {Object} options - See at MathJax Editor docs.
   * 
   * @constructor
   */
  constructor(options) {
    const Element = MathJax.HTML.Element;

    const $container = Element('div', { className: 'mjk-container' });
    const $keyboard = Element('div', { className: 'mjk-keyboard' });
    const viewportWidth = window.innerWidth;

    $container.appendChild($keyboard);
    document.body.appendChild($container);

    const editor = new MathJaxEditor(options);

    this.editor = editor;
    this.isMobile = (viewportWidth < 640);
    this.isVisible = false;
    this.$container = $container;
    this.$keyboard = $keyboard;
    this.$editorContainer = editor.core.$container;
    this.$editorContainerParent = editor.core.$container.parentNode;
    this.$editorInput = editor.core.$input;

    document.addEventListener('click', this.handleDocumentClick.bind(this));

    this.hideKeyboard();
  }

  /**
   * Create all keys for the keyboard.
   * 
   * @return {Void}
   */
  render() {
    const Element = MathJax.HTML.Element;
    const { $keyboard, editor } = this;
    const keyWidth = (keyboardWidth - 20) / keyColumns;
    const keyWidthPx = `${keyWidth}px`;

    emptyElement($keyboard);
    $keyboard.style.width = `${keyboardWidth}px`;

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

    MathJax.Hub.Typeset($keyboard);
    this.updateInputElement();
    this.updateContainerElement();
  }

  /**
   * Update the math input element to fit the screen.
   * 
   * @return {Void}
   */
  updateInputElement() {
    const {
      $keyboard,
      $container,
      $editorContainer,
      $editorInput,
      $editorContainerParent
    } = this;
    const viewportWidth = window.innerWidth;
    const { top } = $keyboard.getBoundingClientRect();
    
    if (this.isMobile) {
      const padding = (Math.max(viewportWidth, 320) - keyboardWidth) / 2;

      $editorInput.setAttribute('readonly', 'true');
      $container.appendChild($editorContainer);
      addClass($editorContainer, 'mjk-input');
      addClass($keyboard, 'isMobile');

      applyStyles($keyboard, {
        paddingLeft: padding,
        paddingRight: padding
      });

      applyStyles($editorContainer, {
        fontSize: 12,
        left: 0,
        width: viewportWidth
      });

      applyStyles($editorContainer, {
        top: top - $editorContainer.offsetHeight
      });
    }
    else {
      removeClass($keyboard, 'isMobile');
      this.appendEditorToItsOriginalParent();
    }
  }

  /**
   * Append the editor to its original parent.
   * 
   * @return {Void}
   */
  appendEditorToItsOriginalParent() {
    const { $editorContainer, $editorContainerParent } = this;
    removeClass($editorContainer, 'mjk-input');
    $editorContainerParent.appendChild($editorContainer);
  }

  /**
   * Update the container element position and size.
   * 
   * @return {Void}
   */
  updateContainerElement() {
    const { $keyboard, $container, $editorContainer } = this;
    const viewportWidth = window.innerWidth;
    let height, left, top, width;

    if (this.isMobile) {
      height = '100%';
      left = 0;
      top = 0;
      width = '100%';
    }
    else {
      const editorContainerBouncing = $editorContainer.getBoundingClientRect();
      const keyboardBounding = $keyboard.getBoundingClientRect();
      const margin = 16;
      let leftPos = editorContainerBouncing.left + (editorContainerBouncing.width / 2) - (keyboardBounding.width / 2);
      height = keyboardBounding.height;
      left = leftPos;
      top = editorContainerBouncing.top + editorContainerBouncing.height + margin;
      width = keyboardBounding.width;
    }

    applyStyles($container, {
      height,
      left,
      top,
      width
    });
  }
  
  /**
   * Show the keyboard.
   * 
   * @return {Void}
   */
  showKeyboard() {
    if (this.isVisible) {
      return;
    }
    this.isVisible = true;
    this.$container.style.display = 'block';
    this.render();
  }

  /**
   * Hide the keyboard.
   * 
   * @return {Void}
   */
  hideKeyboard() {
    this.isVisible = false;
    this.editor.blur();
    this.$container.style.display = 'none';
    this.appendEditorToItsOriginalParent();
  }

  /**
   * Handle the click on `document`.
   * 
   * @param {ClickEvent} e
   * 
   * @return {Void}
   */
  handleDocumentClick(e) {
    const { $container, $editorContainer } = this;
    const $target = e.target;

    if (this.isMobile && $target === $container) {
      return this.hideKeyboard();
    }
    if (findNode($target, $editorContainer)) {
      return this.showKeyboard();
    }
    if (!findNode($target, $container)) {
      return this.hideKeyboard();
    }
  }
}

export default Core;