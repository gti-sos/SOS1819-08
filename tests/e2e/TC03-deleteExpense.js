describe('Checking if an expense is deleted', function(){
    it('should show some expenses',function(){
        browser
            .get('https://sos1819-08.herokuapp.com/#!/expenses-of-countries-in-education-and-culture/');
            
             element
                .all(by.repeater("expense in expenses"))
                .then(function(initialExpenses){
                     console.log("data before delete: "+initialExpenses.length);
                      browser.driver.sleep(2000);
                      element.all(by.css('[value="delete"]')).last().click();
                      
                      element.all(by.repeater("expense in expenses"))
                .then(function(finalExpenses){
                    console.log("final data :"+finalExpenses.length);
                 expect(finalExpenses.length).toEqual(initialExpenses.length-1);
                    
                    
                    
                });
                 browser.driver.sleep(2000);
                  browser.driver.sleep(2000);
                    browser.driver.sleep(2000);
                  element(by.css('[value="deleteAll"]')).click();
                })})})