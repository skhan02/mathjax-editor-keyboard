import MathJaxEditor from 'mathjax-editor'

import appendElement from 'mathjax-editor/src/utils/append-element'
import appendElementAfter from 'mathjax-editor/src/utils/append-element-after'
import addClass from 'mathjax-editor/src/utils/add-class'
import createElement from 'mathjax-editor/src/utils/create-element'
import hideElement from 'mathjax-editor/src/utils/hide-element'
import listenElement from 'mathjax-editor/src/utils/listen-element'
import px from 'mathjax-editor/src/utils/px'
import removeClass from 'mathjax-editor/src/utils/remove-class'
import removeElement from 'mathjax-editor/src/utils/remove-element'
import showElement from 'mathjax-editor/src/utils/show-element'
import unlistenElement from 'mathjax-editor/src/utils/unlisten-element'

import layout from './layout'
import renderKeyboard from './render-keyboard'
import renderControls from './render-controls'

export default class MathJaxEditorKeyboard extends MathJaxEditor {
  constructor(selector, options) {
    super(selector, options)

    this.mathjaxEditorVersion = this.version
    this.version = '2.0.0-beta2'

    const $editorContainer = this.core.$container
    const $container = createElement('div', 'mathboard')
    const $keyboard = createElement('div', 'mathboard-keyboard')
    const $wrapper = createElement('div', 'mathboard-wrapper')
    
    let currentLayer = 0
    let isMobile = false
    let cursorAtDisplay = false

    appendElementAfter($editorContainer, $container)
    appendElement($container, $wrapper)
    appendElement($wrapper, $editorContainer, $keyboard)
    hideElement($keyboard)
    
    const clearKeyboard = () => {
      while ($keyboard.firstChild) {
        $keyboard.removeChild($keyboard.firstChild)
      }
    }
    
    const renderLayer = () => {
      clearKeyboard()
      renderKeyboard($keyboard, layout[currentLayer], this)
      renderControls($keyboard, this, {
        nextLayer() {
          if (++currentLayer === layout.length) {
            currentLayer = 0
          }
          renderLayer()
        },

        previousLayer() {
          if (--currentLayer < 0) {
            currentLayer = layout.length - 1
          }
          renderLayer()
        }
      })
      MathJax.Hub.Typeset($keyboard)
    }

    const handleFocus = () => {
      handleResize()
      showElement($keyboard)
      renderLayer()
      handleResize()
      this.core.update()
    }

    const handleBlur = () => {
      removeClass($container, 'is-desktop')
      removeClass($container, 'is-mobile')
      hideElement($keyboard)
      hideElement(this.core.$caret)
      this.core.$input.removeAttribute('readonly')
      this.core.handleBlur()
      appendElementAfter(this.core.$el, $container)
    }

    const handleDocClick = e => {
      if (!cursorAtDisplay) {
        handleBlur()
      }
    }

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      if (width > 512) {
        addClass($container, 'is-desktop')
        removeClass($container, 'is-mobile')
        $keyboard.style.marginLeft = px(-($keyboard.clientWidth / 2))
        this.core.$input.removeAttribute('readonly')
        isMobile = false
      }
      else {
        $keyboard.style.marginLeft = null
        appendElement(document.body, $container)
        addClass($container, 'is-mobile')
        removeClass($container, 'is-desktop')
        this.core.$input.setAttribute('readonly', 'true')
        isMobile = true
      }
    }

    listenElement($container, 'click', e => {
      if (e.target === $container) {
        handleBlur()
      }
    })

    listenElement($container, 'mouseenter', () => {
      cursorAtDisplay = true
    })

    listenElement($container, 'mouseleave', () => {
      cursorAtDisplay = false
    })
    
    listenElement(document, 'click', handleDocClick)
    this.on('focus', handleFocus)

    this.destroy = () => {
      super.destroy()
      removeElement($container)
      unlistenElement(document, 'click', handleDocClick)
    }
  }
}