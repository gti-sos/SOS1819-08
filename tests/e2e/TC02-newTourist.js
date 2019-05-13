describe('Checking if a new expense is created', function() {
    it('should show some expenses', function() {
        browser
            .get('http://localhost:8080/ui/v1/tourists-by-countries/#!/');


        element
            .all(by.repeater("tourist in touristsByCountries"))
            .then(function(initialTourist) {

                element(by.model('country')).sendKeys('RandomCountry');
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
