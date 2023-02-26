class Addon extends EventTarget {
  id;
  browser;
  disabled;
  constructor(id) {
    super();
    this.id = id;
    this.browser = /Chrom/.test(navigator.userAgent) ? "chrome" : "firefox";
    this.disabled = false;
    this.addEventListener("disabled", () => this.disabled = true);
    this.addEventListener("reenabled", () => this.disabled = false);
  }
}

export { Addon as A };
