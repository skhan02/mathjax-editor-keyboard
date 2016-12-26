/*!
 * 
 * MathJax Editor Keyboard
 * https://github.com/ianlucas/mathjax-editor-keyboard
 * 
 * (c) 2016, Ian Lucas.
 * Released under the MIT license
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MathJaxEditorKeyboard"] = factory();
	else
		root["MathJaxEditorKeyboard"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Editor__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__extendMathJax__ = __webpack_require__(5);



window.addEventListener('load', __WEBPACK_IMPORTED_MODULE_1__extendMathJax__["a" /* default */]);

/**
 * This is the MathJaxEditor class.
 * 
 * It has an API on top of the Editor class.
 */
class MathJaxEditor {
  /**
   * Creates an instance of Editor.
   * 
   * @constructor
   */
  constructor(options) {
    const editor = new __WEBPACK_IMPORTED_MODULE_0__Editor__["a" /* default */](options);

    this.editor = editor;
    this.version = '1.1.7';
  }

  /**
   * Blur the editor.
   * 
   * @return {Void}
   */
  blur() {
    this.editor.blur();
  }

  /**
   * Focus the editor.
   * 
   * @return {Void}
   */
  focus() {
    this.editor.focus();
  }

  /**
   * This inserts a command into the editor.
   * 
   * @param {String} command
   * @param {Number} blockCount
   * @param {Boolean} brackets
   * 
   * @return {Void}
   */
  insertCommand(command, blockCount = 1, brackets = false) {
    this.editor.insertCommand(command, blockCount, brackets);
  }

  /**
   * Insert a piece of text in editor's value.
   * 
   * @param {String} value
   * 
   * @return {Void}
   */
  insert(value) {
    this.editor.insert(value);
  }

  /**
   * Get editor's jax.
   * 
   * @deprecated
   * 
   * @return {String}
   */
  getJax() {
    console.warn('[deprecated] getJax is deprecated, use getValue instead.')
    return this.editor.value;
  }

  /**
   * Get editor's value.
   * 
   * @deprecated
   * 
   * @return {String}
   */
  getValue() {
    return this.editor.value;
  }

  /**
   * Move the cursor to the left.
   * 
   * @return {Void}
   */
  moveCursorLeft() {
    this.editor.moveCursorLeft();
  }

  /**
   * Move the cursor to the right.
   * 
   * @return {Void} 
   */
  moveCursorRight() {
    this.editor.moveCursorRight();
  }

  /**
   * Erases the character before the cursor.
   * 
   * @return {Void}
   */
  erase() {
    this.editor.erase();
  }

  /**
   * Listen to an event to be triggered by the Editor.
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

module.exports = MathJaxEditor;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventBus__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Placer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Iterator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(7);





const KEY_BACKSPACE = 8;
const KEY_ENTER = 13;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_DELETE = 46;

class Editor {
  /**
   * This is the main class of the Editor.
   * 
   * It contains all methods to deal with the cursor and math input.
   * It accepts an object as first argument, which must contain the options.
   * 
   * @param {Object} options
   * @param {DOMElement|String} options.el - The DOM Element itself or a string selector.
   * @param {Boolean} options.debug - Set debug mode.
   * @param {String} options.focusClass - Which class to use to identify focus.
   * @param {Boolean} options.newLine - Allow or disallow newline. (default is false)
   * 
   * @constructor
   */
  constructor({ el, debug = false, focusClass = 'isFocused', newLine = false, value = '' }) {
    const Element = MathJax.HTML.Element;

    const $el = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* mustFindElement */])(el);
    const $container = Element('div', { className: 'mj-ed-container' });
    const $input = Element('input', { className: 'mj-ed-input' });
    const $display = Element('div', { className: 'mj-ed-display' }, [`\\({\\cursor}${value}\\)`]);
    const $debug = Element('pre', { className: 'mj-ed-debug' }, ['|']);

    $el.parentNode.replaceChild($container, $el);
    $container.appendChild($input);
    $container.appendChild($display);
    $container.appendChild($debug);

    $input.addEventListener('keydown', this.handleInputEvent.bind(this));
    $input.addEventListener('keyup', this.handleInputEvent.bind(this));
    $input.addEventListener('blur', this.blur.bind(this));
    $display.addEventListener('click', this.focus.bind(this));
    document.body.addEventListener('click', this.handleBodyClick.bind(this));

    $display.style.opacity = 0;
    $debug.style.display = debug ? 'block' : 'none';

    MathJax.Hub.Queue(
      ['Typeset', MathJax.Hub, $display], () => {
        this.jaxElement = MathJax.Hub.getAllJax($display)[0];
      }, () => {
        $display.style.opacity = 1;
        $display.style.minHeight = `${$display.offsetHeight}px`;
        this.update(value, { hidden: true });
      }
    );

    this.$container = $container;
    this.$debug = $debug;
    this.$display = $display;
    this.$input = $input;
    this.bus = new __WEBPACK_IMPORTED_MODULE_0__EventBus__["a" /* default */];
    this.cursor = 0;
    this.placer = null;
    this.debug = debug;
    this.focusClass = focusClass;
    this.newLine = newLine;
    this.value = value;
  }

  /**
   * This will update `this.$display`'s jax. Also will update `this.$debug`
   * inner HTML if the options.debug is enabled.
   * 
   * @param {String} value - Jax to be used. It defaults to the editor's value.
   * @param {Object} cursorOptions - Options to be passed to `updateCursorElement`.
   * 
   * @return {Void}
   */
  update(value = this.value, cursorOptions = {}) {
    const cursor = this.cursor;
    const valueWithCursor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* insertBetween */])(value, cursor, '{\\cursor}')
      .replace(/\d/g, n => `{${n}}`)
      .replace(/\,/g, comma => `{${comma}}`)
      .replace(/\{\}/g, '{\\isEmpty}')
      .replace(/\[\]/g, '[\\isEmpty]')
      .replace(/\{\{\\cursor\}\}/g, '{{\\cursor}\\isEmpty}')
      .replace(/\[\{\\cursor\}\]/g, '[{\\cursor}\\isEmpty]');

    if (this.debug) {
      this.$debug.innerHTML = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* insertBetween */])(value, cursor, '|');
    }

    this.updateJaxElement(
      valueWithCursor, () => {
        setTimeout(() => {
          this.placer = __WEBPACK_IMPORTED_MODULE_1__Placer__["a" /* default */].read(this, cursor => {
            console.log(`The cursor should be placed at ${cursor}`);
            this.cursor = cursor;
            this.update();
          });
        }, 20);

        this.updateCursorElement(cursorOptions);
      }
    );
  }

  /**
   * Updates the Jax Element inside of `this.display`.
   * 
   * @param {String} jax
   * @param {Function} callback
   * 
   * @return {Void}
   */
  updateJaxElement(jax, callback = Function) {
    MathJax.Hub.Queue(
      ['Text', this.jaxElement, jax],
      callback
    );
  }

  /**
   * This updates the cursor position based on the amount
   * of movement is given.
   * 
   * PS: The meaning of the variable `next` is not the next index,
   *     but the next value the cursor will hold.
   * 
   * @param {Number} amount
   * 
   * @return {Void}
   */
  updateCursor(amount = 0) {
    let next = this.cursor + amount;
    const cursor = this.cursor;
    const iterator = new __WEBPACK_IMPORTED_MODULE_2__Iterator__["a" /* default */](this.value);
    const currentChar = iterator.at(cursor);
    const nextChar = iterator.at(next);

    // Moving to the left.

    if (amount < 0) {
      nextChar
        .when('{')
        .andPreviousCharacterNotIs('}')
        .findBackwards('\\', '^', '_', ']')
          .then(i => next = i);

      nextChar
        .when('{')
        .andPreviousCharacterIs('}')
          .then(() => next -= 1);

      nextChar
        .when('\\')
        .andPreviousCharacterIs('\\')
          .then(() => next -= 1);

      nextChar
        .when(' ')
        .findBackwards('\\')
          .then(i => next = i);

      nextChar
        .when('[')
        .findBackwards('\\')
          .then(i => next = i);
    }

    // Moving to the right.

    if (amount > 0) {
      currentChar
        .when('\\', '^', '_')
        .andNextCharacterNotIs('\\')
        .findForwards('{', ' ', '[')
          .then(i => next = i + 1);

      currentChar
        .when('}', ']')
        .andNextCharacterIs('{')
          .then(() => next += 1);

      currentChar
        .when('\\')
        .andNextCharacterIs('\\')
          .then(() => next += 1);
    }

    this.cursor = next;
    this.update();
  }

  /**
   * Update the cursor element.
   * 
   * @param {Object} options
   * @param {Boolean} options.hidden
   * 
   * @return {Void}
   */
  updateCursorElement(options = {}) {
    const hidden = options.hidden || false;

    
    MathJax.Hub.Queue(() => {
      const $cursor = this.$display.querySelector('.mjx-cursor');
      if (!$cursor) {
        return;
      }
      if (!$cursor.style.marginLeft) {
        $cursor.style.marginLeft = `-${$cursor.offsetWidth}px`;
      }

      // Fix #7
      if (this._cursorRecentlyPlaced) {
        clearTimeout(this._cursorRecentlyPlaced);
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* addClass */])($cursor, 'wasRecentlyPlaced');
      this._cursorRecentlyPlaced = setTimeout(() => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["d" /* removeClass */])($cursor, 'wasRecentlyPlaced');
      }, 600);

      $cursor.style.display = hidden ? 'none' : 'inline-block';
    });
  }

  /**
   * Find a jax command at given position.
   * 
   * For instance, consider this as the current value of the editor:
   * 
   *     '\sqrt{2}'
   * 
   * If the given position is the index of any character of the
   * command '\sqrt', it will return the start and the end of the
   * command.
   * 
   * @param {Number} position
   * 
   * @return {Object}
   */
  findCommandAt(position) {
    const coordinates = { start: null, end: null };
    const value = this.value;
    const length = value.length;
    const previous = position - 1;
    const next = position + 1;
    let i;
    
    i = next;

    while (i--) {
      if (~['\\', '^', '_'].indexOf(value[i])) {
        coordinates.start = i;
        break;
      }
    }

    i = previous;

    while (i++ < value.length) {
      if (value[i] === '}' && value[i + 1] !== '{') {
        coordinates.end = i;
        break;
      }

      if (value[i - 1] === ' ') {
        coordinates.end = i - 1;
        break;
      }
    }

    if (coordinates.end === null) {
      coordinates.end = i;
    }

    return coordinates;
  }

  /**
   * This will handle the events of `this.$input`.
   * It captures the key pressed and what the user have typed.
   * 
   * @param {KeyboardEvent} e
   * 
   * @return {Void}
   */
  handleInputEvent(e) {
    const $input = this.$input;
    const inputValue = $input.value.trim();
    let which = e.keyCode;

    $input.value = '';

    if (e.type === 'keyup') {
      which = null;
    }

    if (!inputValue.length) {
      return this.handleInput(which);
    }

    const translate = {
      '+': '+',
      '-': '-',
      '=': '=',
      ',': ',',
      '.': '.',
      '*': '\\cdot ',
      '/': '\\div '
    };

    const test = {
      char: /[\d\w]/
    };

    inputValue.split('')
      .forEach(char => {
        if (!char.match(test.char) && !translate[char]) {
          return;
        }

        if (translate[char]) {
          char = translate[char];
        }

        this.handleInput(which, char);
      });
  }

  /**
   * Handles the user input.
   * 
   * @param {Number} which - Which key was pressed.
   * @param {String} char - The character that was typed.
   * 
   * @return {Void}
   */
  handleInput(which, char) {
    switch (which) {
      case KEY_LEFT:
        this.moveCursorLeft();
        return;

      case KEY_RIGHT:
        this.moveCursorRight();
        return;

      case KEY_BACKSPACE:
        this.erase();
        return;

      case KEY_DELETE:
        this.delete();
        return;

      case KEY_ENTER:
        if (this.newLine) {
          this.insert('\\\\');
        }
        return;
    }

    if (which && this.debug) {
      console.warn(`The key ${which} was pressed.`);
    }

    if (!char) {
      return;
    }

    this.insert(char);
  }

  /**
   * Move the cursor to the left.
   * 
   * @return {Void}
   */
  moveCursorLeft() {
    if (this.cursor > 0) {
      this.updateCursor(-1);
    }
  }

  /**
   * Move the cursor to the right.
   * 
   * @return {Void}
   */
  moveCursorRight() {
    if (this.cursor < this.value.length) {
      this.updateCursor(1);
    }
  }
  
  /**
   * When document.body is clicked, this will check if the
   * cursor can be moved.
   * 
   * @see Placer
   * 
   * @param {Event} e
   * 
   * @return {Void}
   */
  handleBodyClick(e) {
    if (!this.placer) {
      return;
    }
    
    this.placer.fireClick(e);
  }

  /**
   * Focus the editor.
   * 
   * @return {Void}
   */
  focus() {
    this.$input.focus();
    this.updateCursorElement({ hidden: false });
    this.bus.trigger('focus');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* addClass */])(this.$display, this.focusClass);
  }

  /**
   * Blur the editor.
   * 
   * @return {Void}
   */
  blur() {
    this.$input.blur();
    this.updateCursorElement({ hidden: true });
    this.bus.trigger('blur');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["d" /* removeClass */])(this.$display, this.focusClass);
  }

  /**
   * Insert a piece of text in editor's value.
   * 
   * @param {String} value
   * 
   * @return {Void}
   */
  insert(value) {
    const cursor = this.cursor;
    const current = this.value;

    this.cursor += value.length;
    this.value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* insertBetween */])(current, cursor, value);

    this.update();
  }

  /**
   * Inserts a command in the editor.
   * 
   * The cursor will moved to the first "block" ({}).
   * 
   * @param {String} command - The command.
   * @param {Number} blockCount - The quantity of blocks it requires.
   * @param {Boolean} brackets - If brackets should be placed.
   * 
   * @return {Void}
   */
  insertCommand(command, blockCount = 1, brackets = false) {
    this.focus();

    if (brackets) {
      command += '[]';
    }

    if (blockCount > 0) {
      command += '{';
    }
    else {
      command += ' ';
    }

    this.insert(command);

    if (blockCount < 1) {
      return;
    }

    const value = this.value;
    const cursor = this.cursor;
    const blocks = '}' + '{}'.repeat(blockCount - 1);

    this.value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* insertBetween */])(value, cursor, blocks);
    this.update();
  }

  /**
   * Erases the character before the cursor.
   * 
   * @return {Void}
   */
  erase() {
    const current = this.cursor;
    const previous = this.cursor - 1;
    const value = this.value;

    let before;
    let after;

    // Check if we are erasing a command.
    if (~['{', '}', ' '].indexOf(value[previous])) {
      const coordinates = this.findCommandAt(current);
      before = value.slice(0, coordinates.start);
      after = value.slice(coordinates.end + 1);
    }
    else {
      let beforeIndex = current - 1;

      // Check if we are erasing a new line.
      if (value[previous] === '\\' 
            && value[previous - 1] === '\\') {
        beforeIndex -= 1;
      }

      before = value.slice(0, beforeIndex);
      after = value.slice(current);
    }

    this.value = before + after;
    this.cursor = before.length;

    this.update();
  }

  /**
   * Erases the character before the cursor.
   * 
   * @return {Void}
   */
  delete() {
    const current = this.cursor;
    const next = this.cursor + 1;
    const value = this.value;

    let before;
    let after;

    // Check if we are erasing a command (and not a new line).
    if ((value[current] === '\\' && value[next] !== '\\') 
          || value[current] === '}') {
      const coordinates = this.findCommandAt(current);
      before = value.slice(0, coordinates.start);
      after = value.slice(coordinates.end + 1);
    }
    else {
      let beforeIndex = current;
      let afterIndex = next;

      // Check if we are erasing a new line.
      if (value[current] === '\\' 
            && value[next] === '\\') {
        afterIndex += 1;
      }

      before = value.slice(0, beforeIndex);
      after = value.slice(afterIndex);
    }

    this.value = before + after;
    this.cursor = before.length;

    this.update();
  }

  /**
   * Listen to an event to be triggered by the Editor.
   * 
   * @param {String} type
   * @param {Function} listener
   * 
   * @return {Void}
   */
  on(type, listener) {
    this.bus.on(type, listener);
  }
}

/* harmony default export */ exports["a"] = Editor;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
class EventBus {
  constructor() {
    this.registry = {};
  }

  on(type, listener) {
    this.registry[type] = (this.registry[type] || []).concat(listener);
  }

  trigger(type, ...rest) {
    if (this.registry[type]) {
      this.registry[type].forEach(listener => listener(...rest));
    }
  }
}

/* harmony default export */ exports["a"] = EventBus;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * This class helps to iterate over a string.
 */
class Iterator {
  /**
   * @param {String} tex
   * @constructor
   */
  constructor(tex) {
    this.tex = tex;
  }

  /**
   * Get character at given index.
   * 
   * @param {Number} index
   * 
   * @return IteratorCharacter
   */
  at(index) {
    return new IteratorCharacter(this.tex, index);
  }
}

/**
 * This class represents a text character.
 */
class IteratorCharacter {
  /**
   * @param {String} tex - Text it came from.
   * @param {Number} index - Its index in that text.
   *
   * @constructor
   */
  constructor(tex, index) {
    this.tex = tex;
    this.index = index;
    this.value = tex[index];
  }

  /**
   * Check if this character is equals to any of given arguments.
   * 
   * @param {String} ...chars
   * 
   * @return {Boolean}
   */
  is(...chars) {
    return !!~chars.indexOf(this.value);
  }

  /**
   * If the char is equals to any of given arguments,
   * returns a logic constructor.
   * 
   * @param {String} ...char
   * 
   * @return {IteratorFlow}
   */
  when(...chars) {
    return new IteratorFlow(this, this.is(...chars));
  }

  /**
   * Get the character previous to this character.
   * 
   * @return {IteratorCharacter}
   */
  previousCharacter() {
    return new IteratorCharacter(this.tex, this.index - 1);
  }

  /**
   * Get the character next to this character.
   * 
   * @return {IteratorCharacter}
   */
  nextCharacter() {
    return new IteratorCharacter(this.tex, this.index + 1);
  }
}

class IteratorFlow {
  /**
   * @param {IteratorCharacter} char
   * @param {Boolean} assertion
   * 
   * @constructor
   */
  constructor(char, assertion) {
    this.assertion = assertion;
    this.char = char;
    this.tex = char.tex;
    this.iterator = char.index;
  }

  /**
   * @param {Boolean} expression
   */
  and(expression) {
    if (this.assertion) {
      this.assertion = !!expression;
    }
  }

  /**
   * Check if next character is equals to the expected.
   * 
   * @param {String} expected
   * 
   * @return {IteratorFlow} this
   */
  andNextCharacterIs(expected) {
    this.and(this.char.nextCharacter().is(expected));
    return this;
  }

  /**
   * Check if next character is not equals to the expected.
   * 
   * @param {String} expected
   * 
   * @return {IteratorFlow} this
   */
  andNextCharacterNotIs(expected) {
    this.and(!this.char.nextCharacter().is(expected));
    return this;
  }

  /**
   * Check if previous character is equals to the expected.
   * 
   * @param {String} expected
   * 
   * @return {IteratorFlow} this
   */
  andPreviousCharacterIs(expected) {
    this.and(this.char.previousCharacter().is(expected));
    return this;
  }

  /**
   * Check if previous character is not equals to the expected.
   * 
   * @param {String} expected
   * 
   * @return {IteratorFlow} this
   */
  andPreviousCharacterNotIs(expected) {
    this.and(!this.char.previousCharacter().is(expected));
    return this;
  }

  /**
   * Find backwards any of the given chars.
   * 
   * This will change `this.iterator` which is passed 
   * to `this.then` callback.
   * 
   * @param {String} ...chars
   * 
   * @return {IteratorFlow} this
   */
  findBackwards(...chars) {
    const tex = this.tex;
    let i = this.iterator;

    while (i--) {
      if (~chars.indexOf(tex[i])) {
        break;
      }
    }

    this.iterator = i;
    return this;
  }

  /**
   * Find forwards any of the given chars.
   * 
   * This will change `this.iterator` which is passed 
   * to `this.then` callback.
   * 
   * @param {String} ...chars
   * 
   * @return {IteratorFlow} this
   */
  findForwards(...chars) {
    const tex = this.tex;
    const length = tex.length;
    let i = this.iterator;

    while (i++ < length) {
      if (~chars.indexOf(tex[i])) {
        break;
      }
    }

    this.iterator = i;
    return this;
  }

  /**
   * If the assertion is truthy, call the given callback.
   * 
   * @param {Function} callback
   * 
   * @return {Void}
   */
  then(callback) {
    if (!this.assertion) {
      return;
    }
    callback(this.iterator);
  }
}

/* harmony default export */ exports["a"] = Iterator;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
class Placer {
  /**
   * This is the Placer class.
   * 
   * It parse the current tex, and calculates the boundings of each
   * variable/number/command elements to determinate if a cursor position
   * change is possible (when the user clicks on `document.body`), it also
   * specify which position the cursor should be moved to.
   * 
   * @param {Editor} editor
   * 
   * @constructor
   */
  constructor(editor) {
    this.intervals = [];
    this.onRequestPlacement = Function;
    this.tex = editor.value;
    this.$display = editor.$display;
    this.findings = {};
    this.isDebug = editor.debug;

    this.parse();
  }

  /**
   * This will read an editor, and fire `onRequestPlacement` if cursor
   * should be moved to another position.
   * 
   * This will return a new instance of Placer.
   * 
   * @param {Editor} editor
   * @param {Function} onRequestPlacement
   * 
   * @return {Placer}
   */
  static read(editor, onRequestPlacement = Function) {
    const placer = new Placer(editor);
    placer.onRequestPlacement = onRequestPlacement;
    return placer;
  }

  /**
   * Debug helper function. Works just like console.log.
   * 
   * @return {Void}
   */
  debug(...args) {
    if (!this.isDebug) {
      return;
    }
    console.log(...args);
  }

  /**
   * Add an interval to intervals list.
   * 
   * @param {Number} index
   * @param {Number} startX
   * @param {Number} endX
   * @param {Number} startY
   * @param {Number} endY
   * @param {Boolean} useAllArea - If the click point is inside this 
   *                               interval boundings, cursor will be
   *                               placed at this interval index.
   * 
   * @return {Void}
   */
  addInterval(index, startX, endX, startY, endY, useAllArea = false) {
    this.intervals.push({
      index, startX, endX, startY, endY, useAllArea
    });
  }

  /**
   * Returns the index which the cursor should be placed
   * based on given `x`, and `y`.
   * 
   * @param {Object} interval
   * @param {Number} x
   * @param {Number} y
   * @param {Number} i - Index of the given interval inside `this.intervals`.
   * 
   * @return {Number}
   */
  placeAtInterval(interval, x, y, i) {
    const width = interval.endX - interval.startX;
    let index = interval.index;

    this.debug(`Interval X from ${interval.startX} to ${interval.endX} (Middle point x: ${interval.startX + (width / 2)}, width: ${width})`);
    this.debug(`Interval Y from ${interval.startY} to ${interval.endY}`);

    if (interval.useAllArea) {
      return index;
    }

    if (x > interval.startX + (width / 2)) {
      if (this.intervals[i + 1]) {
        index = this.intervals[i + 1].index;
      }
      else {
        index = this.tex.length;
      }
    }
    
    this.debug(`[placeAtInterval] Cursor to be placed at ${index}.`);

    return index;
  }

  /**
   * Checks if the cursor must be moved, and if so,
   * it fires `this.onRequestPlacement` with the position.
   * 
   * @param {Event} e
   * 
   * @return {Void}
   */
  fireClick(e) {
    const { bottom } = this.$display.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    let index = this.tex.length;

    this.debug(`You has clicked at (${x}, ${y}).`);
    this.debug(this.intervals);

    // If there are no intervals, or the point `y` is
    // not in the range of the editor's bounds, we just
    // ignore the event. TODO: Check for y top.

    if (!this.intervals.length || y > bottom) {
      return;
    }
    
    let found = false;

    // First strategy: checks if the clicked point is inside a number/
    // variable/operator bounding. If it is, place it where is proper. 

    this.intervals.forEach((interval, i) => {
      if (interval.startX <= x && x < interval.endX) {
        if (interval.startY <= y && y < interval.endY) {
          found = true;
          index = this.placeAtInterval(interval, x, y, i);
        }
      }
    });

    // Second strategy: find the nearest element to the clicked point.

    if (!found) {
      let last = { interval: null, distance: null, i: null };

      this.intervals.forEach((interval, i) => {
        if (!(interval.startY < y && y < interval.endY)) {
          return;
        }
        const distance = Math.min(Math.abs(interval.startX - x), Math.abs(interval.endX - x));
        if (last.distance === null || distance < last.distance) {
          last.interval = interval;
          last.distance = distance;
          last.i = i;
        }
      });

      if (!last.interval) {
        return;
      }

      index = this.placeAtInterval(last.interval, x, y, last.i);
      this.debug(`[fireClick] Not found a bounding, placeing at ${index}.`);
    }

    // Check if the clicked point is out of bounds.
    // Since we can have now empty startX and endX, we need to
    // iterate the intervals.

    // let i = 0;
    // const length = this.intervals.length;

    // for (; i < length; i++) {
    //   if (this.intervals[i].startX) {
    //     if (x < this.intervals[i].startX) {
    //       this.debug(`[fireClick] Out of display boundings. Placing at start.`);
    //       index = 0;
    //     }
    //     break;
    //   }
    // }

    // for (i = length - 1; i >= 0; i--) {
    //   if (this.intervals[i].endX) {
    //     if (x > this.intervals[i].endX) {
    //       this.debug(`[fireClick] Out of display boundings. Placing at the end.`);
    //       index = this.tex.length;
    //     }
    //     break;
    //   }
    // }

    this.onRequestPlacement(index);
  }

  /**
   * Find an element of the given type and add its interval data 
   * to `this.intervals`.
   * 
   * @param {String} type
   * @param {Number} index
   * @param {Boolean} nearClosure
   * 
   * @return {Void}
   */
  find(type, index, nearClosure) {
    this.findings[type] = this.findings[type] || 0;
    const $el = this.$display.querySelectorAll(`.mjx-${type}`)[this.findings[type]];
    const bounding = $el.getBoundingClientRect();
    this.addInterval(index, bounding.left, bounding.right, bounding.top, bounding.bottom);
    this.findings[type] += 1;
    if (nearClosure) {
      this.addInterval(index + 1, 0, 0, 0, 0);
    }
  }

  /**
   * Find a command element.
   * 
   * @param {String} command
   * @param {Number} index
   * 
   * @return {Void}
   */
  findCommand(command, index) {
    command = command.replace(/[\[\{].*(\]\{.*)?/, '');
    const name = command.slice(1);
    this.findings[name] = this.findings[name] || 0;
    const $el = this.$display.querySelectorAll(`.mjx-m${name}`)[this.findings[name]];
    const bounding = $el.getBoundingClientRect();

    switch (name) {
      case 'frac':
        const $numerator = $el.querySelector('.mjx-numerator');
        const $denominator = $el.querySelector('.mjx-denominator');
        const numBounding = $numerator.getBoundingClientRect();
        const denBounding = $denominator.getBoundingClientRect();
        const boundings = [numBounding, denBounding];
        var { blocks } = this.parseCommandAt(index);

        boundings.forEach((bounding, i) => {
          if ((blocks[i].closeIndex - blocks[i].openIndex) === 1) {
            this.addInterval(blocks[i].closeIndex, bounding.left, bounding.right, bounding.top, bounding.bottom, true);
          }
        });

        break;

      case 'root':
      case 'sqrt':
        var { blocks, brackets } = this.parseCommandAt(index);

        if (brackets.closeIndex && (brackets.closeIndex - brackets.openIndex) === 1) {
          const $root = $el.querySelector('.mjx-root .mjx-char');
          const { left, right, top, bottom } = $root.getBoundingClientRect();
          this.addInterval(brackets.closeIndex, left, right, top, bottom, true);
        }
        if ((blocks[0].closeIndex - blocks[0].openIndex) === 1) {
          const $box = $el.querySelector('.mjx-box');
          const { left, right, top, bottom } = $box.getBoundingClientRect();
          this.addInterval(blocks[0].closeIndex, left, right, top, bottom, true);
        }
        break;
    }
  }

  /**
   * Parse the editor's tex.
   * 
   * @return {Void}
   */
  parse() {
    const tex = this.tex;
    const length = tex.length;
    let i = 0;

    const test = {
      isNumber: /\d/,
      isVariable: /\w/,
      isOperator: /[\+\-\=\,\.]/
    }

    for (; i < length; i++) {
      const char = tex[i];
      let nearClosure = (!!~['}', ']', '\\'].indexOf(tex[i + 1]));

      if (test.isNumber.exec(char)) {
        this.find('mn', i, nearClosure);
        continue;
      }

      if (test.isVariable.exec(char)) {
        this.find('mi', i, nearClosure);
        continue;
      }

      if (test.isOperator.exec(char)) {
        this.find('mo', i, nearClosure);
        continue;
      }

      // Newline, so we skip.
      if (char === '\\' && tex[i + 1] === '\\') {
        i += 1;
        continue;
      }

      if (char === '\\') {
        let j = i;
        let command = '';
        for (; j < length; j++) {
          const subchar = tex[j];
          nearClosure = (!!~['}', ']', '\\'].indexOf(tex[j + 1]))
          command += subchar;
          if (~[' ', '{', '['].indexOf(subchar)) {
            const list = {
              '\\cdot': 'mo',
              '\\div': 'mo'
            };
            const trimmed = command.trim();
            const type = list[trimmed] ? list[trimmed] : 'mi';
            if (subchar === ' ') {
              this.find(type, i, nearClosure);
            }
            else {
              if (command.match(/\\sqrt\[/)) {
                command = command.replace('sqrt', 'root');
              }
              this.findCommand(command, i);
            }
            i = j;
            break;
          }
        }
      }
    }
  }

  parseCommandAt(i) {
    const length = this.tex.length;
    let blocks = [];
    let brackets = { openIndex: null, closeIndex: null };
    let openBlocks = 0;

    for (; i < length; i++) {
      const char = this.tex[i];
      if (char === '[') {
        brackets.openIndex = i;
      }
      if (char === ']') {
        brackets.closeIndex = i;
      }
      if (char === '{') {
        if (openBlocks === 0) {
          blocks.push({ openIndex: i });
        }
        openBlocks += 1;
      }
      if (char === '}') {
        openBlocks -= 1;
        if (openBlocks === 0) {
          blocks[blocks.length - 1].closeIndex = i;
        }
      }
      if (char === '}' && this.tex[i + 1] !== '{') {
        break;
      }
    }

    return {
      blocks,
      brackets
    };
  }
}

/* harmony default export */ exports["a"] = Placer;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles__ = __webpack_require__(6);
/* harmony export (immutable) */ exports["a"] = extendMathJax;


/**
 * This will extend MathJax so that we can put our simple
 * cursor there.
 */
function extendMathJax() {
  const TEX = MathJax.InputJax.TeX;
  const MML = MathJax.ElementJax.mml;

  // This removes the pause (in milliseconds) between input and output 
  // phases of MathJax's processing. So it looks seamless!

  MathJax.Hub.processSectionDelay = 0;

  MathJax.Hub.Register.StartupHook("TeX Jax Ready", () => {
    const defaults = {
      mathvariant: MML.INHERIT,
      mathsize: MML.INHERIT,
      mathbackground: MML.INHERIT,
      mathcolor: MML.INHERIT,
      dir: MML.INHERIT
    };

    TEX.Definitions.Add({
      macros: {
        cursor: 'Cursor',
        isEmpty: 'IsEmpty'
      }
    }, null, true);

    MML.mcursor = MML.mbase.Subclass({
      type: 'cursor',
      isToken: true,
      isSpacelike: () => true,
      texClass: MML.TEXCLASS.ORD,
      defaults
    });

    MML.misEmpty = MML.mbase.Subclass({
      type: 'isEmpty',
      isToken: true,
      isSpacelike: () => true,
      texClass: MML.TEXCLASS.ORD,
      defaults
    });

    TEX.Parse.Augment({
      Cursor(name) {
        const $cursor = MML.mcursor('0');
        this.Push($cursor);
      },

      IsEmpty(name) {
        const $isEmpty = MML.misEmpty('?');
        this.Push($isEmpty);
      }
    });
  });

  MathJax.Ajax.Styles(__WEBPACK_IMPORTED_MODULE_0__styles__["a" /* default */]);
}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const animation = 
`from, to { border-color: #000 }
 50% { border-color: transparent }`;

/* harmony default export */ exports["a"] = {
  '.mjx-cursor': {
    '-webkit-animation': '1s mj-ed-blink step-end infinite',
    '-moz-animation': '1s mj-ed-blink step-end infinite',
    '-ms-animation': '1s mj-ed-blink step-end infinite',
    '-o-animation': '1s mj-ed-blink step-end infinite',
    animation: '1s mj-ed-blink step-end infinite',
    'border-right': '2px solid #000',
    color: 'transparent'
  },

  '.mjx-cursor.wasRecentlyPlaced': {
    'border-right-color': '#000 !important'
  },

  '.mj-ed-input': {
    left: '-100%',
    position: 'absolute',
    top: '-100%'
  },

  '.mj-ed-display': {
    'box-sizing': 'border-box'
  },

  '.mj-ed-display *': {
    outline: 'none'
  },

  '.mj-ed-selectionButton': {
    cursor: 'text'
  },

  '.mjx-isEmpty': {
    color: '#ccc'
  },

  '@keyframes mj-ed-blink': animation,
  '@keyframes mj-ed-blink': animation,
  '@-moz-keyframes mj-ed-blink': animation,
  '@-webkit-keyframes mj-ed-blink': animation,
  '@-ms-keyframes mj-ed-blink': animation,
  '@-o-keyframes mj-ed-blink': animation
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = mustFindElement;
/* harmony export (immutable) */ exports["b"] = insertBetween;
/* harmony export (immutable) */ exports["d"] = removeClass;
/* harmony export (immutable) */ exports["c"] = addClass;
/* unused harmony export toArray */
/**
 * Tries to find the specified element. If it fails, an error is thrown.
 * 
 * @param {DOMElement|string} el - An element or a selector.
 * 
 * @return {DOMElement}
 */
function mustFindElement(el) {
  const error = new Error('You must define a target element.');

  if (!el) {
    throw error;
  }

  if (typeof el === 'string') {
    const $el = document.querySelector(el);
    if (!$el) {
      throw error;
    }
    return $el;
  }

  // Yeah, we just assume an element was given...
  return el;
}

/**
 * Insert a text in the middle of the given string.
 * 
 * @param {String} string
 * @param {Number} index
 * @param {String} fragment
 * 
 * @return {String}
 */
function insertBetween(string, index, fragment) {
  const before = string.slice(0, index);
  const after = string.slice(index);
  return before + fragment + after;
}

/**
 * Remove a class of an element.
 * 
 * @param {DOMElement} $el
 * @param {String} className
 * 
 * @return {Void}
 */
function removeClass($el, className) {
  const classes = $el.className.split(' ');
  let finalValue = '';

  for (const c of classes) {
    if (c !== className) {
      finalValue += ` ${c}`;
    }
  }

  $el.className = finalValue.trim();
}

/**
 * Add a class to an element.
 * 
 * @param {DOMElement} $el
 * @param {String} className
 * 
 * @return {Void}
 */
function addClass($el, className) {
  const classes = $el.className.split(' ');
  if (!(~classes.indexOf(className))) {
    $el.className += ` ${className}`;
  }
  $el.className = $el.className.trim();
}

/**
 * Converts a DOM node list to array.
 * 
 * @param {DOMNodeList}
 * 
 * @return {Array}
 */
function toArray(children) {
  const slice = [].slice;
  return slice.call(children);
}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mathjaxEditor = __webpack_require__(0);

var _mathjaxEditor2 = _interopRequireDefault(_mathjaxEditor);

var _loadStyles = __webpack_require__(9);

var _loadStyles2 = _interopRequireDefault(_loadStyles);

var _keyboard = __webpack_require__(10);

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = null;
var keyRows = _keyboard2.default.keyRows,
    keyColumns = _keyboard2.default.keyColumns,
    getKey = _keyboard2.default.getKey;

var MathJaxEditorKeyboard = function () {
  function MathJaxEditorKeyboard(options) {
    var _this = this;

    _classCallCheck(this, MathJaxEditorKeyboard);

    Element = Element || MathJax.HTML.Element;

    var $container = Element('div', { className: 'mjk-container' });
    var $keyboard = Element('div', { className: 'mjk-keyboard' });

    $container.appendChild($keyboard);
    document.body.appendChild($container);

    var editor = new _mathjaxEditor2.default(options);
    editor.on('focus', this.showKeyboard.bind(this));
    editor.on('blur', this.hideKeyboard.bind(this));

    this.$keyboard = $keyboard;
    this.editor = editor;

    setTimeout(function () {
      return _this.showKeyboard();
    });
  }

  _createClass(MathJaxEditorKeyboard, [{
    key: 'showKeyboard',
    value: function showKeyboard() {
      // This should be at least 320px, 20 for padding.
      var width = this.$keyboard.offsetWidth - 20;
      var keyWidth = width / keyColumns;
      var keyWidthPx = keyWidth + 'px';
      var i = 0;
      for (; i < keyRows; i++) {
        var $row = Element('div', { className: 'mjk-keyRow' });
        var j = 0;
        for (j; j < keyColumns; j++) {
          var key = getKey(i, j);
          var $key = Element('div', {
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
  }, {
    key: 'hideKeyboard',
    value: function hideKeyboard() {}
  }]);

  return MathJaxEditorKeyboard;
}();

module.exports = MathJaxEditorKeyboard;

/***/ },
/* 9 */
/***/ function(module, exports) {

"use strict";
'use strict';

function onLoad() {
  var styles = {
    '.mjk-container': {
      'background-color': 'rgba(0, 0, 0, 0.5)',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%'
    },

    '.mjk-keyboard': {
      'background-color': '#333',
      bottom: 0,
      height: '320px',
      left: 0,
      'padding-top': '1em',
      position: 'absolute',
      width: '320px'
    },

    '.mjk-keyRow': {
      'align-items': 'center',
      display: 'flex',
      'justify-content': 'center',
      'overflow': 'hidden'
    },

    '.mjk-key': {
      'align-items': 'center',
      color: '#fff',
      display: 'flex',
      float: 'left',
      'justify-content': 'center',
      'text-align': 'center'
    }
  };

  MathJax.Ajax.Styles(styles);
}

window.addEventListener('load', onLoad);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Key = __webpack_require__(11);

var _Key2 = _interopRequireDefault(_Key);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keys = [[{ label: '(' }, { label: ')' }, { label: '|' }, { label: '\[' }, { label: '\]' }, { label: '\\sqrt{a}' }, { label: '\\sqrt[n]{a}' }, { label: '\\geq' }], [{ label: 'x' }, { label: '7' }, { label: '8' }, { label: '9' }, { label: '\\frac{a}{b}' }, { label: 'a^n' }, { label: 'a_n' }, { label: '\\leq' }], [{ label: 'y' }, { label: '4' }, { label: '5' }, { label: '6' }, { label: ']' }, { label: '\\sqrt{a}' }, { label: '\\sqrt[n]{a}' }, { label: '>' }], [{ label: 'z' }, { label: '1' }, { label: '2' }, { label: '3' }, { label: '-' }, { label: '+' }, { label: '\\div' }, { label: '<' }], [null, { label: ',' }, { label: '0' }, { label: '.' }, { label: '%' }, { label: '\\%' }, { label: '=' }, null, null], [{ $label: '&#xE314;' }, // Left arrow (move cursor)
{ $label: '&#xE315;' }, // Right arrow
{ $label: '&#xE14A;' }, // Backspace
null, null, null, null, null]];

exports.default = {
  keyRows: keys.length,
  keyColumns: keys[0].length,

  getKey: function getKey(i, j) {
    return new _Key2.default(keys[i][j]);
  }
};

/***/ },
/* 11 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = function () {
  function Key(key) {
    _classCallCheck(this, Key);

    this.key = key;
  }

  _createClass(Key, [{
    key: 'getLabel',
    value: function getLabel() {
      if (!this.key) {
        return '';
      }
      if (this.key.label) {
        return '\\(' + this.key.label + '\\)';
      }
      return '<i class="material-icons">' + this.key.$label + '</i>';
    }
  }]);

  return Key;
}();

exports.default = Key;

/***/ }
/******/ ]);
});