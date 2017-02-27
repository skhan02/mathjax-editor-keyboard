# MathJax Editor Keyboard

This is a mathematics keyboard that adapts itself based on user's device. All you need to do is set a target `<textarea>`, and bam! You get a mathematics editor out of the box.

## Installation

``` bash
npm install mathjax-editor-keyboard
```

or just grab `dist/MathJaxEditorKeyboard.js`.

You must include MathJax, [MathJax Editor](https://github.com/ianlucas/mathjax-editor) is already bundlered.

## Usage

``` html
<textarea id="myEditor"></textarea>
```

``` javascript
const editor = new MathJaxEditorKeyboard({
  el: '#myEditor', // or document.getElementById('myEditor)
})
```

### HTML API

You can quickly setup an editor only using HTML, like this:

``` html
<textarea class="mathjax-editor-html" data-scroll="true" data-value="hello" data-new-line="false"></textarea>
```

### `MathJaxEditor(options)`

#### `options.el`

The target element. It can be a selector string or a DOM Element.

#### `options.newLine`

Enable new line insertion. Default is **`false`**.

#### `options.scroll`

Enable scroll to display element. Default is **`false`**, so the display `overflow` is `hidden`.

#### `options.value`

Define the default editor value.

### API

#### `editor.getValue()`
#### `editor.setValue(value)`
#### `editor.on(type, listener) // available events are "change", "focus", and "blur".`

---

**License:** MIT