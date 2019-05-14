describe('Checking if a new tourist is created', function() {
    it('should show some tourist', function() {
        browser
            .get('https://sos1819-08.herokuapp.com/#!/tourists-by-countries/');


        element
            .all(by.repeater("tourist in touristsByCountries"))
            .then(function(initialTourist) {
                browser.driver.sleep(2000);
                element(by.model('country')).sendKeys('Sevilla');
                element(by.model('year')).sendKeys('2000');
                element(by.model('touristDeparture')).sendKeys('41012');
                element(by.model('arrivalTourist')).sendKeys('1989');
                element(by.model('incomeTourist')).sendKeys('4000');
                element(by.css('[value="add"]')).click();

                element.all(by.repeater("tourist in touristsByCountries")).then(function(finalTourist) {
                    expect(finalTourist.length).toEqual(initialTourist.length + 1);



                });
            });
    });
});
