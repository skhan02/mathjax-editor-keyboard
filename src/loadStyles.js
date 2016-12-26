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
      'background-color': '#333',
      bottom: 0,
      height: '320px',
      left: 0,
      'padding-top': '1em',
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
      color: '#fff',
      display: 'flex',
      float: 'left',
      'justify-content': 'center',
      'text-align': 'center'
    }
  };

  MathJax.Ajax.Styles(styles);
}

window.addEventListener('load', onLoad);