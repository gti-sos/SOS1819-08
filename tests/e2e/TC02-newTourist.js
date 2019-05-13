describe('Add Stadistic', function() {
    it('should add a new medical Attention Rate', function() {
        browser
            .get('https://sos1819-08.herokuapp.com/ui/v1/tourists-by-countries/#!/')
            .then(function() {
                element
                    .all(by.repeater("tourist in touristsByCountries"))
                    .then(function(initialTourist) {
                        browser.driver.sleep(2000);

                        element(by.model('newTourist.country')).sendKeys('sevilla');
                        console.log("country")
                        element(by.model('newTourist.year')).sendKeys(parseInt(2020));
                        console.log("year")
                        element(by.model('newTourist[' + "'touristDeparture'" + ']')).sendKeys(parseInt(22));
                        console.log("touristDeparture")
                        element(by.model('newTourist[' + "'arrivalTourist" + ']')).sendKeys(parseInt(16));
                        console.log("arrivalTourist")
                        element(by.model('newTourist[' + "'incomeTourist'" + ']')).sendKeys(parseInt(14));
                        console.log("incomeTourist")
                     
                        element(by.buttonText('Add')).click().then(function() {
                            element.all(by.repeater('tourist in touristsByCountries')).then(function(touristsByCountries) {
                                console.log(touristsByCountries.length)


                               
                                expect(touristsByCountries.length).toEqual(initialTourist.length + 1);
                            });

                        });




                    });
            });

    });
});