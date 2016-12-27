function onLoad() {
  const styles = {
    '.mjk-container': {
      'background-color': 'rgba(0, 0, 0, 0.5)',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%'
    },

    '.mjk-keyboard': {  
      'background-color': '#11255e',
      bottom: 0,
      left: 0,
      'padding': '1em 0',
      position: 'absolute',
      width: '320px'
    },

    '.mjk-keyRow': {
      'align-items': 'center',    
      display: 'flex',
      'justify-content': 'center',
      'overflow': 'hidden'
    },

    '.mjk-key': {
      'align-items': 'center',
      'background-color': 'transparent',
      border: 'none',
      color: '#fff',
      display: 'flex',
      float: 'left',
      'justify-content': 'center',
      'text-align': 'center'
    },

    '.mjk-input': {
      'background-color': '#fff',
      position: 'absolute !important',
      // overflow: 'scroll'
    },

    '.mjk-input .mj-ed-display': {
      border: 'none !important'
    }
  };

  MathJax.Ajax.Styles(styles);
}

window.addEventListener('load', onLoad);