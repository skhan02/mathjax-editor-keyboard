import appendElement from 'mathjax-editor/src/utils/append-element'
import createElement from 'mathjax-editor/src/utils/create-element'

export default function renderKeyboard($keyboard, layer, editor) {
  layer.forEach(line => {
    const $line = createElement('div', 'mathboard-line')
  
    line.forEach(key => {
      if (!key) {return}
      const $key = createElement('button', 'mathboard-key', {
        type: 'button',
        _html: `\\(${key[2] || key[1]}\\)`
      })
      $key.addEventListener('click', () => {
        switch (key[0]) {
        case 'n': return editor.insertNumber(parseInt(key[1]), 10)
        case 'i': return editor.insertIdentifier(key[1])
        case 'o': return editor.insertOperator(key[1])
        case 'm': return editor[key[1]]()
        }
      })
      appendElement($line, $key)
    })

    appendElement($keyboard, $line)
  })
}