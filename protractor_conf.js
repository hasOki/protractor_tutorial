// An example configuration file.
exports.config = {
    // Use this for chrome 
    //chromeOnly: true,
    //chromeDriver: './node_modules/protractor/selenium/chromedriver',

    // Use this for standalone selenium server
    seleniumAddress: 'http://0.0.0.0:4444/wd/hub',
    
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['test/e2e/**/*_spec.js'],
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
