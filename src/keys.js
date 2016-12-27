import Key from './Key';

const keys = [
  [
    { label: '(', onClick: editor => editor.insertSymbol('(') },
    { label: ')', onClick: editor => editor.insertSymbol(')') },
    { label: '|', onClick: editor => editor.insertSymbol('|') },
    { label: '[', onClick: editor => editor.insertSymbol('[') },
    { label: ']', onClick: editor => editor.insertSymbol(']') },
    { label: '\\sqrt{a}', onClick: editor => editor.insertCommand('\\sqrt', 1) },
    { label: '\\sqrt[n]{a}', onClick: editor => editor.insertCommand('\\sqrt', 1, true) },
    { label: '\\geq', onClick: editor => editor.insertCommand('\\geq') }
  ],
  [
    { label: 'x', onClick: editor => editor.insert('x') },
    { label: '7', onClick: editor => editor.insert('7') },
    { label: '8', onClick: editor => editor.insert('8') },
    { label: '9', onClick: editor => editor.insert('9') },
    { label: '\\frac{a}{b}', onClick: editor => editor.insertCommand('\\frac', 2) },
    { label: 'a^n', onClick: editor => editor.insertCommand('^', 1) },
    { label: 'a_n', onClick: editor => editor.insertCommand('_', 1) },
    { label: '\\leq', onClick: editor => editor.insertCommand('\\leq') }
  ],
  [
    { label: 'y', onClick: editor => editor.insert('y') },
    { label: '4', onClick: editor => editor.insert('4') },
    { label: '5', onClick: editor => editor.insert('5') },
    { label: '6', onClick: editor => editor.insert('6') },
    null,
    null,
    null,
    { label: '>', onClick: editor => editor.insertSymbol('>') }
  ],
  [
    { label: 'z', onClick: editor => editor.insert('z') },
    { label: '1', onClick: editor => editor.insert('1') },
    { label: '2', onClick: editor => editor.insert('2') },
    { label: '3', onClick: editor => editor.insert('3') },
    { label: '-', onClick: editor => editor.insertSymbol('-') },
    { label: '+', onClick: editor => editor.insertSymbol('+') },
    { label: '\\div', onClick: editor => editor.insertCommand('\\div') },
    { label: '<', onClick: editor => editor.insertSymbol('<') }
  ],
  [
    null,
    { label: ',', onClick: editor => editor.insertSymbol(',') },
    { label: '0', onClick: editor => editor.insert('0') },
    { label: '.', onClick: editor => editor.insertSymbol('.') },
    null,
    { label: '\\%', onClick: editor => editor.insertSymbol('%') },
    { label: '=', onClick: editor => editor.insertSymbol('=') },
    null,
    null
  ],
  [
    { $label: '&#xE314;', onClick: editor => editor.moveCursorLeft() }, // Left arrow (move cursor)
    { $label: '&#xE315;', onClick: editor => editor.moveCursorRight() }, // Right arrow
    { $label: '&#xE14A;', onClick: editor => editor.erase() }, // Backspace
    null,
    null,
    null,
    null,
    null,
  ]
];

export default {
  keyList: keys,
  keyRows: keys.length,
  keyColumns: keys[0].length,

  getKey(i, j) {
    return new Key(keys[i][j]);
  }
};