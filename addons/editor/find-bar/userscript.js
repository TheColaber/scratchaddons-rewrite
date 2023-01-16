function defineScript(script) {
    return script;
}

var userscript = defineScript(async function ({ addon }) {
    console.log("hi scratch!");
    console.log(addon.id);
});

export { userscript as default };
