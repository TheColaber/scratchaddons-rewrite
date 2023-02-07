function injectStyle(css) {
  if (!globalThis.document)
    return;
  const style = document.createElement("style");
  style.classList.add("scratch-addons-style");
  style.textContent = css;
  if (document.body)
    document.documentElement.insertBefore(style, document.body);
  else
    document.documentElement.appendChild(style);
}

export { injectStyle as default };
