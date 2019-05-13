exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	chromeOnly: true,
	specs: [
		"e2e/TC01-loadDataTourist.js",
		"e2e/TC02-newTourist.js"
//		"e2e/TC03-deleteTourist.js"
	]
	// capabilities:{
	// 	'browserName': 'phantomjs'
	// },
	// params:{
	// 	host:'localhost',
	// 	port: '8080'
	// }
};
// export.getURL = function(){
// 	return "http://"+browser.params.host+":"+browser.params.port;

