describe("Data is loaded", function(){
    var until = protractor.ExpectedConditions;
    
     it("delete", function () {
        browser.get("http://localhost:8080/ui/v1/tourists-by-countries/#!/");
        element(by.css(".borrar0")).click();
        var resultModal = element(by.id('alert-success'));
        browser.wait(until.visibilityOf(resultModal), 5000, "Message should appear within 5 seconds");
        expect(resultModal.getText()).toContain('Borrado Correctamente');
    });
});
