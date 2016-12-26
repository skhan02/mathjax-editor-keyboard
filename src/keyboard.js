import Key from './Key';

const keys = [
  [
    { label: '(' },
    { label: ')' },
    { label: '|' },
    { label: '\[' },
    { label: '\]' },
    { label: '\\sqrt{a}' },
    { label: '\\sqrt[n]{a}' },
    { label: '\\geq' }
  ],
  [
    { label: 'x' },
    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: '\\frac{a}{b}' },
    { label: 'a^n' },
    { label: 'a_n' },
    { label: '\\leq' }
  ],
  [
    { label: 'y' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: ']' },
    { label: '\\sqrt{a}' },
    { label: '\\sqrt[n]{a}' },
    { label: '>' }
  ],
  [
    { label: 'z' },
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '-' },
    { label: '+' },
    { label: '\\div' },
    { label: '<' }
  ],
  [
    null,
    { label: ',' },
    { label: '0' },
    { label: '.' },
    { label: '%' },
    { label: '\\%' },
    { label: '=' },
    null,
    null
  ],
  [
    { $label: '&#xE314;' }, // Left arrow (move cursor)
    { $label: '&#xE315;' }, // Right arrow
    { $label: '&#xE14A;' }, // Backspace
    null,
    null,
    null,
    null,
    null,
  ]
];

export default {
  keyRows: keys.length,
  keyColumns: keys[0].length,

  getKey(i, j) {
    return new Key(keys[i][j]);
  }
};