describe( 'E2E: main page', function(){
    var ptor;

    beforeEach( function(){
        browser.get('http://127.0.0.1:9000');
        ptor = protractor.getInstance();
    });

    it('it should load the home page', function(){
        var ele = by.id('home');
        expect(ptor.isElementPresent(ele)).toBe(true);
    });

    it('the input box should go away on submit', function(){
        element(by.input('item.name')).sendKeys('Testing Input');
        element(by.partialButtonText('THE THING')).sendKeys('\n');
        expect(ptor.isElementPresent(by.input('item.name'))).toBe(false);
    });
});