function onLoad() {
  const styles = {
    '.mjk-container': {
      'background-color': 'rgba(0, 0, 0, 0.5)',
      'border-radius': '5px',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%'
    },

    '.mjk-arrow, .mjk-arrow:after, .mjk-arrow:before': {
      'border-left': '20px solid transparent',
      'border-right': '20px solid transparent',
      'border-bottom': '20px solid #fff',
      'content': '""',
      'display': 'block',
      'position': 'absolute',
      'top': '-18px'
    },

    '.mjk-arrow:after': {
      'left': '-20px',
      'top': 0
    },

    '.mjk-arrow:before': {
      'top': '-3px',
      'left': '-23px',
      'border-bottom-color': '#ccc',
      'border-width': '23px'
    },

    '.mjk-keyboard': {  
      'background-color': '#fff',
      border: '1px solid #ccc',
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      padding: '0.5em 0',
      position: 'absolute',
      width: '320px'
    },

    '.mjk-keyboard.isMobile': {
      border: 'none',
      'border-top': '1px solid #ccc'
    },

    '.mjk-keyboard.isDesktop': {
      'border-width': '2px'
    },

    '.mjk-keyRow': {
      'align-items': 'center',    
      display: 'flex',
      'justify-content': 'center',
      'overflow': 'hidden'
    },

    '.mjk-keyRow:last-child': {
      'border-top': '2px solid #f1f1f1',
      'margin-top': '0.5em',
      'padding-top': '0.5em'
    },

    '.mjk-key': {
      'align-items': 'center',
      'background-color': 'transparent',
      border: 'none',
      color: '#333',
      display: 'flex',
      float: 'left',
      'justify-content': 'center',
      'text-align': 'center'
    },

    '.mjk-key *': {
      'outline': 'none'
    },

    '.mjk-input': {
      'background-color': '#fff',
      position: 'absolute !important',
      'overflow-x': 'scroll'
    },

    '.mjk-input .mj-ed-display': {
      border: 'none !important'
    },

    '.Mathjax_KeyboardIcon': {
      display: 'inline-block',
      background: 'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAwCAYAAABwrHhvAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADwklEQVRYhcWYQWgcVRjH/9/MZClB4qWrOzNBPAkW2TrzXtIeDVZoD72EqqQnBQ96EYN3JblYEE1vhRZPQgu28dJbL0YUrLIzCYs2Z6HMzNJeKhi0bt7nIdll9u3Mzkw2u/3f3sz3vf/vfW/me7NrQpOUcqPRaLwax/F9/V5VSSnXHMdZiqJoKy/GTA+EEF8BWCWi87ZtPxkHwvO8U0R0E8CS67pGHsQAgOu6cwCWARjjQiRJ8sh13d3D+XIhBgCiKHqQShobQpsvE8IsSJo4xBDAtCEyAaYJQUWJUspLzHwLgAUAzLwahuHV3n0hBB8FCACIaN0oClJKFcaMo5EV8H3/MhF9C8AAhldfVelqEtF6q9X6PHd1vu+/N2lzIKcCQogPANzojSdlDhyuTjP/cFrmQwBCiI8BXJuW+RAAgNnjMvc871SROaA1ojiOf3Yc5wQzb45jDvQPI4uIfswzryTf9z+RUm6MPZGm3FasmxPRBoCzjuPMxXF877gArArmANAlol/yYhcWFs4ppb4B8FIJ76cArhR1Qt18pdVq3cmKbTabL8zMzPwB4GQJ8z7EqE5Y2hwALMu6ppk/BrCnhT3UxrVMgKrmvu+/Q0TL6WvM/C4zX0xBtGu12mkiup6OG9qCquae5500DGMXw6X/XSm1RERNIvrCNM0LSimfme8CONELGqhAVXMAMAxDL31PrxmG8QMzt4MgONPtdl/XzYcAnoUGAMIwvMrMq4dDi5lvSSkvjZpAKfURDh44Xf0tEEL8alnWDhFdBPBPOmioEcVxfN+27SdEdP4QcNl13d0oih5kASRJsmfb9p9E9Hb6OjOvENGLRHQXwMvMfKFWq11RStUBiF5cbh84wpuwqb0Jj3FwuM2mrj0EMJ/Oy23FVStRr9e3TNN8P2U4C2BGC5vTxk9HngVVIDqdzt/z8/PbzPwGgOdHzdszR1Er7knbjq+DIPi0TN6xalLH8UQlpVyTUq6Niim1BUc1Z+bPAHSVUqe3t7czH96JdMK0ORGt5JlnAkgp14QQN7KC01pcXHzF9/2zReaFZ0lOcrPZbM7m5AAA9vf3v9S/jqqaDwCkkn8D8Fa73dY/JkbqKOZ9AN08CIK/pmEOAJRKBg56ddmVOwCeI6L1VH5lFX4Vj1A0Rm5fBDzbLTABIIqiLdd1DQCXAbzpOM53cRz/W3aSVP4SCk7NTIAsiHq9frPT6fw3aQj9j8reJHs7OzvflzUfB2IiZ0GVZ6LUj9Oq0ivRaDQ2kyR5NDWANAQR/RSG4e28uP8BIwt4gmvglcAAAAAASUVORK5CYII=\') no-repeat',
      height: '16px',
      overflow: 'hidden',
      'text-indent': '-9999px',
      'text-align': 'left',
      'width': '16px'
    },
    
    '.Mathjax_KeyboardIcon_PadRight': {
      'background-position': '-0px -0px'
    },
    
    '.Mathjax_KeyboardIcon_Right': {
      'background-position': '-16px -0px'
    },

    '.Mathjax_KeyboardIcon_PadLeft': {
      'background-position': '-0px -16px'
    },

    '.Mathjax_KeyboardIconBackspace': {
      'background-position': '-16px -16px'
    },

    '.Mathjax_KeyboardIcon_Enter': {
      'background-position': '-0px -32px'
    },

    '.Mathjax_KeyboardIcon_Left': {
      'background-position': '-16px -32px'
    }
  };

  MathJax.Ajax.Styles(styles);
}

window.addEventListener('load', onLoad);