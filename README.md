# MathJax Editor Keyboard

This is a mathematics keyboard that adapts itself based on user's device. All you need to do is set a target `<textarea>`, and bam! You get a mathematics editor out of the box.

## Installation

``` bash
npm install mathjax-editor-keyboard
```

or just grab `dist/MathJaxEditorKeyboard.js`.

You just need MathJax, [MathJax Editor](https://github.com/ianlucas/mathjax-editor) is already bundlered.

## Usage

``` html
<textarea id="myEditor"></textarea>
```

``` javascript
const editor = new MathJaxEditorKeyboard({
  el: '#myEditor', // or document.getElementById('myEditor)
})
```

MathJax Editor Keyboard's options are the same as MathJax Editor, [see them here](https://github.com/ianlucas/mathjax-editor).

### API

#### `editor.getValue()`

Get the value of the editor.

---

**License:** MIT