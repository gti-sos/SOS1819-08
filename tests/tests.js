exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	chromeOnly: true,
	    capabilities: {
        'browserName': 'phantomjs',
    },

	specs: [
		"e2e/TC01-loadDataTourist.js",
		"e2e/TC02-newTourist.js",
		"e2e/TC03-deleteTourist.js"
	]
};

