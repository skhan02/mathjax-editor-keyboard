# MathJax Editor Keyboard

A keyboard for MathJax Editor.

## Usage

Include MathJax in your page, then include MathJax Editor Keyboard build file from `dist/`, or install it through npm: `npm install mathjax-editor-keyboard`.

```html
<textarea id="myEditor"></textarea>
```

```javascript
const editor = new MathJaxEditorKeyboard('#myEditor')
```

See the api on [MathJax Editor documentation](https://ianlucas.github.io/mathjax-editor), as this editor simply extends it.

## Browser Support

Tested on recent Chrome, Firefox and Internet Explorer 9 with **babel-polyfill** and **flexibility.js**.

**License:** MIT