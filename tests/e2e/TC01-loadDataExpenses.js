describe('expenses is Loaded', function(){
    it('should show some expenses',function(){
        browser
            .get('https://sos1819-08.herokuapp.com/ui/v1/expenses-of-countries-in-education-and-culture/#!/')
            .then(function(){
                 browser.driver.sleep(2000);
                 browser.driver.sleep(2000);
                  browser.driver.sleep(2000);
               
                
                element
                .all(by.repeater("expense in expenses"))
                .then(function(expenses){
                    expect(expenses.length).toBeGreaterThan(0);
                })})})});