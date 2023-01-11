const name = "Test Addon";
const description = "test desc";
const versionAdded = "1.0.0";
const userscripts = [
	{
		url: "addons/editor/code/test-addon/userscript.js",
		matches: [
			"projects"
		],
		runAtComplete: false
	}
];
const tags = [
	"recommended"
];
const enabledByDefault = true;
var addon = {
	name: name,
	description: description,
	versionAdded: versionAdded,
	userscripts: userscripts,
	tags: tags,
	enabledByDefault: enabledByDefault
};

var addons = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'test-addon': addon
});

export { addons as a };
