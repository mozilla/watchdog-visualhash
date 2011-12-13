const dataDir = require("self").data;
const pageWorker = require("page-worker");
const panel = require("panel");

exports.test_Visual_Hash_Dynamic = function(test) {
    var testWorker = pageWorker.Page({
      contentURL: dataDir.url('test/js_loaded_test.html'),
      contentScriptFile: [dataDir.url('js/util.js'),dataDir.url("js/visualhash.js"),dataDir.url("test/js/js_loaded_test.js")],
      contentScriptWhen: "end",
      onMessage: function(message) {
        if (message.type == 'readyForTest') {
            testWorker.port.emit('typeText', {});
        }
		else if (message.type == 'visualHash') {
			if (message.value)
	            test.pass();
			else
				test.fail();
            test.done();
		}
      }
    });
    
   test.waitUntilDone(20000); 
};

exports.test_Visual_Hash = function(test) {
    var TestPanel = panel.Panel({
        contentScriptFile: dataDir.url('js/util.js'),
        contentScript: "self.postMessage({hash: SHA1('test'), randomizedHash: randomizeHash(SHA1('test'))});",
        width:500,
        onMessage: function(msg) {
            // Colors are randomized slightly. Are they within range?
            for (var hashIdx = 0; hashIdx < msg.hash.length/2; hashIdx++) {
                var hashByteVal = parseInt(msg.hash.substr(hashIdx*2,2),16);
                var randomHashByteVal = parseInt(msg.randomizedHash.substr(hashIdx*2,2),16);
                if (Math.abs(hashByteVal - randomHashByteVal) > 7) {
                    test.fail('Random hash not in range!');
                    test.done();
                    return;                    
                }
            }
            test.pass();
            test.done();
        }
    });
   
   test.waitUntilDone(20000); 
};

exports.test_SHA1 = function(test) {
    
    var TestPanel = panel.Panel({
        contentScriptFile: dataDir.url('js/util.js'),
        contentScript: "self.postMessage(SHA1('test'));",
        width:500,
        onMessage: function(sha1) {
            test.assertEqual(sha1,'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
            test.done();
        }
    });

    test.waitUntilDone(20000);
};