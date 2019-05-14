describe('expenses is Loaded', function(){
    it('should show some expenses',function(){
        browser
            .get('https://sos1819-08.herokuapp.com/#!/expenses-of-countries-in-education-and-culture')
            .then(function(){
                 browser.driver.sleep(2000);
                element(by.css('[value="cargaDatos"]')).click();
                 browser.driver.sleep(2000);
                  browser.driver.sleep(2000);
               
                
                element
                .all(by.repeater("expense in expenses"))
                .then(function(expenses){
                    expect(expenses.length).toBeGreaterThan(0);
                    console.log("the length of data is: "+ expenses.length);
                })})})});