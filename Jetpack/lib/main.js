const dataDir = require("self").data;
const pagemod = require("page-mod");

pagemod.PageMod({
    include: "*",
    contentScriptFile: [dataDir.url("js/util.js"),dataDir.url("js/visualhash.js")]
});