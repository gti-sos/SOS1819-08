// describe('Data is loaded', function () {
// 	it('should show a bunch of data', function (){
// 		browser.get('http://localhost:8080');
// 		var touristsByCountries = element.all(by.repeater("tourist in touristsByCountries"));
// 		expect(touristsByCountries.count()).toBeGreaterThan(0);
// 	});
// });

/*global expect browser element by*/
var fs = require("fs");
var path = require("path");

describe("Data is loaded", function() {
    it("should show initial countryStats", function() {
        browser.get('https://sos1819-08.herokuapp.com/ui/v1/tourists-by-countries/#!/').
        then(function() {
            element.all(by.repeater('tourist in touristsByCountries')).then(function(touristsByCountries) {
                browser.driver.sleep(2000);
                 browser.driver.sleep(2000);
                  browser.driver.sleep(2000);
               // console.log(countryStats);
                // browser 
                //     .takeScreenshot()
                //     .then(function(png) {
                //         var stream = fs.createWriteStream(path.join(process.cwd(), 'test', 'output', 'T01-country.png'));
                //         stream.write(new Buffer(png, 'base64'));
                //         stream.end();
                //     }); 
                expect(touristsByCountries.length).toBeGreaterThan(0);
            });
        });
    });
});