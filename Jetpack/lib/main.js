const dataDir = require("self").data;
const pagemod = require("page-mod");

const prefSvc = require("simple-prefs");

pagemod.PageMod({
    include: "*",
    contentScriptFile: [dataDir.url("js/util.js"),dataDir.url("js/visualhash.js")],
	onAttach: function(worker) {
		worker.port.emit('updatePrefs', getPrefs());
	}
});

function getPrefs() {
	// prefSvc.prefs is not a "native type".
	var settings = {
		'numColorBars': 0,
		'personalSalt': ''
	};
	for (var setting in settings) {
		settings[setting] = prefSvc.prefs[setting];
	}
	return settings;
}