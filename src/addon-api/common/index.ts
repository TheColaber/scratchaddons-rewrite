export default class Addon extends EventTarget {
  id: string;
  browser: 'chrome' | 'firefox';
  disabled: boolean;

  constructor(id: string) {
    super();
    
    this.id = id;
    // catches both Chrome and Chromium
    this.browser = /Chrom/.test(navigator.userAgent) ? "chrome" : "firefox";
    this.disabled = false;
    this.addEventListener("disabled", () => (this.disabled = true));
    this.addEventListener("reenabled", () => (this.disabled = false));
  }
}