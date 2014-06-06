Protractor Tutorial
===================

Protractor is a E2E testing using Selenium. It will test using black box and deisgn to simulate end user web page access perspective. Functionality of the page element and workflow of the application is the crucial part of the testing.

##Why Protractor
Protractor is a match made in heaven for AngularJS. Besides having the selenium dom targeting capaability, it also has capability to select element based on the Angular binding attributes ( e.g. ng-model, )

##Installation
You can install the protractor as global stand alone app using 
	
	$ npm -g install protractor
	
or locally
	
	$ npm install protractor 

Protractor also require a webdriver to run it's testing, you will have 2 server running, one for your web application and the other one for selenium.
Depending on your protractor installation you can either access your webdriver-manager inside your project `node_modules/` to run this command:

	$ ./node_modules/protractor/bin/webdriver-manager update
	
The script will download the files that needed to run Selenium. After download you can test if the webdriver properly downloaded and installed by typing:

	$ ./node_modules/protractor/bin/webdriver-manager start
	
##Configuration
You can get the sample configuration file from inside protractor example folder, you can copy it as your base configuration.

	$ cp ./node_modules/protractor/example/chromeOnlyCOnf.js protractor_conf.js
	
For more available configuration options you can acceess this file `./node_modules/protractor/referenceConf.js`


##Running Your First Test


##Writing Your First Test


##Protractor Cheat Sheet

###Global Variables
- [browser](): push location to the test browser
- [element](): select the DOM element
- [by](): selector helper ( you can select by model, id, class etc. )
- [prtrotractor]():  


###Selector

####Generic Selector


####AngularJS Selector


##More Settings
###Testing Against Multiple Browser
If you are feeling confident with your code and want to test it against multiple browser you can set it up using:

	multiCapabilities: [{
  		'browserName': 'firefox'
	}, {
  		'browserName': 'chrome'
	}]
	
You can also pass chrome-specific option by passing it as `chromeOptions` property:

	capabilities: {
  		'browserName': 'chrome',
  		'chromeOptions': {
    		'args': ['show-fps-counter=true']
  		}
	},



###Taking Web Page Snapshots
If you want to take a _selfie_ of your website you can do it using `browser.takeScreenshot()`.

Here is the sample usage:
	
	// at the top of the test spec:
	var fs = require('fs');

	// ... other code

	// abstract writing screen shot to a file
	function writeScreenShot(data, filename) {
    	var stream = fs.createWriteStream(filename);

    	stream.write(new Buffer(data, 'base64'));
    	stream.end();
	}

	// ...

	// within a test:
	browser.takeScreenshot().then(function (png) {
    	writeScreenShot(png, 'exception.png');
	});


##Additional Reading

- [Introduction to Protractor](https://docs.google.com/a/hasoffers.com/file/d/0BwDWzYJ-4RpAQnNRLXM3QVFPMjg/edit) - Highlevel overview of Functional Test ( E2E Testing ) and how Protractor can help you to do that.
- [Practical Protractor Tutorial](http://www.ng-newsletter.com/posts/practical-protractor.html) - Zero to somewhat-ProtractorHero in one page, I am using example from this resource to write this tutorial.
- [Egghead Tutorial](https://egghead.io/series/learn-protractor-testing-for-angularjs) - Fast and easy tutorial about protractor, only 9:16 long.
- [bonus video](http://www.sophia.org/tutorials/measuring-angles-with-a-protractor--4) - This is not that kind _protractor_ tutorial.
