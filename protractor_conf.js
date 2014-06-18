// An example configuration file.
exports.config = {
  // SauceLab Login, using hasOki sauceKey, need to create hasOffer generic account
  sauceUser        : 'hasOki',
  sauceKey         : '662e909a-e63a-4265-ab11-82f2b713de51',

  // Use this for chrome
  //chromeOnly: true,
  //chromeDriver: './node_modules/protractor/selenium/chromedriver',

  // Use this for standalone selenium server
  seleniumAddress: 'http://0.0.0.0:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities   : {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs          : ['test/e2e/**/*_spec.js'],
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors            : true,
    isVerbose             : true,
    defaultTimeoutInterval: 30000
  }
};
