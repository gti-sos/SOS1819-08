describe('Checking if a new expense is created', function(){
    it('should show some expenses',function(){
        browser
            .get('https://sos1819-08.herokuapp.com/ui/v1/expenses-of-countries-in-education-and-culture/#!/');
               
                
                element
                .all(by.repeater("expense in expenses"))
                .then(function(initialExpenses){
                  element(by.model('country')).sendKeys('RandomCountry');
                  element(by.model('year')).sendKeys('123');
                  element(by.model('countryExpense')).sendKeys('222');
                  element(by.model('budgetPercentage')).sendKeys('333');
                  element(by.model('expensePerCapita')).sendKeys('222');
                  element(by.css('[value="add"]')).click();
                  
                  element.all(by.repeater("expense in expenses")).then(function(finalExpenses){
                  expect(finalExpenses.length).toEqual(initialExpenses.length+1);
                      
                      
                  })
                })})});