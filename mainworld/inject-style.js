function injectStyle (css) {
    console.log(globalThis);
    const style = document.createElement("style");
    style.classList.add("scratch-addons-style");
    style.textContent = css;
    if (document.body)
        document.documentElement.insertBefore(style, document.body);
    else
        document.documentElement.appendChild(style);
}

export { injectStyle as default };
