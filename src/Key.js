class Key {
  constructor(key) {
    this.key = key;
  }

  getLabel() {
    if (!this.key) {
      return '';
    }
    if (this.key.label) {
      return `\\(${this.key.label}\\)`;
    }
    return `<i class="material-icons">${this.key.$label}</i>`;
  }
}

export default Key;