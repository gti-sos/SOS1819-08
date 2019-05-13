describe('Checking if a new expense is created', function(){
    it('should show some expenses',function(){
        browser
            .get('https://sos1819-08.herokuapp.com/ui/v1/expenses-of-countries-in-education-and-culture/#!/');
               
                
                element
                .all(by.repeater("expense in expenses"))
                .then(function(initialExpenses){
                    console.log(initialExpenses.length);
                      browser.driver.sleep(2000);
                  element(by.model('country')).sendKeys('RandomCountry');
                  element(by.model('year')).sendKeys(parseInt(123));
                  element(by.model('countryExpense')).sendKeys(parseFloat(22));
                  element(by.model('budgetPercentage')).sendKeys(parseFloat(33));
                  element(by.model('expensePerCapita')).sendKeys(parseFloat(44));
                  element(by.css('[value="add"]')).click();
                  
                  element.all(by.repeater("expense in expenses")).then(function(finalExpenses){
                 console.log(finalExpenses.length)
                  expect(finalExpenses.length).toEqual(initialExpenses.length+1);
                      
                      
                  })
                })})});