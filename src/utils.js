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
    let value = styles[property];
    if (typeof value === 'number') {
      value = `${value}px`;
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
export function emptyElement($el) {
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
export function findNode($at, $el) {
  let $parent = $at;
  while ($parent) {
    if ($parent === $el) {
      return true;
    }
    $parent = $parent.parentNode;
  }
  return false;
}