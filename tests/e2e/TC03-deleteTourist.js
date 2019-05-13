describe('Checking if an Tourist is deleted', function() {
    it('should show some Tourist', function() {
        browser
            .get('https://sos1819-08.herokuapp.com/ui/v1/tourists-by-countries/#!');

        element
            .all(by.repeater("tourist in touristsByCountries"))
            .then(function(initialTourist) {
                console.log(initialTourist.length);
                browser.driver.sleep(2000);
                element.all(by.css('[value="borrar"]')).last().click();

                element.all(by.repeater("tourist in touristsByCountries"))
                    .then(function(finalTourist) {
                        expect(finalTourist.length).toEqual(initialTourist.length - 1);

                    });
            });
    });
});
