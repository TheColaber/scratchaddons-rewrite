function defineScript(script) {
    return script;
}

var userscript = defineScript(async function () {
    console.log("hi scratch!");
});

export { userscript as default };
