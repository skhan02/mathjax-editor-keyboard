const pages = [
  // Page 0
  [
    [
      { label: '(', onClick: editor => editor.insertSymbol('(') },
      { label: ')', onClick: editor => editor.insertSymbol(')') },
      { label: '|', onClick: editor => editor.insertSymbol('|') },
      { label: '[', onClick: editor => editor.insertSymbol('[') },
      { label: ']', onClick: editor => editor.insertSymbol(']') },
      { label: '\\sqrt{a}', onClick: editor => editor.insertCommand('sqrt', 1) },
      { label: '\\sqrt[n]{a}', onClick: editor => editor.insertCommand('sqrt', 1, true) },
      { label: '\\geq', onClick: editor => editor.insertCommand('\\geq') }
    ],
    [
      { label: 'x', onClick: editor => editor.insert('x') },
      { label: '7', onClick: editor => editor.insert('7') },
      { label: '8', onClick: editor => editor.insert('8') },
      { label: '9', onClick: editor => editor.insert('9') },
      { label: '\\frac{a}{b}', onClick: editor => editor.insertCommand('frac', 2) },
      { label: 'a^n', onClick: editor => editor.insertCommand('^', 1) },
      { label: 'a_n', onClick: editor => editor.insertCommand('_', 1) },
      { label: '\\leq', onClick: editor => editor.insertCommand('leq') }
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
      { label: '\\div', onClick: editor => editor.insertCommand('div') },
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
      { label: '\\pm', onClick: editor => editor.insertCommand('pm') }
    ]
  ],
  // Page 1
  [
    [
      { label: 'a', onClick: editor => editor.insert('a') },
      { label: 'b', onClick: editor => editor.insert('b') },
      { label: 'c', onClick: editor => editor.insert('c') },
      { label: 'd', onClick: editor => editor.insert('d') },
      { label: 'e', onClick: editor => editor.insert('e') },
      { label: 'f', onClick: editor => editor.insert('f') },
      { label: 'g', onClick: editor => editor.insert('g') },
      { label: 'h', onClick: editor => editor.insert('h') }
    ],
    [
      { label: 'i', onClick: editor => editor.insert('i') },
      { label: 'j', onClick: editor => editor.insert('j') },
      { label: 'k', onClick: editor => editor.insert('k') },
      { label: 'l', onClick: editor => editor.insert('l') },
      { label: 'm', onClick: editor => editor.insert('m') },
      { label: 'n', onClick: editor => editor.insert('n') },
      { label: 'o', onClick: editor => editor.insert('o') },
      { label: 'p', onClick: editor => editor.insert('p') }
    ],
    [
      { label: 'q', onClick: editor => editor.insert('q') },
      { label: 'r', onClick: editor => editor.insert('r') },
      { label: 's', onClick: editor => editor.insert('s') },
      { label: 't', onClick: editor => editor.insert('t') },
      { label: 'u', onClick: editor => editor.insert('u') },
      { label: 'v', onClick: editor => editor.insert('v') },
      { label: 'w', onClick: editor => editor.insert('w') },
      { label: 'x', onClick: editor => editor.insert('x') }
    ],
    [
      { label: 'y', onClick: editor => editor.insert('y') },
      { label: 'z', onClick: editor => editor.insert('z') },
      null,
      null,
      null,
      null,
      null,
      null
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]
  ],
  // Page 2
  [
    [
      { label: '\\alpha', onClick: editor => editor.insertCommand('alpha') },
      { label: '\\beta', onClick: editor => editor.insertCommand('beta') },
      { label: '\\gamma', onClick: editor => editor.insertCommand('gamma') },
      { label: '\\Gamma', onClick: editor => editor.insertCommand('Gamma') },
      { label: '\\delta', onClick: editor => editor.insertCommand('delta') },
      { label: '\\Delta', onClick: editor => editor.insertCommand('Delta') },
      { label: '\\epsilon', onClick: editor => editor.insertCommand('epsilon') },
      { label: '\\varepsilon', onClick: editor => editor.insertCommand('varepsilon') }
    ],
    [
      { label: '\\zeta', onClick: editor => editor.insertCommand('zeta') },
      { label: '\\eta', onClick: editor => editor.insertCommand('eta') },
      { label: '\\theta', onClick: editor => editor.insertCommand('theta') },
      { label: '\\vartheta', onClick: editor => editor.insertCommand('vartheta') },
      { label: '\\iota', onClick: editor => editor.insertCommand('iota') },
      { label: '\\kappa', onClick: editor => editor.insertCommand('kappa') },
      { label: '\\lambda', onClick: editor => editor.insertCommand('lambda') },
      { label: '\\mu', onClick: editor => editor.insertCommand('mu') }
    ],
    [
      { label: '\\nu', onClick: editor => editor.insertCommand('nu') },
      { label: '\\xi', onClick: editor => editor.insertCommand('xi') },
      { label: '\\Xi', onClick: editor => editor.insertCommand('Xi') },
      { label: '\\pi', onClick: editor => editor.insertCommand('pi') },
      { label: '\\Pi', onClick: editor => editor.insertCommand('Pi') },
      { label: '\\rho', onClick: editor => editor.insertCommand('rho') },
      { label: '\\varrho', onClick: editor => editor.insertCommand('varrho') },
      { label: '\\sigma', onClick: editor => editor.insertCommand('sigma') }
    ],
    [
      { label: '\\Sigma', onClick: editor => editor.insertCommand('Sigma') },
      { label: '\\tau', onClick: editor => editor.insertCommand('tau') },
      { label: '\\upsilon', onClick: editor => editor.insertCommand('upsilon') },
      { label: '\\Upsilon', onClick: editor => editor.insertCommand('Upsilon') },
      { label: '\\phi', onClick: editor => editor.insertCommand('phi') },
      { label: '\\varphi', onClick: editor => editor.insertCommand('varphi') },
      { label: '\\Phi', onClick: editor => editor.insertCommand('Phi') },
      { label: '\\chi', onClick: editor => editor.insertCommand('chi') }
    ],
    [
      { label: '\\psi', onClick: editor => editor.insertCommand('psi') },
      { label: '\\Psi', onClick: editor => editor.insertCommand('Psi') },
      { label: '\\omega', onClick: editor => editor.insertCommand('omega') },
      { label: '\\Omega', onClick: editor => editor.insertCommand('Omega') },
      null,
      null,
      null,
      null
    ]
  ]
];

const controlKeys = [
  { $label: '&#xE5C4;', onClick: (editor, keyboard) => keyboard.previousPage() },
  { $label: '&#xE5C8;', onClick: (editor, keyboard) => keyboard.nextPage() },
  null,
  { $label: '&#xE314;', onClick: editor => editor.moveCursorLeft() }, // Left arrow (move cursor)
  { $label: '&#xE315;', onClick: editor => editor.moveCursorRight() }, // Right arrow
  { $label: '&#xE14A;', onClick: editor => editor.erase() }, // Backspace
  { $label: '&#xE5D9;', onClick: editor => editor.core.insert('\\\\') },
  null,
];

export default {
  pages,
  controlKeys
};