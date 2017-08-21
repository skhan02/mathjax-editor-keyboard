export default [
  ['pad-left', editor => {editor.moveCursorLeft();editor.focus()}],
  ['pad-right', editor => {editor.moveCursorRight();editor.focus()}],
  ['backspace', editor => {editor.backspaceRemove();editor.focus()}],
  ['enter', editor => {editor.insertNewline();editor.focus()}],
  ['left', (editor, mb) => {mb.previousLayer()}],
  ['right', (editor, mb) => {mb.nextLayer()}]
]