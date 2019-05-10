describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('http://localhost:8080');
		var tourists = element.all(by.repeater('tourist in touristsByCountries'));
		expect(tourists.count()).toBeGreaterThan(0);
	});
});