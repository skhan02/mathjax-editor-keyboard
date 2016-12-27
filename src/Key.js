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

  getClickListener() {
    if (!this.key || !this.key.onClick) {
      return () => null;
    }
    return this.key.onClick;
  }
}

export default Key;