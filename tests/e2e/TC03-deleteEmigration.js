describe('Checking if an emigration is deleted', function(){
    it('should show some emigrations',function(){
        browser
            .get('https://sos1819-08.herokuapp.com/#!/emigrations-by-countries/');
            
             element
                .all(by.repeater("emigration in emigrations"))
                .then(function(initialEmigrations){
                     console.log(initialEmigrations.length);
                      browser.driver.sleep(2000);
                      element.all(by.css('[value="delete"]')).last().click();
                      
                      element.all(by.repeater("emigration in emigrations"))
                .then(function(finalEmigrations){
                 expect(finalEmigrations.length).toEqual(initialEmigrations.length-1);
                    
                    
                    
                })
                })})})