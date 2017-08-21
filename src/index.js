import Mathboard from './mathboard'
import styles from './styles'

window.addEventListener('load', () => {
  MathJax.Ajax.Styles(styles)
})

export default Mathboard