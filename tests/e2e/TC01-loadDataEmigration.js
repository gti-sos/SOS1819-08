describe('emigrations is Loaded', function(){
    it('should show some emigrations',function(){
        browser
            .get('https://sos1819-08.herokuapp.com/ui/v1/emigrations-by-countries/#!/')
            .then(function(){
                 browser.driver.sleep(2000);
                 browser.driver.sleep(2000);
                 browser.driver.sleep(2000);
               
                
                element
                .all(by.repeater("emigration in emigrations"))
                .then(function(emigrations){
                    expect(emigrations.length).toBeGreaterThan(0);
                })})})});