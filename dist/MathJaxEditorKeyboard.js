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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mustFindElement = mustFindElement;
exports.insertBetween = insertBetween;
exports.removeClass = removeClass;
exports.addClass = addClass;
exports.toArray = toArray;
exports.inArray = inArray;
exports.repeat = repeat;
exports.removeFragment = removeFragment;
exports.listToCharacterRegex = listToCharacterRegex;
/**
 * Tries to find the specified element. If it fails, an error is thrown.
 * 
 * @param {DOMElement|string} el - An element or a selector.
 * 
 * @return {DOMElement}
 */
function mustFindElement(el, tagName) {
  var error = new Error('You must define a target element.');

  if (!el) {
    throw error;
  }

  if (typeof el === 'string') {
    el = document.querySelector(el);
    if (!el) {
      throw error;
    }
  }

  if (el.tagName.toLowerCase() !== tagName.toLowerCase()) {
    throw new Error('The target element must be <' + tagName + '>.');
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
  var before = string.slice(0, index);
  var after = string.slice(index);
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
  var classes = $el.className.split(' ');
  var finalValue = '';

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;

      if (c !== className) {
        finalValue += ' ' + c;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
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
  var classes = $el.className.split(' ');
  if (!~classes.indexOf(className)) {
    $el.className += ' ' + className;
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
  var slice = [].slice;
  return slice.call(children);
}

/**
 * Check if the needle is found in haystack.
 * 
 * @param {Mixed} needle
 * @param {Array} haystack
 * 
 * @return {Boolean}
 */
function inArray(needle, haystack) {
  return !!~haystack.indexOf(needle);
}

/**
 * Repeat a string.
 * 
 * @param {String} str
 * @param {Number} count
 * 
 * @return {String}
 */
function repeat(str, count) {
  var result = '';
  var double = str + str;
  var isOdd = count % 2 !== 0;
  var length = Math.floor(count / 2);
  var i = 0;
  for (; i < length; i++) {
    result += double;
  }

  if (isOdd) {
    result += str;
  }

  return result;
}

/**
 * Remove part of a string.
 * 
 * >> removeFragment("0123456", 1, 3);
 * << "03456"
 * 
 * So, when start 1 and end 3, "0123456"
 *                               ^^
 *                             Removed
 */
function removeFragment(str, start, end) {
  return str.slice(0, start) + str.slice(end);
}

/**
 * Convert a list to a character regex.
 * 
 * @param {Array} list
 * 
 * @return {RegExp}
 */
function listToCharacterRegex(list) {
  var chars = list.map(function (char) {
    return '\\' + char;
  }).join('');
  return new RegExp('^[' + chars + ']$');
}

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = function () {
  /**
   * This is a simple Event Bus to register/trigger events.
   * 
   * @constructor
   */
  function EventBus() {
    _classCallCheck(this, EventBus);

    this.registry = {};
  }

  /**
   * Listen to an event to be triggered.
   * 
   * @param {String} type
   * @param {Function} listener
   * 
   * @return {Void}
   */


  _createClass(EventBus, [{
    key: "on",
    value: function on(type, listener) {
      this.registry[type] = (this.registry[type] || []).concat(listener);
    }

    /**
     * Trigger an event.
     * 
     * @param {String} type
     * @param {Mixed} ...rest
     * 
     * @return {Void}
     */

  }, {
    key: "trigger",
    value: function trigger(type) {
      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      if (this.registry[type]) {
        this.registry[type].forEach(function (listener) {
          return listener.apply(undefined, rest);
        });
      }
    }
  }]);

  return EventBus;
}();

exports.default = EventBus;

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  cursorTex: '{\\cursor}',

  emptyTex: '\\isEmpty',

  spacingTex: '\\;',

  number: /^[0-9]$/,

  variable: /^[a-zA-Z]$/,

  nearClosureHaystack: ['}', ']'],

  supOrSub: ['^', '_'],

  operators: ['+', '-', '=', '<', '>', ',', '.', ':', ';', '?', '(', ')', '[', ']', '|'],

  escapedOperators: ['{', '}', '%'],

  escType: {
    '%': 'mi'
  },

  charToCommand: {
    '*': 'cdot',
    '/': 'div'
  },

  relationCommands: ['geq', 'leq', 'll', 'gg', 'doteq', 'equiv', 'approx', 'cong', 'simeq', 'sim', 'propto', 'neq', 'subset', 'subseteq', 'nsubseteq', 'sqsubset', 'sqsubseteq', 'preceq', 'supset', 'supseteq', 'nsupseteq', 'sqsupset', 'sqsupseteq', 'succeq']
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mathjaxEditor = __webpack_require__(5);

var _mathjaxEditor2 = _interopRequireDefault(_mathjaxEditor);

var _Keys = __webpack_require__(11);

var _Keys2 = _interopRequireDefault(_Keys);

var _utils = __webpack_require__(0);

var _utils2 = __webpack_require__(14);

var _styles = __webpack_require__(13);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var keyboardWidth = 320;

var Core = function () {
  /**
   * Initiates the keyboard.
   * 
   * @param {Object} options - See at MathJax Editor docs.
   * 
   * @constructor
   */
  function Core(options) {
    _classCallCheck(this, Core);

    var Element = MathJax.HTML.Element;

    var $container = Element('div', { className: 'mjk-container' });
    var $keyboard = Element('div', { className: 'mjk-keyboard' });
    var viewportWidth = window.innerWidth;

    $container.appendChild($keyboard);
    document.body.appendChild($container);

    var editor = new _mathjaxEditor2.default(options);

    this.editor = editor;
    this.isMobile = viewportWidth < 640;
    this.isVisible = false;
    this.pageIndex = 0;
    this.$container = $container;
    this.$keyboard = $keyboard;
    this.$editorContainer = editor.core.$container;
    this.$editorContainerParent = editor.core.$container.parentNode;
    this.$editorInput = editor.core.$input;

    document.addEventListener('mousedown', this.handleDocumentClick.bind(this));

    this.hideKeyboard();
  }

  /**
   * Create all keys for the keyboard.
   * 
   * @return {Void}
   */


  _createClass(Core, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var Element = MathJax.HTML.Element;
      var $keyboard = this.$keyboard,
          editor = this.editor,
          pageIndex = this.pageIndex;


      var keys = _Keys2.default.getPage(pageIndex);
      var keyRows = _Keys2.default.getKeyColumns();
      var keyColumns = _Keys2.default.getKeyColumns();
      var keyWidth = (keyboardWidth - 20) / keyColumns;
      var keyWidthPx = keyWidth + 'px';

      (0, _utils2.emptyElement)($keyboard);
      $keyboard.style.width = keyboardWidth + 'px';

      keys.forEach(function (rows, i) {
        var $row = Element('div', { className: 'mjk-keyRow' });

        rows.forEach(function (column, j) {
          var key = _Keys2.default.getKey(pageIndex, i, j);

          var $key = Element('button', {
            className: 'mjk-key',
            style: {
              fontSize: '16px',
              height: keyWidthPx,
              width: keyWidthPx
            }
          });

          if (key.exists()) {
            (function () {
              var listener = key.getClickListener();

              $key.innerHTML = key.getLabel();
              $key.addEventListener('click', function () {
                listener(editor, _this);
                _this.updateInputElement();
              });
            })();
          } else {
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

  }, {
    key: 'updateInputElement',
    value: function updateInputElement() {
      var $keyboard = this.$keyboard,
          $container = this.$container,
          $editorContainer = this.$editorContainer,
          $editorInput = this.$editorInput,
          $editorContainerParent = this.$editorContainerParent;

      var viewportWidth = window.innerWidth;

      var _$keyboard$getBoundin = $keyboard.getBoundingClientRect(),
          top = _$keyboard$getBoundin.top;

      if (this.isMobile) {
        var padding = (Math.max(viewportWidth, 320) - keyboardWidth) / 2;

        $editorInput.setAttribute('readonly', 'true');
        $container.appendChild($editorContainer);
        (0, _utils.addClass)($editorContainer, 'mjk-input');
        (0, _utils.addClass)($keyboard, 'isMobile');
        (0, _utils.removeClass)($keyboard, 'isDesktop');

        (0, _utils2.applyStyles)($keyboard, {
          paddingLeft: padding,
          paddingRight: padding
        });

        (0, _utils2.applyStyles)($editorContainer, {
          fontSize: 12,
          left: 0,
          width: viewportWidth
        });

        (0, _utils2.applyStyles)($editorContainer, {
          top: top - $editorContainer.offsetHeight
        });
      } else {
        (0, _utils.addClass)($keyboard, 'isDesktop');
        (0, _utils.removeClass)($keyboard, 'isMobile');
        this.appendEditorToItsOriginalParent();
      }
    }

    /**
     * Append the editor to its original parent.
     * 
     * @return {Void}
     */

  }, {
    key: 'appendEditorToItsOriginalParent',
    value: function appendEditorToItsOriginalParent() {
      var $editorContainer = this.$editorContainer,
          $editorContainerParent = this.$editorContainerParent;

      (0, _utils.removeClass)($editorContainer, 'mjk-input');
      $editorContainerParent.appendChild($editorContainer);
    }

    /**
     * Update the container element position and size.
     * 
     * @return {Void}
     */

  }, {
    key: 'updateContainerElement',
    value: function updateContainerElement() {
      var $keyboard = this.$keyboard,
          $container = this.$container,
          $editorContainer = this.$editorContainer;

      var viewportWidth = window.innerWidth;
      var height = void 0,
          left = void 0,
          top = void 0,
          width = void 0;

      if (this.isMobile) {
        height = '100%';
        left = 0;
        top = 0;
        width = '100%';
      } else {
        var editorContainerBouncing = $editorContainer.getBoundingClientRect();
        var keyboardBounding = $keyboard.getBoundingClientRect();
        var margin = 16;
        var leftPos = editorContainerBouncing.left + editorContainerBouncing.width / 2 - keyboardBounding.width / 2;
        height = keyboardBounding.height;
        left = leftPos;
        top = editorContainerBouncing.top + editorContainerBouncing.height + margin;
        width = keyboardBounding.width;
      }

      (0, _utils2.applyStyles)($container, {
        height: height,
        left: left,
        top: top,
        width: width
      });
    }

    /**
     * Show the keyboard.
     * 
     * @return {Void}
     */

  }, {
    key: 'showKeyboard',
    value: function showKeyboard() {
      if (this.isVisible) {
        return;
      }

      this.isVisible = true;
      this.$container.style.display = 'block';
      this.editor.focus();
      this.render();
    }

    /**
     * Hide the keyboard.
     * 
     * @return {Void}
     */

  }, {
    key: 'hideKeyboard',
    value: function hideKeyboard() {
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

  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(e) {
      var $container = this.$container,
          $editorContainer = this.$editorContainer;

      var $target = e.target;

      if (e.button !== 0) {
        return;
      }

      if (this.isMobile && $target === $container) {
        return this.hideKeyboard();
      }
      if ((0, _utils2.findNode)($target, $editorContainer)) {
        return this.showKeyboard();
      }
      if (!(0, _utils2.findNode)($target, $container) && !(0, _utils2.findClass)($target, 'mjk-key')) {
        return this.hideKeyboard();
      }
    }

    /**
     * Go to next keys page.
     * 
     * @return {Void}
     */

  }, {
    key: 'nextPage',
    value: function nextPage() {
      var length = _Keys2.default.getPagesLength();
      var index = void 0;

      if (this.pageIndex === length - 1) {
        index = 0;
      } else {
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

  }, {
    key: 'previousPage',
    value: function previousPage() {
      var length = _Keys2.default.getPagesLength();
      var index = void 0;

      if (this.pageIndex === 0) {
        index = length - 1;
      } else {
        index = this.pageIndex - 1;
      }

      this.pageIndex = index;
      this.render();
    }
  }]);

  return Core;
}();

exports.default = Core;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventBus = __webpack_require__(1);

var _EventBus2 = _interopRequireDefault(_EventBus);

var _Placer = __webpack_require__(6);

var _Placer2 = _interopRequireDefault(_Placer);

var _Tex = __webpack_require__(7);

var _Tex2 = _interopRequireDefault(_Tex);

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var supOrSub = _constants2.default.supOrSub;


var KEY_BACKSPACE = 8;
var KEY_ENTER = 13;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_DELETE = 46;

var Editor = function () {
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
  function Editor(options) {
    var _this = this;

    _classCallCheck(this, Editor);

    var el = options.el,
        _options$debug = options.debug,
        debug = _options$debug === undefined ? false : _options$debug,
        _options$focusClass = options.focusClass,
        focusClass = _options$focusClass === undefined ? 'isFocused' : _options$focusClass,
        _options$newLine = options.newLine,
        newLine = _options$newLine === undefined ? false : _options$newLine,
        _options$value = options.value,
        value = _options$value === undefined ? '' : _options$value,
        _options$scroll = options.scroll,
        scroll = _options$scroll === undefined ? false : _options$scroll;


    var Element = MathJax.HTML.Element;

    var $el = (0, _utils.mustFindElement)(el, 'textarea');
    var $container = Element('div', { className: 'mj-ed-container' });
    var $input = Element('input', { className: 'mj-ed-input' });
    var $display = Element('div', { className: 'mj-ed-display' }, ['\\({\\cursor}' + value + '\\)']);
    var $debug = Element('pre', { className: 'mj-ed-debug' }, ['|']);

    $el.parentNode.insertBefore($container, $el.nextSibling);
    $container.appendChild($input);
    $container.appendChild($display);
    $container.appendChild($debug);

    $input.addEventListener('keydown', this.handleInputEvent.bind(this));
    $input.addEventListener('keyup', this.handleInputEvent.bind(this));
    $input.addEventListener('blur', this.blur.bind(this));
    $display.addEventListener('click', this.focus.bind(this));
    document.body.addEventListener('click', this.handleBodyClick.bind(this));

    $display.style.opacity = 0;
    $display.style.overflowX = scroll ? 'scroll' : 'hidden';
    $debug.style.display = debug ? 'block' : 'none';
    $el.style.display = 'none';

    MathJax.Hub.Queue(function () {
      return MathJax.Hub.Typeset($display);
    }, function () {
      return _this.jaxElement = MathJax.Hub.getAllJax($display)[0];
    }, function () {
      $display.style.opacity = 1;
      $display.style.minHeight = $display.offsetHeight + 'px';
      _this.update({ cursorHidden: true });
    });

    this.$container = $container;
    this.$debug = $debug;
    this.$display = $display;
    this.$input = $input;
    this.$el = $el;
    this.bus = new _EventBus2.default();
    this.cursorIndex = 0;
    this.lastCursorTimeout = null;
    this.placer = null;
    this.debug = debug;
    this.focusClass = focusClass;
    this.newLine = newLine;
    this.tex = new _Tex2.default(value, 0);
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


  _createClass(Editor, [{
    key: 'update',
    value: function update() {
      var _this2 = this;

      var cursorOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cursorIndex = this.cursorIndex,
          value = this.value;

      var tex = new _Tex2.default(value, cursorIndex);

      this.tex = tex;

      if (this.debug) {
        this.$debug.innerHTML = (0, _utils.insertBetween)(value, cursorIndex, '|');
      }

      // Update original textarea value.
      this.$el.innerHTML = value;

      this.updateJaxElement(tex.displayTex, function () {
        setTimeout(function () {
          var placer = new _Placer2.default(_this2);
          placer.on('setCursor', function (index) {
            _this2.debug && console.info('The cursor should be placed at ' + index + '.');
            _this2.cursorIndex = index;
            _this2.update();
          });
          _this2.placer = placer;
        }, 16);
        _this2.updateCursorElement(cursorOptions);
      });
    }

    /**
     * Updates the Jax Element inside of `this.display`.
     * 
     * @param {String} jax
     * @param {Function} callback
     * 
     * @return {Void}
     */

  }, {
    key: 'updateJaxElement',
    value: function updateJaxElement(jax) {
      var _this3 = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Function;

      MathJax.Hub.Queue(function () {
        return _this3.jaxElement.Text(jax);
      }, callback);
    }

    /**
     * This updates the cursor position based on the amount
     * of movement is given.
     * 
     * @param {Number} amount
     * 
     * @return {Void}
     */

  }, {
    key: 'updateCursor',
    value: function updateCursor() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var cursorIndex = this.cursorIndex;
      var points = this.tex.cursorPoints;
      var key = points.indexOf(cursorIndex);

      var to = cursorIndex;

      if (amount > 0) {
        to = points[key + 1];
      } else if (amount < 0) {
        to = points[key - 1];
      }

      this.cursorIndex = to;
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

  }, {
    key: 'updateCursorElement',
    value: function updateCursorElement() {
      var _this4 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var $display = this.$display;

      var hidden = options.cursorHidden || false;
      var className = 'wasRecentlyPlaced';

      MathJax.Hub.Queue(function () {
        var $cursor = $display.querySelector('.mjx-cursor');

        if (!$cursor) {
          return;
        }

        var offsetWidth = $cursor.offsetWidth,
            offsetLeft = $cursor.offsetLeft;


        if (!$cursor.style.marginLeft) {
          $cursor.style.marginLeft = '-' + offsetWidth + 'px';
        }

        if (_this4.lastCursorTimeout) {
          clearTimeout(_this4.lastCursorTimeout);
        }

        (0, _utils.addClass)($cursor, className);

        _this4.lastCursorTimeout = setTimeout(function () {
          return (0, _utils.removeClass)($cursor, className);
        }, 600);

        $display.scrollLeft = offsetLeft;

        $cursor.style.display = hidden ? 'none' : 'inline-block';
      });
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.value = value;
    }

    /**
     * This will handle the events of `this.$input`.
     * It captures the key pressed and what the user have typed.
     * 
     * @param {KeyboardEvent} e
     * 
     * @return {Void}
     */

  }, {
    key: 'handleInputEvent',
    value: function handleInputEvent(e) {
      var _this5 = this;

      var $input = this.$input;
      var number = _constants2.default.number,
          variable = _constants2.default.variable,
          charToCommand = _constants2.default.charToCommand,
          operators = _constants2.default.operators,
          escapedOperators = _constants2.default.escapedOperators;


      var inputValue = $input.value.trim();
      var which = e.keyCode;

      $input.value = '';

      if (e.type === 'keyup') {
        which = null;
      }

      if (!inputValue.length) {
        return this.handleKeyPress(which);
      }

      inputValue.split('').forEach(function (char) {
        if (char.match(number) || char.match(variable)) {
          return _this5.insert(char);
        }

        if (charToCommand.hasOwnProperty(char)) {
          return _this5.insertCommand(charToCommand[char]);
        }

        if ((0, _utils.inArray)(char, operators.concat(escapedOperators))) {
          return _this5.insertSymbol(char);
        }
      });
    }

    /**
     * Handles the key press.
     * 
     * @param {Number} which - Which key was pressed.
     * 
     * @return {Void}
     */

  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(which) {
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
        console.warn('The key ' + which + ' was pressed.');
      }
    }

    /**
     * Move the cursor to the left.
     * 
     * @return {Void}
     */

  }, {
    key: 'moveCursorLeft',
    value: function moveCursorLeft() {
      if (this.cursorIndex > 0) {
        this.updateCursor(-1);
      }
    }

    /**
     * Move the cursor to the right.
     * 
     * @return {Void}
     */

  }, {
    key: 'moveCursorRight',
    value: function moveCursorRight() {
      if (this.cursorIndex < this.value.length) {
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

  }, {
    key: 'handleBodyClick',
    value: function handleBodyClick(e) {
      if (!this.placer) {
        return;
      }

      this.placer.trigger('click', e);
    }

    /**
     * Focus the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'focus',
    value: function focus() {
      this.$input.focus();
      this.updateCursorElement({ cursorHidden: false });
      this.bus.trigger('focus');
      (0, _utils.addClass)(this.$display, this.focusClass);
    }

    /**
     * Blur the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'blur',
    value: function blur() {
      this.$input.blur();
      this.updateCursorElement({ cursorHidden: true });
      this.bus.trigger('blur');
      (0, _utils.removeClass)(this.$display, this.focusClass);
    }

    /**
     * Insert a piece of text in editor's value.
     * 
     * @param {String} chars
     * 
     * @return {Void}
     */

  }, {
    key: 'insert',
    value: function insert(chars) {
      var cursorIndex = this.cursorIndex,
          value = this.value;


      this.cursorIndex += chars.length;
      this.setValue((0, _utils.insertBetween)(value, cursorIndex, chars));
      this.update();
    }

    /**
     * Insert a character at cursor position.
     * Allowed characters: 0-9 (numbers), a-z (variables).
     * 
     * @param {String} insert
     * 
     * @return {Void}
     */

  }, {
    key: 'insertChar',
    value: function insertChar(char) {
      var number = _constants2.default.number,
          variable = _constants2.default.variable;


      if (char.length !== 1) {
        throw new RangeError('Only one char can be inserted through this method.');
      }
      if (!char.match(number) && !char.match(variable)) {
        throw new RangeError('Only numbers and variables are allowed in insert, not "' + char + '".');
      }

      this.insert(char);
    }

    /**
     * Insert a symbol at cursor position.
     * 
     * @param {String} symbol
     */

  }, {
    key: 'insertSymbol',
    value: function insertSymbol(symbol) {
      var operators = _constants2.default.operators,
          escapedOperators = _constants2.default.escapedOperators;

      var symbols = operators.slice().concat(escapedOperators);

      if (!(0, _utils.inArray)(symbol, symbols)) {
        throw new RangeError('"' + symbol + '" is not a valid symbol.');
      }

      if ((0, _utils.inArray)(symbol, escapedOperators)) {
        symbol = '\\' + symbol;
      }

      this.insert(symbol);
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

  }, {
    key: 'insertCommand',
    value: function insertCommand(command) {
      var blockCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var brackets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.focus();

      if (command[0] !== '\\' && !(0, _utils.inArray)(command, supOrSub)) {
        command = '\\' + command;
      }

      if (brackets) {
        command += '[]';
      }

      if (blockCount > 0) {
        command += '{';
      } else {
        command += ' ';
      }

      this.insert(command);

      if (blockCount < 1) {
        return;
      }

      var value = this.value,
          cursorIndex = this.cursorIndex;

      var blocks = '}' + (0, _utils.repeat)('{}', blockCount - 1);

      this.setValue((0, _utils.insertBetween)(value, cursorIndex, blocks));
      this.update();
    }

    /**
     * Apply a deletion method based on cursor position.
     * 
     * @param {String} method - Available: "erase" and "delete".
     * 
     * @return {Void}
     */

  }, {
    key: 'applyDeletion',
    value: function applyDeletion(method) {
      var cursorIndex = this.cursorIndex,
          tex = this.tex;

      var prevIndex = cursorIndex - 1;
      var elements = tex.elements;

      var deletionStart = null;
      var deletionEnd = null;
      var comparator = void 0;
      var startOrEnd = void 0;
      var openOrClose = void 0;
      var numVarDeletionStart = void 0;
      var numVarDeletionEnd = void 0;

      switch (method) {
        case 'erase':
          if (cursorIndex === 0) {
            return;
          }
          comparator = prevIndex;
          startOrEnd = 'end';
          openOrClose = 'openIndex';
          numVarDeletionStart = prevIndex;
          numVarDeletionEnd = cursorIndex;
          break;

        case 'delete':
          if (cursorIndex === tex.length) {
            return;
          }
          comparator = cursorIndex;
          startOrEnd = 'start';
          openOrClose = 'closeIndex';
          numVarDeletionStart = cursorIndex;
          numVarDeletionEnd = cursorIndex + 1;
          break;

        default:
          throw new RangeError('Unknown method "' + method + '".');
      }

      // Deal with new lines deletion.
      if (tex.newLines[comparator]) {
        var nl = tex.newLines[comparator];
        deletionStart = nl.start;
        deletionEnd = nl.end + 1;
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var element = _step.value;
            var index = element.index,
                props = element.props;

            // Command deletion.

            if (props) {
              var brackets = props.brackets;

              // If is erasing at the start/end of the command/ or is erasing brackets of the command.
              if (props[startOrEnd] === comparator || brackets && brackets[openOrClose] === comparator) {
                deletionStart = props.start;
                deletionEnd = props.end + 1;
                break;
              }

              if (!props.blocks) {
                continue;
              }

              // If is erasing one of block opening/closing.
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = props.blocks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var block = _step2.value;

                  if (block[openOrClose] === comparator) {
                    deletionStart = props.start;
                    deletionEnd = props.end + 1;
                    break;
                  }
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            }
            // Number/variable deletion.
            else if (index === comparator) {
                deletionStart = numVarDeletionStart;
                deletionEnd = numVarDeletionEnd;
                break;
              }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      this.cursorIndex = deletionStart;
      this.setValue((0, _utils.removeFragment)(this.value, deletionStart, deletionEnd));
      this.update();
    }

    /**
     * Erases the character before the cursor.
     * 
     * @return {Void}
     */

  }, {
    key: 'erase',
    value: function erase() {
      this.applyDeletion('erase');
    }

    /**
     * Erases the character before the cursor.
     * 
     * @return {Void}
     */

  }, {
    key: 'delete',
    value: function _delete() {
      this.applyDeletion('delete');
    }

    /**
     * Listen to an event to be triggered by Editor.
     * 
     * @param {String} type
     * @param {Function} listener
     * 
     * @return {Void}
     */

  }, {
    key: 'on',
    value: function on(type, listener) {
      this.bus.on(type, listener);
    }
  }]);

  return Editor;
}();

exports.default = Editor;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Editor = __webpack_require__(4);

var _Editor2 = _interopRequireDefault(_Editor);

var _extendMathJax = __webpack_require__(8);

var _extendMathJax2 = _interopRequireDefault(_extendMathJax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', _extendMathJax2.default);

/**
 * This is the MathJaxEditor class.
 * 
 * It has an API on top of the Editor class.
 */

var MathJaxEditor = function () {
  /**
   * Creates an instance of Editor.
   * 
   * @constructor
   */
  function MathJaxEditor(options) {
    _classCallCheck(this, MathJaxEditor);

    var core = new _Editor2.default(options);

    this.core = core;
    this.version = '1.2.13';
  }

  /**
   * Blur the editor.
   * 
   * @return {Void}
   */


  _createClass(MathJaxEditor, [{
    key: 'blur',
    value: function blur() {
      this.core.blur();
    }

    /**
     * Focus the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'focus',
    value: function focus() {
      this.core.focus();
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

  }, {
    key: 'insertCommand',
    value: function insertCommand(command) {
      var blockCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var brackets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.core.insertCommand(command, blockCount, brackets);
    }

    /**
     * Insert a character at cursor position.
     * Allowed characters: 0-9 (numbers), a-z (variables).
     * 
     * @param {String} insert
     * 
     * @return {Void}
     */

  }, {
    key: 'insert',
    value: function insert(char) {
      this.core.insert(char);
    }

    /**
     * Insert a symbol at cursor position.
     * 
     * @param {String} symbol
     */

  }, {
    key: 'insertSymbol',
    value: function insertSymbol(symbol) {
      this.core.insertSymbol(symbol);
    }

    /**
     * Get editor's value.
     *  
     * @return {String}
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.core.value;
    }

    /**
     * Move the cursor to the left.
     * 
     * @return {Void}
     */

  }, {
    key: 'moveCursorLeft',
    value: function moveCursorLeft() {
      this.core.moveCursorLeft();
    }

    /**
     * Move the cursor to the right.
     * 
     * @return {Void} 
     */

  }, {
    key: 'moveCursorRight',
    value: function moveCursorRight() {
      this.core.moveCursorRight();
    }

    /**
     * Erases the character before the cursor.
     * 
     * @return {Void}
     */

  }, {
    key: 'erase',
    value: function erase() {
      this.core.erase();
    }

    /**
     * Listen to an event to be triggered by the Editor.
     * 
     * @param {String} type
     * @param {Function} listener
     * 
     * @return {Void}
     */

  }, {
    key: 'on',
    value: function on(type, listener) {
      this.core.on(type, listener);
    }
  }]);

  return MathJaxEditor;
}();

module.exports = MathJaxEditor;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventBus = __webpack_require__(1);

var _EventBus2 = _interopRequireDefault(_EventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $paints = [];

var Placer = function () {
  /**
   * This will handle the cursor placement when the user clicks somewhere
   * on the editor.
   * 
   * @param {Editor} editor
   * 
   * @constructor
   */
  function Placer(editor) {
    _classCallCheck(this, Placer);

    var bus = new _EventBus2.default();

    bus.on('click', this.handleClick.bind(this));

    this.$display = editor.$display;
    this.bus = bus;
    this.intervals = [];
    this.elements = editor.tex.elements;
    this.findings = {};
    this.tex = editor.tex;

    this.iterate();
  }

  /**
   * Listen to an event to be triggered by Placer.
   * 
   * @param {String} type
   * @param {Function} listener
   * 
   * @return {Void}
   */


  _createClass(Placer, [{
    key: 'on',
    value: function on(type, listener) {
      this.bus.on(type, listener);
    }

    /**
     * Triggers an event inside Placer.
     * 
     * @param {String} type
     * @param {Mixed} ...rest
     * 
     * @return {Void}
     */

  }, {
    key: 'trigger',
    value: function trigger(type) {
      var _bus;

      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      (_bus = this.bus).trigger.apply(_bus, [type].concat(rest));
    }

    /**
     * Checks if the cursor must be moved, and if so,
     * it triggers the event 'setCursor' with the position.
     * 
     * @param {Event} e
     * 
     * @return {Void}
     */

  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      var _this = this;

      var _$display$getBounding = this.$display.getBoundingClientRect(),
          top = _$display$getBounding.top,
          bottom = _$display$getBounding.bottom;

      var x = e.clientX;
      var y = e.clientY;
      var intervals = this.intervals;
      var index = this.tex.length;

      if (!intervals.length || y > bottom || y < top) {
        return false;
      }

      var found = false;
      var proceedSearch = true;

      // First strategy: checks if the clicked point is inside a number/
      // variable/operator bounding. If it is, place it where is proper.

      intervals.forEach(function (interval, i) {
        if (interval.startX <= x && x < interval.endX && proceedSearch) {
          if (interval.startY <= y && y < interval.endY) {
            found = true;
            index = _this.placeAtInterval(interval, i, x);
            if (interval.box) {
              proceedSearch = false;
            }
          }
        }
      });

      // Second strategy: find the nearest element to the clicked point.

      if (!found) {
        var _ret = function () {
          var last = { interval: null, distance: null, i: null };

          intervals.forEach(function (interval, i) {
            if (!(interval.startY < y && y < interval.endY)) {
              return;
            }
            var distance = Math.min(Math.abs(interval.startX - x), Math.abs(interval.endX - x));
            if (last.distance === null || distance < last.distance) {
              last.interval = interval;
              last.distance = distance;
              last.i = i;
            }
          });

          if (!last.interval) {
            return {
              v: false
            };
          }

          index = _this.placeAtInterval(last.interval, last.i, x, y);
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }

      this.bus.trigger('setCursor', index);
    }

    /**
     * Get the next key for a type.
     * 
     * @param {String} type
     * 
     * @return {Number}
     */

  }, {
    key: 'getNextKeyFor',
    value: function getNextKeyFor(type) {
      this.findings[type] = this.findings[type] || 0;
      var key = this.findings[type];
      this.findings[type] += 1;
      return key;
    }

    /**
     * Add an interval at the given index in intervals list.
     *
     * @param {Number} key
     * @param {Object} data
     * 
     * @return {Void}
     */

  }, {
    key: 'addIntervalAt',
    value: function addIntervalAt(key, data) {
      this.intervals.splice(key, 0, data);
    }

    /**
     * Add an interval to intervals list.
     * 
     * @param {Object} data
     * 
     * @return {Void}
     */

  }, {
    key: 'addInterval',
    value: function addInterval(data) {
      if (Number.isNaN(data.index)) {
        console.error('An interval has NaN as index.');
      }
      this.intervals.push(data);
    }

    /**
     * Shortcut for adding an interval.
     * 
     * @param {Number} index
     * @param {Object} bounding
     * 
     * @return {Void}
     */

  }, {
    key: 'addIntervalBox',
    value: function addIntervalBox(index, _ref) {
      var top = _ref.top,
          bottom = _ref.bottom,
          left = _ref.left,
          right = _ref.right;

      this.addInterval({
        index: index,
        startX: left,
        endX: right,
        startY: top,
        endY: bottom,
        box: true
      });
    }

    /**
     * Add an interval without bouncing.
     * 
     * @param {Number} index
     * 
     * @return {Void}
     */

  }, {
    key: 'addBouncinglessInterval',
    value: function addBouncinglessInterval(index) {
      this.addInterval({
        index: index,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      });
    }

    /**
     * Returns the index which the cursor should be placed
     * based on given `x`, and `y`.
     * 
     * @param {Object} interval
     * @param {Number} i - Index of the given interval inside `this.intervals`.
     * @param {Number} x
     * 
     * @return {Number}
     */

  }, {
    key: 'placeAtInterval',
    value: function placeAtInterval(interval, i, x) {
      var intervals = this.intervals;
      var width = interval.endX - interval.startX;
      var nextInterval = i + 1;

      var index = interval.index;

      if (interval.box) {
        return index;
      }

      if (x > interval.startX + width / 2) {
        if (intervals[nextInterval]) {
          index = intervals[nextInterval].index;
        } else {
          index = this.tex.length;
        }
      }

      return index;
    }

    /**
     * Iterates over the elements created by Tex to find
     * the elements in the DOM and compute them.
     * 
     * @return {Void}
     */

  }, {
    key: 'iterate',
    value: function iterate() {
      var _this2 = this;

      this.elements.forEach(function (element) {
        switch (element.is) {
          case 'command':
            _this2.findCommand(element);
            break;

          case 'eol':
            _this2.findEndOfLine(element);
            break;

          default:
            _this2.find(element);
        }
      });
    }

    /**
     * Find an element of the given type and add its interval data 
     * to `this.intervals`.
     * 
     * @param {Object} data
     * @param {String} data.type
     * @param {Number} data.index
     * @param {Boolean} data.nearClosure
     * 
     * @return {Void}
     */

  }, {
    key: 'find',
    value: function find(data) {
      var type = data.type,
          index = data.index,
          nearClosure = data.nearClosure;

      var key = this.getNextKeyFor(type);
      var $el = this.$display.querySelectorAll('.mjx-' + type)[key];
      if (!$el) {
        return console.warn('Could not find an element of type ' + type + '.', index);
      }

      var _$el$getBoundingClien = $el.getBoundingClientRect(),
          left = _$el$getBoundingClien.left,
          right = _$el$getBoundingClien.right,
          top = _$el$getBoundingClien.top,
          bottom = _$el$getBoundingClien.bottom;

      this.addInterval({
        startX: left,
        endX: right,
        startY: top,
        endY: bottom,
        index: index
      });

      if (nearClosure) {
        this.addBouncinglessInterval(index + 1);
      }
    }

    /**
     * Find a command element.
     * 
     * @param {Object} data
     * @param {String} data.type
     * @param {Object} data.props
     * 
     * @return {Void}
     */

  }, {
    key: 'findCommand',
    value: function findCommand(_ref2) {
      var _this3 = this;

      var type = _ref2.type,
          props = _ref2.props;

      var key = this.getNextKeyFor(type);
      var $el = this.$display.querySelectorAll('.mjx-m' + type)[key];
      var brackets = props.brackets,
          blocks = props.blocks,
          subType = props.subType;


      this.addBouncinglessInterval(props.start);

      switch (type) {
        case 'frac':
          {
            var $numerator = $el.querySelector('.mjx-numerator');
            var $denominator = $el.querySelector('.mjx-denominator');
            var numBounding = $numerator.getBoundingClientRect();
            var denBounding = $denominator.getBoundingClientRect();
            var boundings = [numBounding, denBounding];

            boundings.forEach(function (bounding, i) {
              if (blocks[i].length === 1) {
                _this3.addIntervalBox(blocks[i].closeIndex, bounding);
              }
            });

            break;
          }

        case 'root':
        case 'sqrt':
          {
            if (brackets && brackets.closeIndex - brackets.openIndex === 1) {
              var $root = $el.querySelector('.mjx-root .mjx-char');
              var bounding = $root.getBoundingClientRect();
              this.addIntervalBox(brackets.closeIndex, bounding);
            }
            if (blocks[0].length === 1) {
              var $box = $el.querySelector('.mjx-box');
              var _bounding = $box.getBoundingClientRect();
              this.addIntervalBox(blocks[0].closeIndex, _bounding);
            }
            break;
          }

        case 'subsup':
          {
            if (blocks[0].length === 1) {
              var $target = $el.querySelector('.mjx-' + subType);
              var _bounding2 = $target.getBoundingClientRect();
              this.addIntervalBox(blocks[0].closeIndex, _bounding2);
            }
            break;
          }
      }
    }

    /**
     * Find an end of line element.
     * 
     * @param {Object} data
     * @param {String} data.type
     * @param {Number} data.index
     * 
     * @return {Void}
     */

  }, {
    key: 'findEndOfLine',
    value: function findEndOfLine(_ref3) {
      var type = _ref3.type,
          index = _ref3.index;

      var key = this.getNextKeyFor(type);
      var $el = this.$display.querySelectorAll('.mjx-' + type)[key];
      // If $el was not found, it seems there is only one line.
      if (!$el) {
        $el = this.$display.querySelector('.mjx-math');
      }
      var $box = $el.firstChild;

      var _$box$getBoundingClie = $box.getBoundingClientRect(),
          top = _$box$getBoundingClie.top,
          left = _$box$getBoundingClie.left,
          bottom = _$box$getBoundingClie.bottom,
          right = _$box$getBoundingClie.right;

      var width = 20;
      var lineStart = this.findLastStartOfLineIndex();

      // Insert start of line interval.
      this.addIntervalAt(lineStart.intervalKey, {
        index: lineStart.start,
        startX: left - width,
        endX: left,
        startY: top,
        endY: bottom,
        box: true
      });

      // Insert end of line interval.
      this.addInterval({
        index: index,
        startX: right,
        endX: right + width,
        startY: top,
        endY: bottom,
        box: true
      });
    }

    /**
     * Find the last start of line index in the intervals list.
     * 
     * @return {Number}
     */

  }, {
    key: 'findLastStartOfLineIndex',
    value: function findLastStartOfLineIndex() {
      var intervals = this.intervals.slice().reverse();
      var length = intervals.length;
      var i = 0;
      var start = 0;
      var intervalKey = 0;

      for (; i < length; i++) {
        var interval = intervals[i];
        if (interval.is === 'eol') {
          start = interval.index + 2;
          intervalKey = i;
          break;
        }
      }

      return { start: start, intervalKey: intervalKey };
    }

    // Debug function to draw a interval.

  }, {
    key: 'paint',
    value: function paint(interval) {
      var $div = document.createElement('div');
      $div.style.position = 'absolute';
      $div.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
      $div.style.width = interval.endX - interval.startX + 'px';
      $div.style.height = interval.endY - interval.startY + 'px';
      $div.style.top = interval.startY + 'px';
      $div.style.left = interval.startX + 'px';
      $div.style.pointerEvents = 'none';
      document.body.appendChild($div);
      return $div;
    }

    // Debug function to paint all intervals.

  }, {
    key: 'paintIntervals',
    value: function paintIntervals() {
      var _this4 = this;

      $paints.forEach(function ($paint) {
        return document.body.removeChild($paint);
      });
      $paints = [];

      this.intervals.forEach(function (interval) {
        $paints.push(_this4.paint(interval));
      });

      console.log(this.intervals);
    }
  }]);

  return Placer;
}();

exports.default = Placer;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nearClosureHaystack = _constants2.default.nearClosureHaystack,
    supOrSub = _constants2.default.supOrSub,
    cursorTex = _constants2.default.cursorTex,
    emptyTex = _constants2.default.emptyTex,
    escType = _constants2.default.escType,
    spacingTex = _constants2.default.spacingTex,
    relationCommands = _constants2.default.relationCommands;


var test = {
  isNumber: _constants2.default.number,
  isVariable: _constants2.default.variable,
  isOperator: (0, _utils.listToCharacterRegex)(_constants2.default.operators),
  isEscapedOperator: (0, _utils.listToCharacterRegex)(_constants2.default.escapedOperators)
};

var Tex = function () {
  /**
   * This class will parse the given tex and produce `cursorPoints` (indexes)
   * where cursor can be placed, and `elements` (that are passed to Placer).
   * 
   * @param {String} tex
   * @param {Number} cursorIndex
   * 
   * @constructor
   */
  function Tex(tex) {
    var cursorIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Tex);

    this.tex = tex;
    this.cursorPoints = [];
    this.elements = [];
    this.newLines = {};
    this.length = tex.length;
    this.displayTex = '';
    this.cursorIndex = cursorIndex;
    this.isPartOfCommand = {};

    this.parse();
  }

  /**
   * Place the cursor at `displayTex` if it is
   * in the given index, and was not placed before.
   * 
   * @param {Number} index
   * 
   * @return {Void}
   */


  _createClass(Tex, [{
    key: 'addCursorToTexDisplay',
    value: function addCursorToTexDisplay(index) {
      if (!this.cursorPlaced && this.cursorIndex === index) {
        this.cursorPlaced = true;
        this.displayTex += cursorTex;
      }
    }

    /**
     * Parse the given tex.
     * 
     * @return {Void}
     */

  }, {
    key: 'parse',
    value: function parse() {
      var cursorPoints = [];
      var tex = this.tex;
      var length = this.tex.length;
      var i = 0;

      this.cursorPlaced = false;

      for (; i < length; i++) {
        var index = i;
        var nextIndex = i + 1;
        var char = tex[index];
        var nextChar = tex[nextIndex];
        var lastChar = tex[index - 1];
        var nearClosure = (0, _utils.inArray)(nextChar, nearClosureHaystack);
        var isComma = char === ',';
        var isGrOrLeSign = (0, _utils.inArray)(char, ['<', '>']);
        var isNumber = test.isNumber.exec(char);
        var isVariable = test.isVariable.exec(char);
        var isOperator = test.isOperator.exec(char);
        var isNextCharEscapedOperator = test.isEscapedOperator.exec(nextChar);
        var shouldBeAroundBraces = isComma || isNumber || isGrOrLeSign;

        this.addCursorToTexDisplay(index);

        if (shouldBeAroundBraces || this.isRelationCommand(index)) {
          this.displayTex += '{';
        }

        // Closing a command block, add spacing.
        if (char === '}' && lastChar !== '\\') {
          if (!this.isPartOfCommandThatStartsWith(index, supOrSub)) {
            this.displayTex += spacingTex;
          }
        }

        // Add char to tex that are displayed on editor.
        this.displayTex += char;

        if (shouldBeAroundBraces) {
          this.displayTex += '}';
        }

        // Check if character is a number.
        if (isNumber) {
          this.elements.push({
            is: 'number',
            type: 'mn',
            index: index,
            nearClosure: nearClosure
          });
        }

        // Check if character is a variable.
        if (isVariable) {
          this.elements.push({
            is: 'variable',
            type: 'mi',
            index: index,
            nearClosure: nearClosure
          });
        }

        // Check if character is an operator.
        if (isOperator && !this.isPartOfCommand.hasOwnProperty(index)) {
          this.elements.push({
            is: 'operator',
            type: 'mo',
            index: index,
            nearClosure: nearClosure
          });
        }

        if (char === '\\' && isNextCharEscapedOperator) {
          var type = escType[nextChar] ? escType[nextChar] : 'mo';
          this.elements.push({
            is: 'operator',
            type: type,
            index: index,
            nearClosure: nearClosure,
            props: {
              start: index,
              end: nextIndex
            }
          });
          this.displayTex += nextChar;
          i += 1;
        }

        // Newline up ahead.
        if (char === '\\' && nextChar === '\\') {
          var newLine = { start: index, end: nextIndex };
          this.newLines[index] = newLine;
          this.newLines[nextIndex] = newLine;
          this.displayTex += '\\';
          this.elements.push({
            is: 'eol',
            type: 'block',
            index: index
          });
          i += 1;
        }

        // A command.
        if (char === '\\' && test.isVariable.exec(nextChar)) {
          i = this.parseCommand(i);
        }

        // Sup and sub commands.
        if ((0, _utils.inArray)(char, supOrSub)) {
          i = this.parseCommand(i);
        }

        // Opening a command block.
        if (char === '{') {
          if (nextChar === '}') {
            this.addCursorToTexDisplay(nextIndex);
            this.displayTex += emptyTex;
          } else {
            if (!this.isPartOfCommandThatStartsWith(index, supOrSub)) {
              this.displayTex += spacingTex;
            }
          }
          continue;
        }

        if (char === ' ') {

          continue;
        }

        cursorPoints.push(index);
      }

      // Last line eol element.
      if (length) {
        this.elements.push({
          is: 'eol',
          type: 'block',
          index: length
        });
      }

      // Add cursor at the end if it was not placed.
      this.addCursorToTexDisplay(length);

      // Cursor can always be placed at the end.
      cursorPoints.push(length);

      this.cursorPoints = cursorPoints;
    }

    /**
     * Parse a command that start at the given index.
     * 
     * @param {Number} i
     * 
     * @return {Number}
     */

  }, {
    key: 'parseCommand',
    value: function parseCommand(i) {
      var iterator = i;
      var tex = this.tex;
      var length = this.tex.length;
      var firstChar = tex[iterator];
      var partOfCommandObject = { firstChar: firstChar };
      var opening = null; // the first place the cursor can be placed inside this command
      var blocks = [];
      var brackets = null;
      var openBlocks = 0;
      var type = '';
      var subType = null;
      var is = 'command'; // we assume it is a command but it can be operator or variable
      var start = iterator; // index command starts
      var end = null; // index command ends
      var nearClosure = false;

      switch (firstChar) {
        case '^':
          type = 'subsup';
          subType = 'sup';
          break;
        case '_':
          type = 'subsup';
          subType = 'sub';
          break;
      }

      for (i = iterator; i < length; i++) {
        var char = tex[i];
        var nextIndex = i + 1;
        var nextChar = tex[nextIndex];
        var isVariable = test.isVariable.exec(char);

        if (opening === null) {
          this.displayTex += !(0, _utils.inArray)(char, ['\\', '^', '_']) ? char : '';
          if (isVariable) {
            type += char;
          }
        }

        // Bracket found!
        if (char === '[') {
          brackets = { openIndex: i };
          if (opening === null) {
            opening = i;
          }

          // Add symbol of empty.
          if (nextChar === ']') {
            this.displayTex += emptyTex;
          }
        }

        // Closing brackets!
        if (char === ']') {
          brackets.closeIndex = i;
          this.isPartOfCommand[i] = partOfCommandObject;
        }

        // Find a block being openned.
        if (char === '{') {
          // If it is this command block...
          if (openBlocks === 0) {
            blocks.push({ openIndex: i });
            this.isPartOfCommand[i] = partOfCommandObject;
          }
          openBlocks += 1;
          if (opening === null) {
            opening = i;

            if (!(0, _utils.inArray)(firstChar, supOrSub)) {
              this.displayTex += spacingTex;
            }

            // Place the cursor if it is there.
            this.addCursorToTexDisplay(nextIndex);

            if (nextChar === '}') {
              this.displayTex += emptyTex;
            }
          }
        }

        // Find a block being closed.
        if (char === '}') {
          openBlocks -= 1;
          // If it is this command block...
          if (openBlocks === 0) {
            var key = blocks.length - 1;
            blocks[key].closeIndex = i;
            blocks[key].length = i - blocks[key].openIndex;
            this.isPartOfCommand[i] = partOfCommandObject;
          }
        }

        if (opening === null && char === ' ') {
          var shouldBeAroundBraces = (0, _utils.inArray)(type, relationCommands);
          type = this.decideType(type);
          is = type === 'mo' ? 'operator' : 'variable';
          end = i;
          opening = i;
          if ((0, _utils.inArray)(nextChar, nearClosureHaystack)) {
            nearClosure = true;
          }
          if (shouldBeAroundBraces) {
            this.displayTex += '}';
          }
          break;
        }

        if (char === '}' && nextChar !== '{' && openBlocks === 0) {
          end = i;
          break;
        }
      }

      if (type === 'sqrt' && brackets !== null) {
        type = 'root';
      }

      if (opening === null) {
        throw new SyntaxError('Looks like this TeX is invalid. Now have a hard time finding where, lul.');
      }

      this.elements.push({
        is: is,
        type: type,
        index: iterator,
        nearClosure: nearClosure,
        props: {
          subType: subType,
          start: start,
          end: end,
          opening: opening,
          blocks: blocks,
          brackets: brackets
        }
      });

      return opening;
    }

    /**
     * Decide the type based on the given type (lul).
     *     \{type}
     *     \alpha ---> mi
     *     \geq   ---> mo
     *     \sqrt  ---> msqrt
     * 
     * @param {String} type
     * 
     * @return {String}
     */

  }, {
    key: 'decideType',
    value: function decideType(type) {
      var list = {
        'alpha': 'mi',
        'beta': 'mi',
        'gamma': 'mi',
        'Gamma': 'mi',
        'delta': 'mi',
        'Delta': 'mi',
        'epsilon': 'mi',
        'varepsilon': 'mi',
        'zeta': 'mi',
        'eta': 'mi',
        'theta': 'mi',
        'vartheta': 'mi',
        'Theta': 'mi',
        'iota': 'mi',
        'kappa': 'mi',
        'lambda': 'mi',
        'mu': 'mi',
        'nu': 'mi',
        'xi': 'mi',
        'Xi': 'mi',
        'pi': 'mi',
        'Pi': 'mi',
        'rho': 'mi',
        'varrho': 'mi',
        'sigma': 'mi',
        'Sigma': 'mi',
        'tau': 'mi',
        'upsilon': 'mi',
        'Upsilon': 'mi',
        'phi': 'mi',
        'varphi': 'mi',
        'Phi': 'mi',
        'chi': 'mi',
        'psi': 'mi',
        'Psi': 'mi',
        'omega': 'mi',
        'Omega': 'mi',
        '%': 'mi'
      };

      return list.hasOwnProperty(type) ? list[type] : 'mo';
    }

    /**
     * Check if the command where the character of the given index
     * starts with any of characters inside haystack.
     * 
     * @param {Number} index
     * @param {Array} haystack
     * 
     * @return {Boolean}
     */

  }, {
    key: 'isPartOfCommandThatStartsWith',
    value: function isPartOfCommandThatStartsWith(index, haystack) {
      var data = this.isPartOfCommand[index];
      if (!data) {
        return false;
      }
      return (0, _utils.inArray)(data.firstChar, haystack);
    }

    /**
     * Check if a relation command is ahead.
     * (In the future can be extended to other commands).
     * This to avoid MathJax from joining two elements into one, and
     * so bugging the cursor placement.
     * 
     * @param {Number} index
     * 
     * @return {Void}
     */

  }, {
    key: 'isRelationCommand',
    value: function isRelationCommand(index) {
      var tex = this.tex;

      var length = tex.length;

      if (tex[index] !== '\\') {
        return;
      }

      var i = index + 1;
      var name = '';

      for (; i < length; i++) {
        var char = tex[i];

        if (!test.isVariable.exec(char) && char !== ' ') {
          return false;
        } else if (char === ' ') {
          return (0, _utils.inArray)(name, relationCommands);
        }
        name += char;
      }

      return false;
    }
  }]);

  return Tex;
}();

exports.default = Tex;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extendMathJax;

var _styles = __webpack_require__(9);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This will extend MathJax so that we can put our simple
 * cursor there.
 */
function extendMathJax() {
  var TEX = MathJax.InputJax.TeX;
  var MML = MathJax.ElementJax.mml;

  // This removes the pause (in milliseconds) between input and output 
  // phases of MathJax's processing. So it looks seamless!

  MathJax.Hub.processSectionDelay = 0;

  MathJax.Hub.Register.StartupHook('TeX Jax Ready', function () {
    var defaults = {
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
      isSpacelike: function isSpacelike() {
        return true;
      },
      texClass: MML.TEXCLASS.ORD,
      defaults: defaults
    });

    MML.misEmpty = MML.mbase.Subclass({
      type: 'isEmpty',
      isToken: true,
      isSpacelike: function isSpacelike() {
        return true;
      },
      texClass: MML.TEXCLASS.ORD,
      defaults: defaults
    });

    TEX.Parse.Augment({
      Cursor: function Cursor() {
        var $cursor = MML.mcursor('0');
        this.Push($cursor);
      },
      IsEmpty: function IsEmpty() {
        var $isEmpty = MML.misEmpty('?');
        this.Push($isEmpty);
      }
    });
  });

  MathJax.Ajax.Styles(_styles2.default);
}

/***/ },
/* 9 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var animation = 'from, to { border-color: #000 }\n 50% { border-color: transparent }';

exports.default = {
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
    'box-sizing': 'border-box',
    'cursor': 'text',
    'overflow-Y': 'overflow'
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
  '@-moz-keyframes mj-ed-blink': animation,
  '@-webkit-keyframes mj-ed-blink': animation,
  '@-ms-keyframes mj-ed-blink': animation,
  '@-o-keyframes mj-ed-blink': animation
};

/***/ },
/* 10 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = function () {
  /**
   * Creates a key.
   * 
   * @param {Object} key
   * 
   * @constructor
   */
  function Key(key) {
    _classCallCheck(this, Key);

    this.key = key;
  }

  /**
   * Get the label of the key.
   * 
   * @return {String}
   */


  _createClass(Key, [{
    key: "getLabel",
    value: function getLabel() {
      if (this.key.label) {
        return "\\(" + this.key.label + "\\)";
      }
      return "<i class=\"material-icons\">" + this.key.$label + "</i>";
    }

    /**
     * Get the click listener of the key.
     * 
     * @return {Function}
     */

  }, {
    key: "getClickListener",
    value: function getClickListener() {
      return this.key.onClick;
    }

    /**
     * Check if the key is set.
     * 
     * @return {Boolean}
     */

  }, {
    key: "exists",
    value: function exists() {
      return !!this.key;
    }
  }]);

  return Key;
}();

exports.default = Key;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Key = __webpack_require__(10);

var _Key2 = _interopRequireDefault(_Key);

var _pages = __webpack_require__(12);

var _pages2 = _interopRequireDefault(_pages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pages = _pages2.default.pages,
    controlKeys = _pages2.default.controlKeys;


var pagesLength = pages.length;
var keyRows = pages[0].length + 1; // controlKeys are the last row, so plus 1.
var keyColumns = pages[0][0].length;

pages = pages.map(function (page) {
  page.push(controlKeys);
  return page;
});

var Keys = function () {
  function Keys() {
    _classCallCheck(this, Keys);
  }

  _createClass(Keys, null, [{
    key: 'getPage',

    /**
     * Get a page.
     * 
     * @param {Number} index
     * 
     * @return {Array}
     */
    value: function getPage(index) {
      return pages[index];
    }

    /**
     * Get the number of pages.
     * 
     * @return {Number}
     */

  }, {
    key: 'getPagesLength',
    value: function getPagesLength() {
      return pagesLength;
    }

    /**
     * Get the number of key rows.
     * 
     * @return {Number}
     */

  }, {
    key: 'getKeyRows',
    value: function getKeyRows() {
      return keyRows;
    }

    /**
     * Get the number of key columns.
     * 
     * @return {Number}
     */

  }, {
    key: 'getKeyColumns',
    value: function getKeyColumns() {
      return keyColumns;
    }

    /**
     * Get a key.
     * 
     * @param {Number} pageIndex
     * @param {Number} i
     * @param {Number} j
     * 
     * @return {Key}
     */

  }, {
    key: 'getKey',
    value: function getKey(pageIndex, i, j) {
      return new _Key2.default(pages[pageIndex][i][j]);
    }
  }]);

  return Keys;
}();

exports.default = Keys;

/***/ },
/* 12 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var pages = [
// Page 0
[[{ label: '(', onClick: function onClick(editor) {
    return editor.insertSymbol('(');
  } }, { label: ')', onClick: function onClick(editor) {
    return editor.insertSymbol(')');
  } }, { label: '|', onClick: function onClick(editor) {
    return editor.insertSymbol('|');
  } }, { label: '[', onClick: function onClick(editor) {
    return editor.insertSymbol('[');
  } }, { label: ']', onClick: function onClick(editor) {
    return editor.insertSymbol(']');
  } }, { label: '\\sqrt{a}', onClick: function onClick(editor) {
    return editor.insertCommand('sqrt', 1);
  } }, { label: '\\sqrt[n]{a}', onClick: function onClick(editor) {
    return editor.insertCommand('sqrt', 1, true);
  } }, { label: '\\geq', onClick: function onClick(editor) {
    return editor.insertCommand('\\geq');
  } }], [{ label: 'x', onClick: function onClick(editor) {
    return editor.insert('x');
  } }, { label: '7', onClick: function onClick(editor) {
    return editor.insert('7');
  } }, { label: '8', onClick: function onClick(editor) {
    return editor.insert('8');
  } }, { label: '9', onClick: function onClick(editor) {
    return editor.insert('9');
  } }, { label: '\\frac{a}{b}', onClick: function onClick(editor) {
    return editor.insertCommand('frac', 2);
  } }, { label: 'a^n', onClick: function onClick(editor) {
    return editor.insertCommand('^', 1);
  } }, { label: 'a_n', onClick: function onClick(editor) {
    return editor.insertCommand('_', 1);
  } }, { label: '\\leq', onClick: function onClick(editor) {
    return editor.insertCommand('leq');
  } }], [{ label: 'y', onClick: function onClick(editor) {
    return editor.insert('y');
  } }, { label: '4', onClick: function onClick(editor) {
    return editor.insert('4');
  } }, { label: '5', onClick: function onClick(editor) {
    return editor.insert('5');
  } }, { label: '6', onClick: function onClick(editor) {
    return editor.insert('6');
  } }, null, null, null, { label: '>', onClick: function onClick(editor) {
    return editor.insertSymbol('>');
  } }], [{ label: 'z', onClick: function onClick(editor) {
    return editor.insert('z');
  } }, { label: '1', onClick: function onClick(editor) {
    return editor.insert('1');
  } }, { label: '2', onClick: function onClick(editor) {
    return editor.insert('2');
  } }, { label: '3', onClick: function onClick(editor) {
    return editor.insert('3');
  } }, { label: '-', onClick: function onClick(editor) {
    return editor.insertSymbol('-');
  } }, { label: '+', onClick: function onClick(editor) {
    return editor.insertSymbol('+');
  } }, { label: '\\div', onClick: function onClick(editor) {
    return editor.insertCommand('div');
  } }, { label: '<', onClick: function onClick(editor) {
    return editor.insertSymbol('<');
  } }], [null, { label: ',', onClick: function onClick(editor) {
    return editor.insertSymbol(',');
  } }, { label: '0', onClick: function onClick(editor) {
    return editor.insert('0');
  } }, { label: '.', onClick: function onClick(editor) {
    return editor.insertSymbol('.');
  } }, null, { label: '\\%', onClick: function onClick(editor) {
    return editor.insertSymbol('%');
  } }, { label: '=', onClick: function onClick(editor) {
    return editor.insertSymbol('=');
  } }, { label: '\\pm', onClick: function onClick(editor) {
    return editor.insertCommand('pm');
  } }]],
// Page 1
[[{ label: 'a', onClick: function onClick(editor) {
    return editor.insert('a');
  } }, { label: 'b', onClick: function onClick(editor) {
    return editor.insert('b');
  } }, { label: 'c', onClick: function onClick(editor) {
    return editor.insert('c');
  } }, { label: 'd', onClick: function onClick(editor) {
    return editor.insert('d');
  } }, { label: 'e', onClick: function onClick(editor) {
    return editor.insert('e');
  } }, { label: 'f', onClick: function onClick(editor) {
    return editor.insert('f');
  } }, { label: 'g', onClick: function onClick(editor) {
    return editor.insert('g');
  } }, { label: 'h', onClick: function onClick(editor) {
    return editor.insert('h');
  } }], [{ label: 'i', onClick: function onClick(editor) {
    return editor.insert('i');
  } }, { label: 'j', onClick: function onClick(editor) {
    return editor.insert('j');
  } }, { label: 'k', onClick: function onClick(editor) {
    return editor.insert('k');
  } }, { label: 'l', onClick: function onClick(editor) {
    return editor.insert('l');
  } }, { label: 'm', onClick: function onClick(editor) {
    return editor.insert('m');
  } }, { label: 'n', onClick: function onClick(editor) {
    return editor.insert('n');
  } }, { label: 'o', onClick: function onClick(editor) {
    return editor.insert('o');
  } }, { label: 'p', onClick: function onClick(editor) {
    return editor.insert('p');
  } }], [{ label: 'q', onClick: function onClick(editor) {
    return editor.insert('q');
  } }, { label: 'r', onClick: function onClick(editor) {
    return editor.insert('r');
  } }, { label: 's', onClick: function onClick(editor) {
    return editor.insert('s');
  } }, { label: 't', onClick: function onClick(editor) {
    return editor.insert('t');
  } }, { label: 'u', onClick: function onClick(editor) {
    return editor.insert('u');
  } }, { label: 'v', onClick: function onClick(editor) {
    return editor.insert('v');
  } }, { label: 'w', onClick: function onClick(editor) {
    return editor.insert('w');
  } }, { label: 'x', onClick: function onClick(editor) {
    return editor.insert('x');
  } }], [{ label: 'y', onClick: function onClick(editor) {
    return editor.insert('y');
  } }, { label: 'z', onClick: function onClick(editor) {
    return editor.insert('z');
  } }, null, null, null, null, null, null], [null, null, null, null, null, null, null, null]],
// Page 2
[[{ label: '\\alpha', onClick: function onClick(editor) {
    return editor.insertCommand('alpha');
  } }, { label: '\\beta', onClick: function onClick(editor) {
    return editor.insertCommand('beta');
  } }, { label: '\\gamma', onClick: function onClick(editor) {
    return editor.insertCommand('gamma');
  } }, { label: '\\Gamma', onClick: function onClick(editor) {
    return editor.insertCommand('Gamma');
  } }, { label: '\\delta', onClick: function onClick(editor) {
    return editor.insertCommand('delta');
  } }, { label: '\\Delta', onClick: function onClick(editor) {
    return editor.insertCommand('Delta');
  } }, { label: '\\epsilon', onClick: function onClick(editor) {
    return editor.insertCommand('epsilon');
  } }, { label: '\\varepsilon', onClick: function onClick(editor) {
    return editor.insertCommand('varepsilon');
  } }], [{ label: '\\zeta', onClick: function onClick(editor) {
    return editor.insertCommand('zeta');
  } }, { label: '\\eta', onClick: function onClick(editor) {
    return editor.insertCommand('eta');
  } }, { label: '\\theta', onClick: function onClick(editor) {
    return editor.insertCommand('theta');
  } }, { label: '\\vartheta', onClick: function onClick(editor) {
    return editor.insertCommand('vartheta');
  } }, { label: '\\iota', onClick: function onClick(editor) {
    return editor.insertCommand('iota');
  } }, { label: '\\kappa', onClick: function onClick(editor) {
    return editor.insertCommand('kappa');
  } }, { label: '\\lambda', onClick: function onClick(editor) {
    return editor.insertCommand('lambda');
  } }, { label: '\\mu', onClick: function onClick(editor) {
    return editor.insertCommand('mu');
  } }], [{ label: '\\nu', onClick: function onClick(editor) {
    return editor.insertCommand('nu');
  } }, { label: '\\xi', onClick: function onClick(editor) {
    return editor.insertCommand('xi');
  } }, { label: '\\Xi', onClick: function onClick(editor) {
    return editor.insertCommand('Xi');
  } }, { label: '\\pi', onClick: function onClick(editor) {
    return editor.insertCommand('pi');
  } }, { label: '\\Pi', onClick: function onClick(editor) {
    return editor.insertCommand('Pi');
  } }, { label: '\\rho', onClick: function onClick(editor) {
    return editor.insertCommand('rho');
  } }, { label: '\\varrho', onClick: function onClick(editor) {
    return editor.insertCommand('varrho');
  } }, { label: '\\sigma', onClick: function onClick(editor) {
    return editor.insertCommand('sigma');
  } }], [{ label: '\\Sigma', onClick: function onClick(editor) {
    return editor.insertCommand('Sigma');
  } }, { label: '\\tau', onClick: function onClick(editor) {
    return editor.insertCommand('tau');
  } }, { label: '\\upsilon', onClick: function onClick(editor) {
    return editor.insertCommand('upsilon');
  } }, { label: '\\Upsilon', onClick: function onClick(editor) {
    return editor.insertCommand('Upsilon');
  } }, { label: '\\phi', onClick: function onClick(editor) {
    return editor.insertCommand('phi');
  } }, { label: '\\varphi', onClick: function onClick(editor) {
    return editor.insertCommand('varphi');
  } }, { label: '\\Phi', onClick: function onClick(editor) {
    return editor.insertCommand('Phi');
  } }, { label: '\\chi', onClick: function onClick(editor) {
    return editor.insertCommand('chi');
  } }], [{ label: '\\psi', onClick: function onClick(editor) {
    return editor.insertCommand('psi');
  } }, { label: '\\Psi', onClick: function onClick(editor) {
    return editor.insertCommand('Psi');
  } }, { label: '\\omega', onClick: function onClick(editor) {
    return editor.insertCommand('omega');
  } }, { label: '\\Omega', onClick: function onClick(editor) {
    return editor.insertCommand('Omega');
  } }, null, null, null, null]]];

var controlKeys = [{ $label: '&#xE5C4;', onClick: function onClick(editor, keyboard) {
    return keyboard.previousPage();
  } }, { $label: '&#xE5C8;', onClick: function onClick(editor, keyboard) {
    return keyboard.nextPage();
  } }, null, null, { $label: '&#xE314;', onClick: function onClick(editor) {
    return editor.moveCursorLeft();
  } }, // Left arrow (move cursor)
{ $label: '&#xE315;', onClick: function onClick(editor) {
    return editor.moveCursorRight();
  } }, // Right arrow
{ $label: '&#xE14A;', onClick: function onClick(editor) {
    return editor.erase();
  } }, // Backspace
{ $label: '&#xE5D9;', onClick: function onClick(editor) {
    return editor.core.insert('\\\\');
  } }];

exports.default = {
  pages: pages,
  controlKeys: controlKeys
};

/***/ },
/* 13 */
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
      'background-color': '#fff',
      border: '1px solid #ccc',
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      padding: '0.5em 0',
      position: 'absolute',
      width: '320px'
    },

    '.mjk-keyboard.isMobile': {
      border: 'none',
      'border-top': '1px solid #ccc'
    },

    '.mjk-keyboard.isDesktop': {
      'border-width': '2px'
    },

    '.mjk-keyRow': {
      'align-items': 'center',
      display: 'flex',
      'justify-content': 'center',
      'overflow': 'hidden'
    },

    '.mjk-keyRow:last-child': {
      'border-top': '2px solid #f1f1f1',
      'margin-top': '0.5em',
      'padding-top': '0.5em'
    },

    '.mjk-key': {
      'align-items': 'center',
      'background-color': 'transparent',
      border: 'none',
      color: '#333',
      display: 'flex',
      float: 'left',
      'justify-content': 'center',
      'text-align': 'center'
    },

    '.mjk-key *': {
      'outline': 'none'
    },

    '.mjk-input': {
      'background-color': '#fff',
      position: 'absolute !important',
      'overflow-x': 'scroll'
    },

    '.mjk-input .mj-ed-display': {
      border: 'none !important'
    }
  };

  MathJax.Ajax.Styles(styles);
}

window.addEventListener('load', onLoad);

/***/ },
/* 14 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyStyles = applyStyles;
exports.emptyElement = emptyElement;
exports.findNode = findNode;
exports.findClass = findClass;
/**
 * Apply styles to an element.
 * 
 * @param {DOMElement} $el
 * @param {Object} styles
 * 
 * @return {Void}
 */
function applyStyles($el, styles) {
  Object.keys(styles).forEach(function (property) {
    var value = styles[property];
    if (typeof value === 'number') {
      value = value + 'px';
    }
    $el.style[property] = value;
  });
}

/**
 * Removes all children of an element.
 * 
 * @param {DOMElement} $el
 * 
 * @return {Void}
 */
function emptyElement($el) {
  while ($el.firstChild) {
    $el.removeChild($el.firstChild);
  }
}

/**
 * Find a parent node.
 * 
 * @param {DOMElement} $el
 * 
 * @return {Boolean}
 */
function findNode($at, $el) {
  var $parent = $at;
  while ($parent) {
    if ($parent === $el) {
      return true;
    }
    $parent = $parent.parentNode;
  }
  return false;
}

/**
 * Find a class in a node.
 * 
 * @param {DOMElement} $el
 * @param {String} className
 * 
 * @return {Boolean}
 */
function findClass($el, className) {
  var $parent = $el;
  while ($parent) {
    if (!$parent) {
      return false;
    }
    if ($parent.className && ~$parent.className.indexOf(className)) {
      return true;
    }
    $parent = $parent.parentNode;
  }
  return false;
}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Core = __webpack_require__(3);

var _Core2 = _interopRequireDefault(_Core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathJaxEditorKeyboard = function () {
  /**
   * Surface on top of Core class.
   * 
   * @param {Object} options
   * 
   * @constructor
   */
  function MathJaxEditorKeyboard(options) {
    _classCallCheck(this, MathJaxEditorKeyboard);

    var core = new _Core2.default(options);

    this.editor = core.editor;
    this.version = '1.1.0';
  }

  /**
   * Get editor's value.
   * 
   * @return {String}
   */


  _createClass(MathJaxEditorKeyboard, [{
    key: 'getValue',
    value: function getValue() {
      return this.editor.getValue();
    }
  }]);

  return MathJaxEditorKeyboard;
}();

module.exports = MathJaxEditorKeyboard;

/***/ }
/******/ ]);
});