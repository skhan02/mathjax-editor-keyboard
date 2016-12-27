/**
 * Apply styles to an element.
 * 
 * @param {DOMElement} $el
 * @param {Object} styles
 * 
 * @return {Void}
 */
export function applyStyles($el, styles) {
  Object.keys(styles).forEach(property => {
    $el.style[property] = styles[property];
  });
}

/**
 * Removes all children of an element.
 * 
 * @param {DOMElement} $el
 * 
 * @return {Void}
 */
export function emptyElement($el) {
  while ($el.firstChild) {
    $el.removeChild($el);
  }
}