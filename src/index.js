import MathJaxEditorKeyboard from './mathjax-editor-keyboard'
import styles from './styles'

window.addEventListener('load', () => {
  MathJax.Ajax.Styles(styles)
})

export default MathJaxEditorKeyboard