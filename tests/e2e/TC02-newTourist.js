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


