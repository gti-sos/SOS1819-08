describe('Checking if a new emigration is created', function(){
    it('should show some emigrations',function(){
        browser
            .get('https://sos1819-08.herokuapp.com/#!/emigrations-by-countries/');
               
                
                element
                .all(by.repeater("emigration in emigrations"))
                .then(function(initialEmigrations){
                    console.log(initialEmigrations.length);
                      browser.driver.sleep(2000);
                  element(by.model('newCountry.country')).sendKeys('RandomCountry');
                  element(by.model('newCountry.year')).sendKeys(parseInt(123));
                  element(by.model('newCountry.emigrantman')).sendKeys(parseInt(123));
                  element(by.model('newCountry.emigrantwoman')).sendKeys(parseInt(123));
                  element(by.model('newCountry.totalemigrant')).sendKeys(parseInt(123));
                  element(by.css('[value="add"]')).click();
                  
                  element.all(by.repeater("emigration in emigrations")).then(function(finalEmigrations){
                 console.log(finalEmigrations.length)
                  expect(finalEmigrations.length).toEqual(initialEmigrations.length+1);
                      
                      
                  })
                })})});