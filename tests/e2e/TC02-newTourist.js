describe("Check if a new sport center can be created",function () {
    it("List should grow after the contact creation", function (){
        browser.get("localhost:8080/ui/v1/tourists-by-countries/#!/");
        
                element(by.model('id')).sendKeys('22');
                element(by.model('country')).sendKeys('Tarfia');
                element(by.model('year')).sendKeys('2000');
                element(by.model('touristDeparture')).sendKeys('41012');
                element(by.model('arrivalTourist')).sendKeys('1989');
                element(by.model('incomeTourist')).sendKeys('4000');

                element(by.css(".boton-crear")).click();
                
                var resultModal = element(by.css(".alert-success"));
                expect(resultModal.getText()).toContain('Creado correctamente');

            });
    });


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