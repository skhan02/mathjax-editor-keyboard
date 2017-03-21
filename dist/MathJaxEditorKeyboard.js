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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1);
var cls = __webpack_require__(6);
var defaultSettings = __webpack_require__(20);
var dom = __webpack_require__(4);
var EventManager = __webpack_require__(17);
var guid = __webpack_require__(18);

var instances = {};

function Instance(element) {
  var i = this;

  i.settings = _.clone(defaultSettings);
  i.containerWidth = null;
  i.containerHeight = null;
  i.contentWidth = null;
  i.contentHeight = null;

  i.isRtl = dom.css(element, 'direction') === "rtl";
  i.isNegativeScroll = function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  }();
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
  i.event = new EventManager();
  i.ownerDocument = element.ownerDocument || document;

  function focus() {
    cls.add(element, 'ps-focus');
  }

  function blur() {
    cls.remove(element, 'ps-focus');
  }

  i.scrollbarXRail = dom.appendTo(dom.e('div', 'ps-scrollbar-x-rail'), element);
  i.scrollbarX = dom.appendTo(dom.e('div', 'ps-scrollbar-x'), i.scrollbarXRail);
  i.scrollbarX.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarX, 'focus', focus);
  i.event.bind(i.scrollbarX, 'blur', blur);
  i.scrollbarXActive = null;
  i.scrollbarXWidth = null;
  i.scrollbarXLeft = null;
  i.scrollbarXBottom = _.toInt(dom.css(i.scrollbarXRail, 'bottom'));
  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : _.toInt(dom.css(i.scrollbarXRail, 'top'));
  i.railBorderXWidth = _.toInt(dom.css(i.scrollbarXRail, 'borderLeftWidth')) + _.toInt(dom.css(i.scrollbarXRail, 'borderRightWidth'));
  // Set rail to display:block to calculate margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  dom.css(i.scrollbarXRail, 'display', '');
  i.railXWidth = null;
  i.railXRatio = null;

  i.scrollbarYRail = dom.appendTo(dom.e('div', 'ps-scrollbar-y-rail'), element);
  i.scrollbarY = dom.appendTo(dom.e('div', 'ps-scrollbar-y'), i.scrollbarYRail);
  i.scrollbarY.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarY, 'focus', focus);
  i.event.bind(i.scrollbarY, 'blur', blur);
  i.scrollbarYActive = null;
  i.scrollbarYHeight = null;
  i.scrollbarYTop = null;
  i.scrollbarYRight = _.toInt(dom.css(i.scrollbarYRail, 'right'));
  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : _.toInt(dom.css(i.scrollbarYRail, 'left'));
  i.scrollbarYOuterWidth = i.isRtl ? _.outerWidth(i.scrollbarY) : null;
  i.railBorderYWidth = _.toInt(dom.css(i.scrollbarYRail, 'borderTopWidth')) + _.toInt(dom.css(i.scrollbarYRail, 'borderBottomWidth'));
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));
  dom.css(i.scrollbarYRail, 'display', '');
  i.railYHeight = null;
  i.railYRatio = null;
}

function getId(element) {
  return element.getAttribute('data-ps-id');
}

function setId(element, id) {
  element.setAttribute('data-ps-id', id);
}

function removeId(element) {
  element.removeAttribute('data-ps-id');
}

exports.add = function (element) {
  var newId = guid();
  setId(element, newId);
  instances[newId] = new Instance(element);
  return instances[newId];
};

exports.remove = function (element) {
  delete instances[getId(element)];
  removeId(element);
};

exports.get = function (element) {
  return instances[getId(element)];
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var cls = __webpack_require__(6);
var dom = __webpack_require__(4);

var toInt = exports.toInt = function (x) {
  return parseInt(x, 10) || 0;
};

var clone = exports.clone = function (obj) {
  if (!obj) {
    return null;
  } else if (obj.constructor === Array) {
    return obj.map(clone);
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    var result = {};
    for (var key in obj) {
      result[key] = clone(obj[key]);
    }
    return result;
  } else {
    return obj;
  }
};

exports.extend = function (original, source) {
  var result = clone(original);
  for (var key in source) {
    result[key] = clone(source[key]);
  }
  return result;
};

exports.isEditable = function (el) {
  return dom.matches(el, "input,[contenteditable]") || dom.matches(el, "select,[contenteditable]") || dom.matches(el, "textarea,[contenteditable]") || dom.matches(el, "button,[contenteditable]");
};

exports.removePsClasses = function (element) {
  var clsList = cls.list(element);
  for (var i = 0; i < clsList.length; i++) {
    var className = clsList[i];
    if (className.indexOf('ps-') === 0) {
      cls.remove(element, className);
    }
  }
};

exports.outerWidth = function (element) {
  return toInt(dom.css(element, 'width')) + toInt(dom.css(element, 'paddingLeft')) + toInt(dom.css(element, 'paddingRight')) + toInt(dom.css(element, 'borderLeftWidth')) + toInt(dom.css(element, 'borderRightWidth'));
};

exports.startScrolling = function (element, axis) {
  cls.add(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.add(element, 'ps-' + axis);
  } else {
    cls.add(element, 'ps-x');
    cls.add(element, 'ps-y');
  }
};

exports.stopScrolling = function (element, axis) {
  cls.remove(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.remove(element, 'ps-' + axis);
  } else {
    cls.remove(element, 'ps-x');
    cls.remove(element, 'ps-y');
  }
};

exports.env = {
  isWebKit: 'WebkitAppearance' in document.documentElement.style,
  supportsTouch: 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch,
  supportsIePointer: window.navigator.msMaxTouchPoints !== null
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1);
var cls = __webpack_require__(6);
var dom = __webpack_require__(4);
var instances = __webpack_require__(0);
var updateScroll = __webpack_require__(3);

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = { width: i.railXWidth };
  if (i.isRtl) {
    xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  dom.css(i.scrollbarXRail, xRailOffset);

  var yRailOffset = { top: element.scrollTop, height: i.railYHeight };
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  dom.css(i.scrollbarYRail, yRailOffset);

  dom.css(i.scrollbarX, { left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth });
  dom.css(i.scrollbarY, { top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth });
}

module.exports = function (element) {
  var i = instances.get(element);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  var existingRails;
  if (!element.contains(i.scrollbarXRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-x-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarXRail, element);
  }
  if (!element.contains(i.scrollbarYRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-y-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarYRail, element);
  }

  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(i, _.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
    i.scrollbarXLeft = _.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
  } else {
    i.scrollbarXActive = false;
  }

  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(i, _.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
    i.scrollbarYTop = _.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    cls.add(element, 'ps-active-x');
  } else {
    cls.remove(element, 'ps-active-x');
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    updateScroll(element, 'left', 0);
  }
  if (i.scrollbarYActive) {
    cls.add(element, 'ps-active-y');
  } else {
    cls.remove(element, 'ps-active-y');
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    updateScroll(element, 'top', 0);
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__(0);

var lastTop;
var lastLeft;

var createDOMEvent = function createDOMEvent(name) {
  var event = document.createEvent("Event");
  event.initEvent(name, true, true);
  return event;
};

module.exports = function (element, axis, value) {
  if (typeof element === 'undefined') {
    throw 'You must provide an element to the update-scroll function';
  }

  if (typeof axis === 'undefined') {
    throw 'You must provide an axis to the update-scroll function';
  }

  if (typeof value === 'undefined') {
    throw 'You must provide a value to the update-scroll function';
  }

  if (axis === 'top' && value <= 0) {
    element.scrollTop = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-y-reach-start'));
  }

  if (axis === 'left' && value <= 0) {
    element.scrollLeft = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-x-reach-start'));
  }

  var i = instances.get(element);

  if (axis === 'top' && value >= i.contentHeight - i.containerHeight) {
    // don't allow scroll past container
    value = i.contentHeight - i.containerHeight;
    if (value - element.scrollTop <= 1) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollTop;
    } else {
      element.scrollTop = value;
    }
    element.dispatchEvent(createDOMEvent('ps-y-reach-end'));
  }

  if (axis === 'left' && value >= i.contentWidth - i.containerWidth) {
    // don't allow scroll past container
    value = i.contentWidth - i.containerWidth;
    if (value - element.scrollLeft <= 1) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollLeft;
    } else {
      element.scrollLeft = value;
    }
    element.dispatchEvent(createDOMEvent('ps-x-reach-end'));
  }

  if (!lastTop) {
    lastTop = element.scrollTop;
  }

  if (!lastLeft) {
    lastLeft = element.scrollLeft;
  }

  if (axis === 'top' && value < lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-up'));
  }

  if (axis === 'top' && value > lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-down'));
  }

  if (axis === 'left' && value < lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-left'));
  }

  if (axis === 'left' && value > lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-right'));
  }

  if (axis === 'top') {
    element.scrollTop = lastTop = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-y'));
  }

  if (axis === 'left') {
    element.scrollLeft = lastLeft = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-x'));
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var DOM = {};

DOM.e = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

DOM.appendTo = function (child, parent) {
  parent.appendChild(child);
  return child;
};

function cssGet(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function cssSet(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }
  element.style[styleName] = styleValue;
  return element;
}

function cssMultiSet(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val.toString() + 'px';
    }
    element.style[key] = val;
  }
  return element;
}

DOM.css = function (element, styleNameOrObject, styleValue) {
  if ((typeof styleNameOrObject === 'undefined' ? 'undefined' : _typeof(styleNameOrObject)) === 'object') {
    // multiple set with object
    return cssMultiSet(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return cssGet(element, styleNameOrObject);
    } else {
      return cssSet(element, styleNameOrObject, styleValue);
    }
  }
};

DOM.matches = function (element, query) {
  if (typeof element.matches !== 'undefined') {
    return element.matches(query);
  } else {
    if (typeof element.matchesSelector !== 'undefined') {
      return element.matchesSelector(query);
    } else if (typeof element.webkitMatchesSelector !== 'undefined') {
      return element.webkitMatchesSelector(query);
    } else if (typeof element.mozMatchesSelector !== 'undefined') {
      return element.mozMatchesSelector(query);
    } else if (typeof element.msMatchesSelector !== 'undefined') {
      return element.msMatchesSelector(query);
    }
  }
};

DOM.remove = function (element) {
  if (typeof element.remove !== 'undefined') {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
};

DOM.queryChildren = function (element, selector) {
  return Array.prototype.filter.call(element.childNodes, function (child) {
    return DOM.matches(child, selector);
  });
};

module.exports = DOM;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  /**
   * Tries to find the specified element. If it fails, an error is thrown.
   * 
   * @param {DOMElement|string} el - An element or a selector.
   * 
   * @return {DOMElement}
   */
  mustFindElement: function mustFindElement(el, tagName) {
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
  },


  /**
   * Insert a text in the middle of the given string.
   * 
   * @param {String} string
   * @param {Number} index
   * @param {String} fragment
   * 
   * @return {String}
   */
  insertBetween: function insertBetween(string, index, fragment) {
    var before = string.slice(0, index);
    var after = string.slice(index);
    return before + fragment + after;
  },


  /**
   * Remove a class of an element.
   * 
   * @param {DOMElement} $el
   * @param {String} className
   * 
   * @return {Void}
   */
  removeClass: function removeClass($el, className) {
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
  },


  /**
   * Add a class to an element.
   * 
   * @param {DOMElement} $el
   * @param {String} className
   * 
   * @return {Void}
   */
  addClass: function addClass($el, className) {
    var classes = $el.className.split(' ');
    if (!~classes.indexOf(className)) {
      $el.className += ' ' + className;
    }
    $el.className = $el.className.trim();
  },


  /**
   * Converts a DOM node list to array.
   * 
   * @param {DOMNodeList}
   * 
   * @return {Array}
   */
  toArray: function toArray(children) {
    var slice = [].slice;
    return slice.call(children);
  },


  /**
   * Check if the needle is found in haystack.
   * 
   * @param {Mixed} needle
   * @param {Array} haystack
   * 
   * @return {Boolean}
   */
  inArray: function inArray(needle, haystack) {
    return !!~haystack.indexOf(needle);
  },


  /**
   * Repeat a string.
   * 
   * @param {String} str
   * @param {Number} count
   * 
   * @return {String}
   */
  repeat: function repeat(str, count) {
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
  },


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
  removeFragment: function removeFragment(str, start, end) {
    return str.slice(0, start) + str.slice(end);
  },


  /**
   * Convert a list to a character regex.
   * 
   * @param {Array} list
   * 
   * @return {RegExp}
   */
  listToCharacterRegex: function listToCharacterRegex(list) {
    var chars = list.map(function (char) {
      return '\\' + char;
    }).join('');
    return new RegExp('^[' + chars + ']$');
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function oldAdd(element, className) {
  var classes = element.className.split(' ');
  if (classes.indexOf(className) < 0) {
    classes.push(className);
  }
  element.className = classes.join(' ');
}

function oldRemove(element, className) {
  var classes = element.className.split(' ');
  var idx = classes.indexOf(className);
  if (idx >= 0) {
    classes.splice(idx, 1);
  }
  element.className = classes.join(' ');
}

exports.add = function (element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    oldAdd(element, className);
  }
};

exports.remove = function (element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    oldRemove(element, className);
  }
};

exports.list = function (element) {
  if (element.classList) {
    return Array.prototype.slice.apply(element.classList);
  } else {
    return element.className.split(' ');
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

module.exports = EventBus;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathJaxEditor = __webpack_require__(11);
var PerfectScrollbar = __webpack_require__(16);
var Keys = __webpack_require__(32);

var _require = __webpack_require__(5),
    addClass = _require.addClass,
    removeClass = _require.removeClass;

var _require2 = __webpack_require__(36),
    applyStyles = _require2.applyStyles,
    emptyElement = _require2.emptyElement,
    findNode = _require2.findNode,
    findClass = _require2.findClass;

var styles = __webpack_require__(35);

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

    var $container = Element('div', { className: 'Mathjax_KeyboardContainer' });
    var $keyboard = Element('div', { className: 'Mathjax_KeyboardKeyboard' });
    var $arrow = Element('div', { className: 'Mathjax_KeyboardArrow' });
    var viewportWidth = window.innerWidth;

    $container.appendChild($keyboard);
    $container.appendChild($arrow);
    document.body.appendChild($container);

    $keyboard.style.zIndex = options.keyboardZIndex;
    $arrow.style.zIndex = options.keyboardZIndex;

    var mathjaxEditor = new MathJaxEditor(options);

    this.mathjaxEditor = mathjaxEditor;
    this.isMobile = viewportWidth < 640;
    this.isVisible = false;
    this.pageIndex = 0;
    this.$arrow = $arrow;
    this.$container = $container;
    this.$el = mathjaxEditor.core.$el;
    this.$cursor = mathjaxEditor.core.$cursor;
    this.$keyboard = $keyboard;
    this.$editorContainer = mathjaxEditor.core.$container;
    this.$editorInput = mathjaxEditor.core.$input;
    this.$editorDisplay = mathjaxEditor.core.$display;

    document.addEventListener('mousedown', this.handleDocumentClick.bind(this));

    this.setupScrollbar();
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
          mathjaxEditor = this.mathjaxEditor,
          pageIndex = this.pageIndex;


      var keys = Keys.getPage(pageIndex);
      var keyColumns = Keys.getKeyColumns();
      var keyWidth = (keyboardWidth - 20) / keyColumns;
      var keyWidthPx = keyWidth + 'px';

      emptyElement($keyboard);
      $keyboard.style.width = keyboardWidth + 'px';

      keys.forEach(function (rows, i) {
        var $row = Element('div', { className: 'Mathjax_KeyboardKeyRow' });

        rows.forEach(function (column, j) {
          var key = Keys.getKey(pageIndex, i, j);

          var $key = Element('button', {
            className: 'Mathjax_KeyboardKey',
            style: {
              fontSize: '16px',
              height: keyWidthPx,
              width: keyWidthPx
            }
          });

          if (key.exists()) {
            var listener = key.getClickListener();

            $key.innerHTML = key.getLabel();
            $key.addEventListener('click', function () {
              listener(mathjaxEditor, _this);
              _this.updateInputElement();
            });
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
      var $arrow = this.$arrow,
          $cursor = this.$cursor,
          $keyboard = this.$keyboard,
          $container = this.$container,
          $editorContainer = this.$editorContainer,
          $editorInput = this.$editorInput,
          mathjaxEditor = this.mathjaxEditor;

      var viewportWidth = window.innerWidth;

      var _$keyboard$getBoundin = $keyboard.getBoundingClientRect(),
          top = _$keyboard$getBoundin.top;

      if (this.isMobile) {
        var padding = (Math.max(viewportWidth, 320) - keyboardWidth) / 2;

        $editorInput.setAttribute('readonly', 'true');
        $container.appendChild($editorContainer);
        $container.appendChild($cursor);
        addClass($editorContainer, 'Mathjax_KeyboardInput');
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
      } else {
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

  }, {
    key: 'appendEditorNextToTargetElement',
    value: function appendEditorNextToTargetElement() {
      var $editorContainer = this.$editorContainer,
          $el = this.$el;

      removeClass($editorContainer, 'Mathjax_KeyboardInput');
      $el.parentNode.insertBefore($editorContainer, $el.nextSibling);
    }

    /**
     * Append the cursor to the container.
     * 
     * @return {Void}
     */

  }, {
    key: 'appendCursorToContainer',
    value: function appendCursorToContainer() {
      var $container = this.$container,
          $cursor = this.$cursor;

      $container.appendChild($cursor);
    }

    /**
     * Update the container element position and size.
     * 
     * @return {Void}
     */

  }, {
    key: 'updateContainerElement',
    value: function updateContainerElement() {
      var $arrow = this.$arrow,
          $keyboard = this.$keyboard,
          $container = this.$container,
          $editorContainer = this.$editorContainer;

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

        applyStyles($arrow, {
          left: width / 2 - 20
        });
      }

      applyStyles($container, {
        height: height,
        left: left,
        top: top,
        width: width
      });
    }

    /**
     * Setup PerfectScrollbar.
     * 
     * @return {Void}
     */

  }, {
    key: 'setupScrollbar',
    value: function setupScrollbar() {
      var mathjaxEditor = this.mathjaxEditor,
          $editorDisplay = this.$editorDisplay;

      addClass($editorDisplay, 'Mathjax_KeyboardDisplay');
      PerfectScrollbar.initialize($editorDisplay);
      mathjaxEditor.on('change', function () {
        PerfectScrollbar.update($editorDisplay);
      });
      $editorDisplay.addEventListener('scroll', function () {
        editor.core.update();
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
      this.mathjaxEditor.focus();
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
      if (findNode($target, $editorContainer)) {
        return this.showKeyboard();
      }
      if (!findNode($target, $container) && !findClass($target, 'Mathjax_KeyboardKey')) {
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
      var length = Keys.getPagesLength();
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
      var length = Keys.getPagesLength();
      var index = void 0;

      if (this.pageIndex === 0) {
        index = length - 1;
      } else {
        index = this.pageIndex - 1;
      }

      this.pageIndex = index;
      this.render();
    }

    /**
     * Destroys the keyboard container.
     * 
     * @return {Void}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      document.body.removeChild(this.$container);
    }
  }]);

  return Core;
}();

module.exports = Core;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = __webpack_require__(7);
var Placer = __webpack_require__(12);
var Tex = __webpack_require__(13);
var constants = __webpack_require__(8);

var _require = __webpack_require__(5),
    addClass = _require.addClass,
    insertBetween = _require.insertBetween,
    inArray = _require.inArray,
    mustFindElement = _require.mustFindElement,
    removeClass = _require.removeClass,
    removeFragment = _require.removeFragment,
    repeat = _require.repeat;

var supOrSub = constants.supOrSub;


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

    var $el = mustFindElement(el, 'textarea');
    var $container = Element('div', { className: 'Mathjax_Editor' });
    var $input = Element('input', { className: 'Mathjax_EditorInput' });
    var $display = Element('div', { className: 'Mathjax_EditorDisplay' }, ['\\({\\cursor}' + value + '\\)']);
    var $debug = Element('pre', { className: 'Mathjax_EditorDebug' }, ['|']);
    var $cursor = Element('div', { className: 'Mathjax_EditorCursor' });

    $el.parentNode.insertBefore($container, $el.nextSibling);
    $container.appendChild($input);
    $container.appendChild($display);
    $container.appendChild($debug);
    $container.appendChild($cursor);

    $input.addEventListener('keydown', this.handleInputEvent.bind(this));
    $input.addEventListener('keyup', this.handleInputEvent.bind(this));
    $input.addEventListener('blur', this.blur.bind(this));
    $display.addEventListener('click', this.focus.bind(this));
    $display.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    $display.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
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
    this.$cursor = $cursor;
    this.$debug = $debug;
    this.$display = $display;
    this.$input = $input;
    this.$el = $el;
    this.bus = new EventBus();
    this.cursorIndex = 0;
    this.lastCursorTimeout = null;
    this.placer = null;
    this.debug = debug;
    this.focusClass = focusClass;
    this.newLine = newLine;
    this.tex = new Tex(value, 0);
    this.value = value;
    this.mouseAtDisplay = false;
    this.textAlignment = 'left';
    this.getDisplayAlignment();
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

      var tex = new Tex(value, cursorIndex);

      this.tex = tex;

      if (this.debug) {
        this.$debug.innerHTML = insertBetween(value, cursorIndex, '|');
      }

      this.updateJaxElement(tex.displayTex, function () {
        setTimeout(function () {
          var placer = new Placer(_this2);
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
      var $display = this.$display,
          $cursor = this.$cursor;

      var hidden = options.cursorHidden || false;
      var className = 'wasRecentlyPlaced';

      $cursor.style.display = hidden ? 'none' : 'inline-block';

      if (this.lastCursorTimeout) {
        clearTimeout(this.lastCursorTimeout);
      }

      addClass($cursor, className);

      this.lastCursorTimeout = setTimeout(function () {
        return removeClass($cursor, className);
      }, 400);

      MathJax.Hub.Queue(function () {
        var $mjxCursor = $display.querySelector('.mjx-cursor');

        if (!$mjxCursor) {
          return;
        }

        var _$mjxCursor$getBoundi = $mjxCursor.getBoundingClientRect(),
            left = _$mjxCursor$getBoundi.left,
            right = _$mjxCursor$getBoundi.right,
            top = _$mjxCursor$getBoundi.top,
            bottom = _$mjxCursor$getBoundi.bottom;

        var cursorLeft = left;

        switch (_this4.textAlignment) {
          case 'center':
            cursorLeft = left + (right - left) / 2;break;

          case 'right':
            cursorLeft = right;break;
        }

        $cursor.style.left = cursorLeft + 'px';
        $cursor.style.top = top + 'px';
        $cursor.style.height = bottom - top + 'px';
        $display.scrollLeft = left;

        $mjxCursor.parentNode.removeChild($mjxCursor);
      });
    }

    /**
     * Get the alignment put on the editor's display.
     * 
     * @return {Void}
     */

  }, {
    key: 'getDisplayAlignment',
    value: function getDisplayAlignment() {
      var style = window.getComputedStyle(this.$display);
      this.textAlignment = style.getPropertyValue('text-align') || 'left';
    }

    /**
     * Set the editor's value.
     * 
     * @param {String} value
     * @param {Boolean} resetCursorIndex
     * 
     * @return {Void}
     */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      var resetCursorIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.value = value;

      if (resetCursorIndex) {
        this.cursorIndex = 0;
      }

      // Update original textarea value.
      this.$el.innerHTML = value;

      this.update();
      this.bus.trigger('change');
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
      var number = constants.number,
          variable = constants.variable,
          charToCommand = constants.charToCommand,
          operators = constants.operators,
          escapedOperators = constants.escapedOperators;


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

        if (inArray(char, operators.concat(escapedOperators))) {
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
      addClass(this.$display, this.focusClass);
    }

    /**
     * Blur the editor.
     * 
     * @return {Void}
     */

  }, {
    key: 'blur',
    value: function blur() {
      if (this.mouseAtDisplay) {
        return;
      }
      this.$input.blur();
      this.updateCursorElement({ cursorHidden: true });
      this.bus.trigger('blur');
      removeClass(this.$display, this.focusClass);
    }

    /**
     * Triggered when user's mouse enters the display.
     * 
     * @return {Void}
     */

  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.mouseAtDisplay = true;
    }

    /**
     * Triggered when user's mouse leaves the display.
     * 
     * @return {Void}
     */

  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.mouseAtDisplay = false;
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
      this.setValue(insertBetween(value, cursorIndex, chars));
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
      var number = constants.number,
          variable = constants.variable;


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
      var operators = constants.operators,
          escapedOperators = constants.escapedOperators;

      var symbols = operators.slice().concat(escapedOperators);

      if (!inArray(symbol, symbols)) {
        throw new RangeError('"' + symbol + '" is not a valid symbol.');
      }

      if (inArray(symbol, escapedOperators)) {
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

      if (command[0] !== '\\' && !inArray(command, supOrSub)) {
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

      var blocks = '}' + repeat('{}', blockCount - 1);

      this.setValue(insertBetween(value, cursorIndex, blocks));
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
      this.setValue(removeFragment(this.value, deletionStart, deletionEnd));
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

module.exports = Editor;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Editor = __webpack_require__(10);
var extendMathJax = __webpack_require__(14);

var _require = __webpack_require__(5),
    repeat = _require.repeat;

window.addEventListener('load', extendMathJax);

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

    var core = new Editor(options);

    this.core = core;
    this.version = '1.3.7';
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
     * Set editor's value.
     * 
     * @return {String}
     */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.core.setValue(value, true);
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
     * Insert a matrix in the editor.
     * 
     * @param {Number} rows
     * @param {Number} columns
     * 
     * @return {Void}
     */

  }, {
    key: 'insertMatrix',
    value: function insertMatrix(columns, rows) {
      var columnStr = repeat('&', columns - 1);
      var lines = rows - 1;
      var matrix = '\\begin{bmatrix}' + columnStr;
      var i = 0;

      for (; i < lines; i++) {
        matrix += '\\\\' + columnStr;
      }

      matrix += '\\end{bmatrix}';

      this.core.insert(matrix);
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = __webpack_require__(7);

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

    var bus = new EventBus();

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
          return false;
        }

        index = this.placeAtInterval(last.interval, last.i, x, y);
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

          case 'begin':
            _this2.findBegin(element);
            break;

          case 'end':
            break;

          case 'skip':
            _this2.skip(element);
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
     * Find a begin element.
     * 
     * @param {Object} element
     */

  }, {
    key: 'findBegin',
    value: function findBegin(_ref4) {
      var _this4 = this;

      var type = _ref4.type,
          props = _ref4.props;

      var key = this.getNextKeyFor(type);
      var $el = this.$display.querySelectorAll('.mjx-mtable')[key];
      var $nodes = $el.querySelectorAll('.mjx-isEmpty');
      var i = 0;

      props.cells.forEach(function (cell) {
        var diff = cell.end - cell.start;

        if (diff !== 0 && diff !== 1) {
          return;
        }

        var $target = $nodes[i++];
        var bounding = $target.getBoundingClientRect();
        _this4.addIntervalBox(cell.start, bounding);
      });
    }

    /**
     * Skip an element to be found.
     * 
     * @param {Object} element
     * 
     * @return {Void}
     */

  }, {
    key: 'skip',
    value: function skip(_ref5) {
      var type = _ref5.type;

      this.getNextKeyFor(type);
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
      var _this5 = this;

      $paints.forEach(function ($paint) {
        return document.body.removeChild($paint);
      });
      $paints = [];

      this.intervals.forEach(function (interval) {
        $paints.push(_this5.paint(interval));
      });

      console.log(this.intervals);
    }
  }]);

  return Placer;
}();

module.exports = Placer;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(5),
    inArray = _require.inArray,
    listToCharacterRegex = _require.listToCharacterRegex;

var constants = __webpack_require__(8);

var nearClosureHaystack = constants.nearClosureHaystack,
    supOrSub = constants.supOrSub,
    cursorTex = constants.cursorTex,
    emptyTex = constants.emptyTex,
    escType = constants.escType,
    spacingTex = constants.spacingTex,
    relationCommands = constants.relationCommands;


var test = {
  isNumber: constants.number,
  isVariable: constants.variable,
  isOperator: listToCharacterRegex(constants.operators),
  isEscapedOperator: listToCharacterRegex(constants.escapedOperators)
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
      if (!this.cursorPlaced && (this.cursorIndex === index || this.length === 0 || index === this.length)) {
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
      var isInsideBegin = false;
      var parsedBegin = null;

      this.cursorPlaced = false;

      for (; i < length; i++) {
        var index = i;
        var nextIndex = i + 1;
        var char = tex[index];
        var nextChar = tex[nextIndex];
        var lastChar = tex[index - 1];
        var nearClosure = inArray(nextChar, nearClosureHaystack);
        var isComma = char === ',';
        var isGrOrLeSign = inArray(char, ['<', '>']);
        var isNumber = test.isNumber.exec(char);
        var isVariable = test.isVariable.exec(char);
        var isOperator = test.isOperator.exec(char);
        var isNextCharEscapedOperator = test.isEscapedOperator.exec(nextChar);
        var isRelationCommand = char === '\\' && this.isRelationCommand(index);
        var shouldBeAroundBraces = isComma || isNumber || isGrOrLeSign;

        this.addCursorToTexDisplay(index);

        if (shouldBeAroundBraces || isRelationCommand) {
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
          if (!isInsideBegin) {
            var newLine = { start: index, end: nextIndex };
            this.newLines[index] = newLine;
            this.newLines[nextIndex] = newLine;
            this.elements.push({
              is: 'eol',
              type: 'block',
              index: index
            });
          }

          this.displayTex += '\\';
          i += 1;

          if (isInsideBegin && tex[i + 1] === '&') {
            this.displayTex += emptyTex;
          }
        }

        // A command.
        if (char === '\\' && test.isVariable.exec(nextChar)) {
          var _parseCommand = this.parseCommand(i),
              continueIterationAt = _parseCommand.continueIterationAt,
              element = _parseCommand.element;

          switch (element.is) {
            case 'begin':
              isInsideBegin = true;
              parsedBegin = element;

              if (this.findAhead(element.props.end, '}&')) {
                this.displayTex += emptyTex;
              }
              break;

            case 'end':
              isInsideBegin = false;
              this.parseBegin(parsedBegin, element);
              parsedBegin = null;
              break;
          }

          i = continueIterationAt;
        }

        // Sup and sub commands.
        if (inArray(char, supOrSub)) {
          i = this.parseCommand(i).continueIterationAt;
        }

        // Opening a command block.
        if (char === '{') {
          if (nextChar === '}') {
            this.addCursorToTexDisplay(nextIndex);
            this.displayTex += emptyTex;
          } else if (!this.isPartOfCommandThatStartsWith(index, supOrSub) && !isInsideBegin) {
            this.displayTex += spacingTex;
          }
          continue;
        }

        if (char === ' ') {
          continue;
        }

        if (char === '&') {
          if (this.findAhead(i + 1, '\\end') || nextChar === '&' || this.findAhead(i + 1, '\\\\')) {
            this.displayTex += emptyTex;
          }
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
      var is = 'command'; // we assume it is a command but it can be operator, variable or begin
      var start = iterator; // index command starts
      var end = null; // index command ends
      var nearClosure = false;
      var continueIterationAt = null;
      var blockContents = '';

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
          this.displayTex += !inArray(char, ['\\', '^', '_']) ? char : '';
          if (isVariable) {
            type += char;
          }
        }

        // Bracket found!
        if (char === '[') {
          brackets = { openIndex: i };
          if (opening === null) {
            opening = i;
            continueIterationAt = opening;
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

          // First block openning is there.
          if (opening === null) {
            opening = i;
            continueIterationAt = opening;

            if (!inArray(firstChar, supOrSub) && !inArray(type, ['begin', 'end'])) {
              this.displayTex += spacingTex;
            }

            // Place the cursor if it is there.
            this.addCursorToTexDisplay(nextIndex);

            if (nextChar === '}') {
              this.displayTex += emptyTex;
            }
          }

          openBlocks += 1;
        } else if (openBlocks > 0 && char !== '}') {
          blockContents += char;
        }

        // Find a block being closed.
        if (char === '}') {
          openBlocks -= 1;

          // If it is this command block...
          if (openBlocks === 0) {
            var key = blocks.length - 1;
            blocks[key].closeIndex = i;
            blocks[key].contents = blockContents;
            blocks[key].length = i - blocks[key].openIndex;
            blockContents = '';
            this.isPartOfCommand[i] = partOfCommandObject;
          }
        }

        if (opening === null && char === ' ') {
          var shouldBeAroundBraces = inArray(type, relationCommands);
          type = this.decideType(type);
          is = type === 'mo' ? 'operator' : 'variable';
          end = i;
          opening = i;
          continueIterationAt = opening;
          if (inArray(nextChar, nearClosureHaystack)) {
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

      // Handle \begin and \end commands.
      // We must skip its blocks contents.

      if (inArray(type, ['begin', 'end'])) {
        is = type;
        type = blocks[0].contents;
        continueIterationAt = end;
        this.displayTex += type + '}';

        if (type === 'end') {
          return {
            continueIterationAt: continueIterationAt,
            element: {
              is: 'end'
            }
          };
        }
      }

      var element = {
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
      };

      if (is === 'begin') {
        this.elements.push({ is: 'skip', type: 'mo' });
      }

      this.elements.push(element);

      if (is === 'end') {
        this.elements.push({ is: 'skip', type: 'mo' });
      }

      return {
        continueIterationAt: continueIterationAt,
        element: element
      };
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
      return inArray(data.firstChar, haystack);
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
          return inArray(name, relationCommands);
        }
        name += char;
      }

      return false;
    }

    /**
     * Parse a begin command.
     * 
     * @param {Object} beginElement
     * @param {Object} endElement
     * 
     * @return {Void}
     */

  }, {
    key: 'parseBegin',
    value: function parseBegin(beginElement, endElement) {
      var tex = this.tex;

      var length = endElement.index + 1;
      var cells = [];
      var i = beginElement.props.end + 1;
      var openBlocks = 0;
      var start = i;
      var end = null;

      for (; i < length; i++) {
        var char = tex[i];
        var nextChar = tex[i + 1];
        var isNewLine = char === '\\' && nextChar === '\\';
        var isAtEnd = i === length - 1;

        if (char === '{') {
          openBlocks += 1;
        }
        if (char === '}') {
          openBlocks -= 1;
        }
        if (openBlocks === 0 && (char === '&' || isNewLine || isAtEnd)) {
          end = i + (isAtEnd ? 1 : 0);
          cells.push({ start: start, end: end });
          start = i + 1 + (isNewLine ? 1 : 0);
        }
      }

      beginElement.props.cells = cells;
    }

    /**
     * Find a string ahead an index pos.
     * 
     * @param {Number} index
     * @param {String} str
     * 
     * @return {Boolean}
     */

  }, {
    key: 'findAhead',
    value: function findAhead(index, str) {
      var tex = this.tex;

      var strLength = str.length;
      var length = index + strLength;
      var i = index;

      for (; i < length; i++) {
        if (tex[i] !== str[i - index]) {
          return false;
        }
      }

      return true;
    }
  }]);

  return Tex;
}();

module.exports = Tex;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var styles = __webpack_require__(15);

/**
 * This will extend MathJax so that we can put our simple
 * cursor there.
 */
module.exports = function extendMathJax() {
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

  MathJax.Ajax.Styles(styles);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var animation = 'from, to { opacity: 1 }\n 50% { opacity: 0 }';

module.exports = {
  '.Mathjax_Editor': {
    '-moz-user-select': 'none',
    '-webkit-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none'
  },

  '.Mathjax_EditorCursor.wasRecentlyPlaced': {
    'animation': 'none !important',
    'opacity': '1 !important'
  },

  '.Mathjax_EditorInput': {
    left: '-100%',
    position: 'absolute',
    top: '-100%'
  },

  '.Mathjax_EditorDisplay': {
    'box-sizing': 'border-box',
    'cursor': 'text',
    'overflow-Y': 'overflow'
  },

  '.Mathjax_EditorDisplay *': {
    outline: 'none'
  },

  '.Mathjax_EditorCursor': {
    '-webkit-animation': '1s Mathjax_EditorCursorBlink step-end infinite',
    '-moz-animation': '1s Mathjax_EditorCursorBlink step-end infinite',
    '-ms-animation': '1s Mathjax_EditorCursorBlink step-end infinite',
    '-o-animation': '1s Mathjax_EditorCursorBlink step-end infinite',
    animation: '1s Mathjax_EditorCursorBlink step-end infinite',
    'background-color': '#000',
    position: 'absolute',
    width: '2px'
  },

  '.mjx-isEmpty': {
    color: '#ccc'
  },

  '@keyframes Mathjax_EditorCursorBlink': animation,
  '@-moz-keyframes Mathjax_EditorCursorBlink': animation,
  '@-webkit-keyframes Mathjax_EditorCursorBlink': animation,
  '@-ms-keyframes Mathjax_EditorCursorBlink': animation,
  '@-o-keyframes Mathjax_EditorCursorBlink': animation
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(19);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventElement = function EventElement(element) {
  this.element = element;
  this.events = {};
};

EventElement.prototype.bind = function (eventName, handler) {
  if (typeof this.events[eventName] === 'undefined') {
    this.events[eventName] = [];
  }
  this.events[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function (eventName, handler) {
  var isHandlerProvided = typeof handler !== 'undefined';
  this.events[eventName] = this.events[eventName].filter(function (hdlr) {
    if (isHandlerProvided && hdlr !== handler) {
      return true;
    }
    this.element.removeEventListener(eventName, hdlr, false);
    return false;
  }, this);
};

EventElement.prototype.unbindAll = function () {
  for (var name in this.events) {
    this.unbind(name);
  }
};

var EventManager = function EventManager() {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function (element) {
  var ee = this.eventElements.filter(function (eventElement) {
    return eventElement.element === element;
  })[0];
  if (typeof ee === 'undefined') {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function (element, eventName, handler) {
  this.eventElement(element).unbind(eventName, handler);
};

EventManager.prototype.unbindAll = function () {
  for (var i = 0; i < this.eventElements.length; i++) {
    this.eventElements[i].unbindAll();
  }
};

EventManager.prototype.once = function (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function onceHandler(e) {
    ee.unbind(eventName, onceHandler);
    handler(e);
  };
  ee.bind(eventName, onceHandler);
};

module.exports = EventManager;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
}();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var destroy = __webpack_require__(21);
var initialize = __webpack_require__(29);
var update = __webpack_require__(30);

module.exports = {
  initialize: initialize,
  update: update,
  destroy: destroy
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipePropagation: true,
  useBothWheelAxes: false,
  wheelPropagation: false,
  wheelSpeed: 1,
  theme: 'default'
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1);
var dom = __webpack_require__(4);
var instances = __webpack_require__(0);

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  i.event.unbindAll();
  dom.remove(i.scrollbarX);
  dom.remove(i.scrollbarY);
  dom.remove(i.scrollbarXRail);
  dom.remove(i.scrollbarYRail);
  _.removePsClasses(element);

  instances.remove(element);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindClickRailHandler(element, i) {
  function pageOffset(el) {
    return el.getBoundingClientRect();
  }
  var stopPropagation = function stopPropagation(e) {
    e.stopPropagation();
  };

  i.event.bind(i.scrollbarY, 'click', stopPropagation);
  i.event.bind(i.scrollbarYRail, 'click', function (e) {
    var positionTop = e.pageY - window.pageYOffset - pageOffset(i.scrollbarYRail).top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    updateScroll(element, 'top', element.scrollTop + direction * i.containerHeight);
    updateGeometry(element);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'click', stopPropagation);
  i.event.bind(i.scrollbarXRail, 'click', function (e) {
    var positionLeft = e.pageX - window.pageXOffset - pageOffset(i.scrollbarXRail).left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    updateScroll(element, 'left', element.scrollLeft + direction * i.containerWidth);
    updateGeometry(element);

    e.stopPropagation();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindClickRailHandler(element, i);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1);
var dom = __webpack_require__(4);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindMouseScrollXHandler(element, i) {
  var currentLeft = null;
  var currentPageX = null;

  function updateScrollLeft(deltaX) {
    var newLeft = currentLeft + deltaX * i.railXRatio;
    var maxLeft = Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) + i.railXRatio * (i.railXWidth - i.scrollbarXWidth);

    if (newLeft < 0) {
      i.scrollbarXLeft = 0;
    } else if (newLeft > maxLeft) {
      i.scrollbarXLeft = maxLeft;
    } else {
      i.scrollbarXLeft = newLeft;
    }

    var scrollLeft = _.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - i.railXRatio * i.scrollbarXWidth)) - i.negativeScrollAdjustment;
    updateScroll(element, 'left', scrollLeft);
  }

  var mouseMoveHandler = function mouseMoveHandler(e) {
    updateScrollLeft(e.pageX - currentPageX);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function mouseUpHandler() {
    _.stopScrolling(element, 'x');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarX, 'mousedown', function (e) {
    currentPageX = e.pageX;
    currentLeft = _.toInt(dom.css(i.scrollbarX, 'left')) * i.railXRatio;
    _.startScrolling(element, 'x');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

function bindMouseScrollYHandler(element, i) {
  var currentTop = null;
  var currentPageY = null;

  function updateScrollTop(deltaY) {
    var newTop = currentTop + deltaY * i.railYRatio;
    var maxTop = Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) + i.railYRatio * (i.railYHeight - i.scrollbarYHeight);

    if (newTop < 0) {
      i.scrollbarYTop = 0;
    } else if (newTop > maxTop) {
      i.scrollbarYTop = maxTop;
    } else {
      i.scrollbarYTop = newTop;
    }

    var scrollTop = _.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - i.railYRatio * i.scrollbarYHeight));
    updateScroll(element, 'top', scrollTop);
  }

  var mouseMoveHandler = function mouseMoveHandler(e) {
    updateScrollTop(e.pageY - currentPageY);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function mouseUpHandler() {
    _.stopScrolling(element, 'y');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarY, 'mousedown', function (e) {
    currentPageY = e.pageY;
    currentTop = _.toInt(dom.css(i.scrollbarY, 'top')) * i.railYRatio;
    _.startScrolling(element, 'y');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseScrollXHandler(element, i);
  bindMouseScrollYHandler(element, i);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1);
var dom = __webpack_require__(4);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindKeyboardHandler(element, i) {
  var hovered = false;
  i.event.bind(element, 'mouseenter', function () {
    hovered = true;
  });
  i.event.bind(element, 'mouseleave', function () {
    hovered = false;
  });

  var shouldPrevent = false;
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if (scrollTop === 0 && deltaY > 0 || scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if (scrollLeft === 0 && deltaX < 0 || scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if (e.isDefaultPrevented && e.isDefaultPrevented() || e.defaultPrevented) {
      return;
    }

    var focused = dom.matches(i.scrollbarX, ':focus') || dom.matches(i.scrollbarY, ':focus');

    if (!hovered && !focused) {
      return;
    }

    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (_.isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
      case 37:
        // left
        if (e.metaKey) {
          deltaX = -i.contentWidth;
        } else if (e.altKey) {
          deltaX = -i.containerWidth;
        } else {
          deltaX = -30;
        }
        break;
      case 38:
        // up
        if (e.metaKey) {
          deltaY = i.contentHeight;
        } else if (e.altKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = 30;
        }
        break;
      case 39:
        // right
        if (e.metaKey) {
          deltaX = i.contentWidth;
        } else if (e.altKey) {
          deltaX = i.containerWidth;
        } else {
          deltaX = 30;
        }
        break;
      case 40:
        // down
        if (e.metaKey) {
          deltaY = -i.contentHeight;
        } else if (e.altKey) {
          deltaY = -i.containerHeight;
        } else {
          deltaY = -30;
        }
        break;
      case 33:
        // page up
        deltaY = 90;
        break;
      case 32:
        // space bar
        if (e.shiftKey) {
          deltaY = 90;
        } else {
          deltaY = -90;
        }
        break;
      case 34:
        // page down
        deltaY = -90;
        break;
      case 35:
        // end
        if (e.ctrlKey) {
          deltaY = -i.contentHeight;
        } else {
          deltaY = -i.containerHeight;
        }
        break;
      case 36:
        // home
        if (e.ctrlKey) {
          deltaY = element.scrollTop;
        } else {
          deltaY = i.containerHeight;
        }
        break;
      default:
        return;
    }

    updateScroll(element, 'top', element.scrollTop - deltaY);
    updateScroll(element, 'left', element.scrollLeft + deltaX);
    updateGeometry(element);

    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent) {
      e.preventDefault();
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindKeyboardHandler(element, i);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindMouseWheelHandler(element, i) {
  var shouldPrevent = false;

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if (scrollTop === 0 && deltaY > 0 || scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if (scrollLeft === 0 && deltaX < 0 || scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
        // IE in some mouse drivers
        deltaX = 0;
        deltaY = e.wheelDelta;
      }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(deltaX, deltaY) {
    var child = element.querySelector('textarea:hover, select[multiple]:hover, .ps-child:hover');
    if (child) {
      if (!window.getComputedStyle(child).overflow.match(/(scroll|auto)/)) {
        // if not scrollable
        return false;
      }

      var maxScrollTop = child.scrollHeight - child.clientHeight;
      if (maxScrollTop > 0) {
        if (!(child.scrollTop === 0 && deltaY > 0) && !(child.scrollTop === maxScrollTop && deltaY < 0)) {
          return true;
        }
      }
      var maxScrollLeft = child.scrollLeft - child.clientWidth;
      if (maxScrollLeft > 0) {
        if (!(child.scrollLeft === 0 && deltaX < 0) && !(child.scrollLeft === maxScrollLeft && deltaX > 0)) {
          return true;
        }
      }
    }
    return false;
  }

  function mousewheelHandler(e) {
    var delta = getDeltaFromEvent(e);

    var deltaX = delta[0];
    var deltaY = delta[1];

    if (shouldBeConsumedByChild(deltaX, deltaY)) {
      return;
    }

    shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      updateScroll(element, 'top', element.scrollTop - deltaY * i.settings.wheelSpeed);
      updateScroll(element, 'left', element.scrollLeft + deltaX * i.settings.wheelSpeed);
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        updateScroll(element, 'top', element.scrollTop - deltaY * i.settings.wheelSpeed);
      } else {
        updateScroll(element, 'top', element.scrollTop + deltaX * i.settings.wheelSpeed);
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        updateScroll(element, 'left', element.scrollLeft + deltaX * i.settings.wheelSpeed);
      } else {
        updateScroll(element, 'left', element.scrollLeft - deltaY * i.settings.wheelSpeed);
      }
      shouldPrevent = true;
    }

    updateGeometry(element);

    shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== "undefined") {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== "undefined") {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseWheelHandler(element, i);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);

function bindNativeScrollHandler(element, i) {
  i.event.bind(element, 'scroll', function () {
    updateGeometry(element);
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindNativeScrollHandler(element, i);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindSelectionHandler(element, i) {
  function getRangeNode() {
    var selection = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : '';
    if (selection.toString().length === 0) {
      return null;
    } else {
      return selection.getRangeAt(0).commonAncestorContainer;
    }
  }

  var scrollingLoop = null;
  var scrollDiff = { top: 0, left: 0 };
  function startScrolling() {
    if (!scrollingLoop) {
      scrollingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(scrollingLoop);
          return;
        }

        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);
        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);
        updateGeometry(element);
      }, 50); // every .1 sec
    }
  }
  function stopScrolling() {
    if (scrollingLoop) {
      clearInterval(scrollingLoop);
      scrollingLoop = null;
    }
    _.stopScrolling(element);
  }

  var isSelected = false;
  i.event.bind(i.ownerDocument, 'selectionchange', function () {
    if (element.contains(getRangeNode())) {
      isSelected = true;
    } else {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'mouseup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'keyup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });

  i.event.bind(window, 'mousemove', function (e) {
    if (isSelected) {
      var mousePosition = { x: e.pageX, y: e.pageY };
      var containerGeometry = {
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        bottom: element.offsetTop + element.offsetHeight
      };

      if (mousePosition.x < containerGeometry.left + 3) {
        scrollDiff.left = -5;
        _.startScrolling(element, 'x');
      } else if (mousePosition.x > containerGeometry.right - 3) {
        scrollDiff.left = 5;
        _.startScrolling(element, 'x');
      } else {
        scrollDiff.left = 0;
      }

      if (mousePosition.y < containerGeometry.top + 3) {
        if (containerGeometry.top + 3 - mousePosition.y < 5) {
          scrollDiff.top = -5;
        } else {
          scrollDiff.top = -20;
        }
        _.startScrolling(element, 'y');
      } else if (mousePosition.y > containerGeometry.bottom - 3) {
        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
          scrollDiff.top = 5;
        } else {
          scrollDiff.top = 20;
        }
        _.startScrolling(element, 'y');
      } else {
        scrollDiff.top = 0;
      }

      if (scrollDiff.top === 0 && scrollDiff.left === 0) {
        stopScrolling();
      } else {
        startScrolling();
      }
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindSelectionHandler(element, i);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight || deltaY > 0 && scrollTop === 0) {
        return !i.settings.swipePropagation;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth || deltaX > 0 && scrollLeft === 0) {
        return !i.settings.swipePropagation;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    updateScroll(element, 'top', element.scrollTop - differenceY);
    updateScroll(element, 'left', element.scrollLeft - differenceX);

    updateGeometry(element);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;
  var inGlobalTouch = false;
  var inLocalTouch = false;

  function globalTouchStart() {
    inGlobalTouch = true;
  }
  function globalTouchEnd() {
    inGlobalTouch = false;
  }

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }
  function shouldHandle(e) {
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
      return true;
    }
    return false;
  }
  function touchStart(e) {
    if (shouldHandle(e)) {
      inLocalTouch = true;

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = new Date().getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }

      e.stopPropagation();
    }
  }
  function touchMove(e) {
    if (!inLocalTouch && i.settings.swipePropagation) {
      touchStart(e);
    }
    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = new Date().getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPreventDefault(differenceX, differenceY)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (!inGlobalTouch && inLocalTouch) {
      inLocalTouch = false;

      clearInterval(easingLoop);
      easingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (supportsTouch) {
    i.event.bind(window, 'touchstart', globalTouchStart);
    i.event.bind(window, 'touchend', globalTouchEnd);
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(window, 'pointerdown', globalTouchStart);
      i.event.bind(window, 'pointerup', globalTouchEnd);
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(window, 'MSPointerDown', globalTouchStart);
      i.event.bind(window, 'MSPointerUp', globalTouchEnd);
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

module.exports = function (element) {
  if (!_.env.supportsTouch && !_.env.supportsIePointer) {
    return;
  }

  var i = instances.get(element);
  bindTouchHandler(element, i, _.env.supportsTouch, _.env.supportsIePointer);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(1);
var cls = __webpack_require__(6);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);

// Handlers
var handlers = {
  'click-rail': __webpack_require__(22),
  'drag-scrollbar': __webpack_require__(23),
  'keyboard': __webpack_require__(24),
  'wheel': __webpack_require__(25),
  'touch': __webpack_require__(28),
  'selection': __webpack_require__(27)
};
var nativeScrollHandler = __webpack_require__(26);

module.exports = function (element, userSettings) {
  userSettings = (typeof userSettings === 'undefined' ? 'undefined' : _typeof(userSettings)) === 'object' ? userSettings : {};

  cls.add(element, 'ps-container');

  // Create a plugin instance.
  var i = instances.add(element);

  i.settings = _.extend(i.settings, userSettings);
  cls.add(element, 'ps-theme-' + i.settings.theme);

  i.settings.handlers.forEach(function (handlerName) {
    handlers[handlerName](element);
  });

  nativeScrollHandler(element);

  updateGeometry(element);
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1);
var dom = __webpack_require__(4);
var instances = __webpack_require__(0);
var updateGeometry = __webpack_require__(2);
var updateScroll = __webpack_require__(3);

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;

  // Recalculate rail margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  dom.css(i.scrollbarXRail, 'display', 'none');
  dom.css(i.scrollbarYRail, 'display', 'none');

  updateGeometry(element);

  // Update top/left scroll to trigger events
  updateScroll(element, 'top', element.scrollTop);
  updateScroll(element, 'left', element.scrollLeft);

  dom.css(i.scrollbarXRail, 'display', '');
  dom.css(i.scrollbarYRail, 'display', '');
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
      return "<i class=\"Mathjax_KeyboardIcon Mathjax_KeyboardIcon_" + this.key.$label + "\"></i>";
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

module.exports = Key;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = __webpack_require__(31);
var data = __webpack_require__(33);

var pages = data.pages,
    controlKeys = data.controlKeys;


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
      return new Key(pages[pageIndex][i][j]);
    }
  }]);

  return Keys;
}();

module.exports = Keys;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var controlKeys = [{ $label: 'Left', onClick: function onClick(editor, keyboard) {
    return keyboard.previousPage();
  } }, { $label: 'Right', onClick: function onClick(editor, keyboard) {
    return keyboard.nextPage();
  } }, null, null, { $label: 'PadLeft', onClick: function onClick(editor) {
    return editor.moveCursorLeft();
  } }, // Left arrow (move cursor)
{ $label: 'PadRight', onClick: function onClick(editor) {
    return editor.moveCursorRight();
  } }, // Right arrow
{ $label: 'Backspace', onClick: function onClick(editor) {
    return editor.erase();
  } }, // Backspace
{ $label: 'Enter', onClick: function onClick(editor) {
    return editor.core.insert('\\\\');
  } }];

module.exports = {
  pages: pages,
  controlKeys: controlKeys
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "/* perfect-scrollbar v0.6.16 */\n.ps-container{-ms-touch-action:auto;touch-action:auto;overflow:hidden !important;-ms-overflow-style:none}@supports (-ms-overflow-style: none){.ps-container{overflow:auto !important}}@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.ps-container{overflow:auto !important}}.ps-container.ps-active-x>.ps-scrollbar-x-rail,.ps-container.ps-active-y>.ps-scrollbar-y-rail{display:block;background-color:transparent}.ps-container.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail{background-color:#eee;opacity:.9}.ps-container.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail>.ps-scrollbar-x{background-color:#999;height:11px}.ps-container.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail{background-color:#eee;opacity:.9}.ps-container.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail>.ps-scrollbar-y{background-color:#999;width:11px}.ps-container>.ps-scrollbar-x-rail{display:none;position:absolute;opacity:0;-webkit-transition:background-color .2s linear, opacity .2s linear;-o-transition:background-color .2s linear, opacity .2s linear;-moz-transition:background-color .2s linear, opacity .2s linear;transition:background-color .2s linear, opacity .2s linear;bottom:0px;height:15px}.ps-container>.ps-scrollbar-x-rail>.ps-scrollbar-x{position:absolute;background-color:#aaa;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;-o-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;-moz-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -webkit-border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;bottom:2px;height:6px}.ps-container>.ps-scrollbar-x-rail:hover>.ps-scrollbar-x,.ps-container>.ps-scrollbar-x-rail:active>.ps-scrollbar-x{height:11px}.ps-container>.ps-scrollbar-y-rail{display:none;position:absolute;opacity:0;-webkit-transition:background-color .2s linear, opacity .2s linear;-o-transition:background-color .2s linear, opacity .2s linear;-moz-transition:background-color .2s linear, opacity .2s linear;transition:background-color .2s linear, opacity .2s linear;right:0;width:15px}.ps-container>.ps-scrollbar-y-rail>.ps-scrollbar-y{position:absolute;background-color:#aaa;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;-o-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;-moz-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -webkit-border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;right:2px;width:6px}.ps-container>.ps-scrollbar-y-rail:hover>.ps-scrollbar-y,.ps-container>.ps-scrollbar-y-rail:active>.ps-scrollbar-y{width:11px}.ps-container:hover.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail{background-color:#eee;opacity:.9}.ps-container:hover.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail>.ps-scrollbar-x{background-color:#999;height:11px}.ps-container:hover.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail{background-color:#eee;opacity:.9}.ps-container:hover.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail>.ps-scrollbar-y{background-color:#999;width:11px}.ps-container:hover>.ps-scrollbar-x-rail,.ps-container:hover>.ps-scrollbar-y-rail{opacity:.6}.ps-container:hover>.ps-scrollbar-x-rail:hover{background-color:#eee;opacity:.9}.ps-container:hover>.ps-scrollbar-x-rail:hover>.ps-scrollbar-x{background-color:#999}.ps-container:hover>.ps-scrollbar-y-rail:hover{background-color:#eee;opacity:.9}.ps-container:hover>.ps-scrollbar-y-rail:hover>.ps-scrollbar-y{background-color:#999}";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var perfectScrollbarStyles = __webpack_require__(34);

function onLoad() {
  MathJax.Ajax.Styles({
    '.Mathjax_KeyboardContainer': {
      'background-color': 'rgba(0, 0, 0, 0.5)',
      'border-radius': '5px',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%'
    },

    '.Mathjax_KeyboardArrow, .Mathjax_KeyboardArrow:after, .Mathjax_KeyboardArrow:before': {
      'border-left': '20px solid transparent',
      'border-right': '20px solid transparent',
      'border-bottom': '20px solid #fff',
      'content': '""',
      'display': 'block',
      'position': 'absolute',
      'top': '-18px'
    },

    '.Mathjax_KeyboardArrow:after': {
      'left': '-20px',
      'top': 0
    },

    '.Mathjax_KeyboardArrow:before': {
      'top': '-3px',
      'left': '-23px',
      'border-bottom-color': '#ccc',
      'border-width': '23px'
    },

    '.Mathjax_KeyboardKeyboard': {
      'background-color': '#fff',
      border: '1px solid #ccc',
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      padding: '0.5em 0',
      position: 'absolute',
      width: '320px'
    },

    '.Mathjax_KeyboardKeyboard.isMobile': {
      border: 'none',
      'border-top': '1px solid #ccc'
    },

    '.Mathjax_KeyboardKeyboard.isDesktop': {
      'border-width': '2px'
    },

    '.Mathjax_KeyboardKeyRow': {
      'align-items': 'center',
      display: 'flex',
      'justify-content': 'center',
      'overflow': 'hidden'
    },

    '.Mathjax_KeyboardKeyRow:last-child': {
      'border-top': '2px solid #f1f1f1',
      'margin-top': '0.5em',
      'padding-top': '0.5em'
    },

    '.Mathjax_KeyboardKey': {
      'align-items': 'center',
      'background-color': 'transparent',
      border: 'none',
      color: '#333',
      display: 'flex',
      float: 'left',
      'justify-content': 'center',
      'text-align': 'center'
    },

    '.Mathjax_KeyboardKey *': {
      'outline': 'none'
    },

    '.Mathjax_KeyboardInput': {
      'background-color': '#fff',
      position: 'absolute !important',
      'overflow-x': 'scroll'
    },

    '.Mathjax_KeyboardInput .Mathjax_EditorDisplay': {
      border: 'none !important'
    },

    '.Mathjax_KeyboardIcon': {
      display: 'inline-block',
      background: 'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAwCAYAAABwrHhvAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADwklEQVRYhcWYQWgcVRjH/9/MZClB4qWrOzNBPAkW2TrzXtIeDVZoD72EqqQnBQ96EYN3JblYEE1vhRZPQgu28dJbL0YUrLIzCYs2Z6HMzNJeKhi0bt7nIdll9u3Mzkw2u/3f3sz3vf/vfW/me7NrQpOUcqPRaLwax/F9/V5VSSnXHMdZiqJoKy/GTA+EEF8BWCWi87ZtPxkHwvO8U0R0E8CS67pGHsQAgOu6cwCWARjjQiRJ8sh13d3D+XIhBgCiKHqQShobQpsvE8IsSJo4xBDAtCEyAaYJQUWJUspLzHwLgAUAzLwahuHV3n0hBB8FCACIaN0oClJKFcaMo5EV8H3/MhF9C8AAhldfVelqEtF6q9X6PHd1vu+/N2lzIKcCQogPANzojSdlDhyuTjP/cFrmQwBCiI8BXJuW+RAAgNnjMvc871SROaA1ojiOf3Yc5wQzb45jDvQPI4uIfswzryTf9z+RUm6MPZGm3FasmxPRBoCzjuPMxXF877gArArmANAlol/yYhcWFs4ppb4B8FIJ76cArhR1Qt18pdVq3cmKbTabL8zMzPwB4GQJ8z7EqE5Y2hwALMu6ppk/BrCnhT3UxrVMgKrmvu+/Q0TL6WvM/C4zX0xBtGu12mkiup6OG9qCquae5500DGMXw6X/XSm1RERNIvrCNM0LSimfme8CONELGqhAVXMAMAxDL31PrxmG8QMzt4MgONPtdl/XzYcAnoUGAMIwvMrMq4dDi5lvSSkvjZpAKfURDh44Xf0tEEL8alnWDhFdBPBPOmioEcVxfN+27SdEdP4QcNl13d0oih5kASRJsmfb9p9E9Hb6OjOvENGLRHQXwMvMfKFWq11RStUBiF5cbh84wpuwqb0Jj3FwuM2mrj0EMJ/Oy23FVStRr9e3TNN8P2U4C2BGC5vTxk9HngVVIDqdzt/z8/PbzPwGgOdHzdszR1Er7knbjq+DIPi0TN6xalLH8UQlpVyTUq6Niim1BUc1Z+bPAHSVUqe3t7czH96JdMK0ORGt5JlnAkgp14QQN7KC01pcXHzF9/2zReaFZ0lOcrPZbM7m5AAA9vf3v9S/jqqaDwCkkn8D8Fa73dY/JkbqKOZ9AN08CIK/pmEOAJRKBg56ddmVOwCeI6L1VH5lFX4Vj1A0Rm5fBDzbLTABIIqiLdd1DQCXAbzpOM53cRz/W3aSVP4SCk7NTIAsiHq9frPT6fw3aQj9j8reJHs7OzvflzUfB2IiZ0GVZ6LUj9Oq0ivRaDQ2kyR5NDWANAQR/RSG4e28uP8BIwt4gmvglcAAAAAASUVORK5CYII=\') no-repeat',
      height: '16px',
      overflow: 'hidden',
      'text-indent': '-9999px',
      'text-align': 'left',
      'width': '16px'
    },

    '.Mathjax_KeyboardIcon_PadRight': {
      'background-position': '-0px -0px'
    },

    '.Mathjax_KeyboardIcon_Right': {
      'background-position': '-16px -0px'
    },

    '.Mathjax_KeyboardIcon_PadLeft': {
      'background-position': '-0px -16px'
    },

    '.Mathjax_KeyboardIcon_Backspace': {
      'background-position': '-16px -16px'
    },

    '.Mathjax_KeyboardIcon_Enter': {
      'background-position': '-0px -32px'
    },

    '.Mathjax_KeyboardIcon_Left': {
      'background-position': '-16px -32px'
    },

    '.Mathjax_KeyboardDisplay': {
      'position': 'relative'
    }
  });

  MathJax.Ajax.Styles(perfectScrollbarStyles);
}

window.addEventListener('load', onLoad);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  /**
   * Apply styles to an element.
   * 
   * @param {DOMElement} $el
   * @param {Object} styles
   * 
   * @return {Void}
   */
  applyStyles: function applyStyles($el, styles) {
    Object.keys(styles).forEach(function (property) {
      var value = styles[property];
      if (typeof value === 'number') {
        value = value + 'px';
      }
      $el.style[property] = value;
    });
  },


  /**
   * Removes all children of an element.
   * 
   * @param {DOMElement} $el
   * 
   * @return {Void}
   */
  emptyElement: function emptyElement($el) {
    while ($el.firstChild) {
      $el.removeChild($el.firstChild);
    }
  },


  /**
   * Find a parent node.
   * 
   * @param {DOMElement} $el
   * 
   * @return {Boolean}
   */
  findNode: function findNode($at, $el) {
    var $parent = $at;
    while ($parent) {
      if ($parent === $el) {
        return true;
      }
      $parent = $parent.parentNode;
    }
    return false;
  },


  /**
   * Find a class in a node.
   * 
   * @param {DOMElement} $el
   * @param {String} className
   * 
   * @return {Boolean}
   */
  findClass: function findClass($el, className) {
    var $parent = $el;
    while ($parent) {
      if (!$parent) {
        return false;
      }
      if ($parent.className && $parent.className.indexOf && ~$parent.className.indexOf(className)) {
        return true;
      }
      $parent = $parent.parentNode;
    }
    return false;
  }
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(5),
    toArray = _require.toArray;

var Core = __webpack_require__(9);

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

    var core = new Core(options);

    this.core = core;
    this.mathjaxEditor = core.mathjaxEditor;
    this.version = '1.2.2';
  }

  /**
   * Get editor's value.
   * 
   * @return {String}
   */


  _createClass(MathJaxEditorKeyboard, [{
    key: 'getValue',
    value: function getValue() {
      return this.mathjaxEditor.getValue();
    }

    /**
     * Set editor's value.
     * 
     * @return {String}
     */

  }, {
    key: 'setValue',
    value: function setValue(value) {
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

  }, {
    key: 'on',
    value: function on(type, listener) {
      this.mathjaxEditor.on(type, listener);
    }

    /**
     * Destroys the editor's keyboard.
     * 
     * @return {Void}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.core.destroy();
    }
  }]);

  return MathJaxEditorKeyboard;
}();

/**
 * This is the HTML API to quickly use the editor.
 */


window.addEventListener('load', function () {
  toArray(document.getElementsByClassName('mathjax-editor-html')).forEach(function ($el) {
    var scroll = $el.getAttribute('data-scroll');
    var newLine = $el.getAttribute('data-new-line');
    var value = $el.getAttribute('data-value');
    var keyboardZIndex = $el.getAttribute('data-keyboard-z-index');

    var options = {
      el: $el,
      scroll: scroll === 'true',
      newLine: newLine === 'true',
      keyboardZIndex: keyboardZIndex
    };

    if (value && value.length) {
      options.value = value;
    }

    $el.mathjaxEditor = new MathJaxEditorKeyboard(options);
  });
});

module.exports = MathJaxEditorKeyboard;

/***/ })
/******/ ]);
});