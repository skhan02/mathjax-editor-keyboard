import MathJaxEditor from 'mathjax-editor';
import Keys from './Keys';
import { addClass, removeClass } from 'mathjax-editor/src/utils';
import { applyStyles, emptyElement, findNode, findClass } from './utils';
import styles from './styles';

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
    const $arrow = Element('div', { className: 'mjk-arrow' });
    const viewportWidth = window.innerWidth;

    $container.appendChild($keyboard);
    $container.appendChild($arrow);
    document.body.appendChild($container);

    const mathjaxEditor = new MathJaxEditor(options);

    this.mathjaxEditor = mathjaxEditor;
    this.isMobile = (viewportWidth < 640);
    this.isVisible = false;
    this.pageIndex = 0;
    this.$arrow = $arrow;
    this.$container = $container;
    this.$el = mathjaxEditor.core.$el;
    this.$cursor = mathjaxEditor.core.$cursor;
    this.$keyboard = $keyboard;
    this.$editorContainer = mathjaxEditor.core.$container;
    this.$editorInput = mathjaxEditor.core.$input;

    document.addEventListener('mousedown', this.handleDocumentClick.bind(this));

    this.hideKeyboard();
  }

  /**
   * Create all keys for the keyboard.
   * 
   * @return {Void}
   */
  render() {
    const Element = MathJax.HTML.Element;
    const { $keyboard, mathjaxEditor, pageIndex } = this;

    const keys = Keys.getPage(pageIndex);
    const keyColumns = Keys.getKeyColumns();
    const keyWidth = (keyboardWidth - 20) / keyColumns;
    const keyWidthPx = `${keyWidth}px`;

    emptyElement($keyboard);
    $keyboard.style.width = `${keyboardWidth}px`;

    keys.forEach((rows, i) => {
      const $row = Element('div', { className: 'mjk-keyRow' });

      rows.forEach((column, j) => {
        const key = Keys.getKey(pageIndex, i, j);

        const $key = Element('button', {
          className: 'mjk-key',
          style: {
            fontSize: '16px',
            height: keyWidthPx,
            width: keyWidthPx
          }
        });
        
        if (key.exists()) {
          const listener = key.getClickListener();

          $key.innerHTML = key.getLabel();
          $key.addEventListener('click', () => {
            listener(mathjaxEditor, this);
            this.updateInputElement();
          }); 
        }
        else {
          $key.setAttribute('disabled', 'disabled');
        }

        $row.appendChild($key);
      });

      $keyboard.appendChild($row);
    });

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
      $arrow,
      $cursor,
      $keyboard,
      $container,
      $editorContainer,
      $editorInput,
      mathjaxEditor
    } = this;
    const viewportWidth = window.innerWidth;
    const { top } = $keyboard.getBoundingClientRect();
    
    if (this.isMobile) {
      const padding = (Math.max(viewportWidth, 320) - keyboardWidth) / 2;

      $editorInput.setAttribute('readonly', 'true');
      $container.appendChild($editorContainer);
      $container.appendChild($cursor);
      addClass($editorContainer, 'mjk-input');
      addClass($keyboard, 'isMobile');
      removeClass($keyboard, 'isDesktop');

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

      applyStyles($arrow, {
        display: 'none'
      });
    }
    else {
      addClass($keyboard, 'isDesktop');
      removeClass($keyboard, 'isMobile');
      applyStyles($arrow, { display: 'block' });

      this.appendEditorNextToTargetElement();
    }
  }

  /**
   * Append the editor to its original parent.
   * 
   * @return {Void}
   */
  appendEditorNextToTargetElement() {
    const { $editorContainer, $el } = this;
    removeClass($editorContainer, 'mjk-input');
    $el.parentNode.insertBefore($editorContainer, $el.nextSibling);
  }

  appendCursorToContainer() {
    const { $container, $cursor } = this;
    $container.appendChild($cursor);
  }

  /**
   * Update the container element position and size.
   * 
   * @return {Void}
   */
  updateContainerElement() {
    const { $arrow, $keyboard, $container, $editorContainer } = this;
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

      applyStyles($arrow, {
        left: (width / 2) - 20
      });
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
    this.mathjaxEditor.focus();
    this.render();
  }

  /**
   * Hide the keyboard.
   * 
   * @return {Void}
   */
  hideKeyboard() {
    this.isVisible = false;
    this.mathjaxEditor.blur();
    this.$container.style.display = 'none';
    this.appendEditorNextToTargetElement();
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

    if (e.button !== 0) {
      return;
    }

    if (this.isMobile && $target === $container) {
      return this.hideKeyboard();
    }
    if (findNode($target, $editorContainer)) {
      return this.showKeyboard();
    }
    if (!findNode($target, $container) && !findClass($target, 'mjk-key')) {
      return this.hideKeyboard();
    }
  }
  
  /**
   * Go to next keys page.
   * 
   * @return {Void}
   */
  nextPage() {
    const length = Keys.getPagesLength();
    let index;

    if (this.pageIndex === length - 1) {
      index = 0;
    }
    else {
      index = this.pageIndex + 1;
    }

    this.pageIndex = index;
    this.render();
  }

  /**
   * Go to previous key page.
   * 
   * @return {Void}
   */
  previousPage() {
    const length = Keys.getPagesLength();
    let index;

    if (this.pageIndex === 0) {
      index = length - 1;
    }
    else {
      index = this.pageIndex - 1;
    }
    
    this.pageIndex = index;
    this.render();
  }
}

export default Core;