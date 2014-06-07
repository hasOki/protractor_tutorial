Protractor Tutorial
===================

Protractor is a E2E testing using Selenium. It will test using black box and 
design to simulate end user web page access perspective. Functionality of the page 
element and work flow of the application is the crucial part of the testing.


##Why Protractor
Protractor is a match made in heaven for AngularJS. Besides having the selenium 
DOM targeting capability, it also has capability to select element based on the 
Angular binding attributes ( e.g. ng-model, )

##Installation
You can install the protractor as global stand alone app using 
	
	$ npm -g install protractor
	
or locally
	
	$ npm install protractor 

Protractor also require a webdriver to run it's testing, luckyly Protractor comes 
with the webdriver-manager to download the necessary browser driver file. 
Depending on your protractor installation you can either access your 
webdriver-manager inside your project `node_modules/` to run this command:

	$ ./node_modules/protractor/bin/webdriver-manager update
	
The script will download the files that needed to run Selenium. After download you 
can test if the webdriver properly downloaded and installed by typing:

	$ ./node_modules/protractor/bin/webdriver-manager start

Once you have it running without error you already to do your testing.
	
##Configuration
Protractor receive one input file as their config file to start testing.
You can get the sample configuration file from inside protractor example folder, 
you can copy it as your base configuration.

	$ cp ./node_modules/protractor/example/chromeOnlyConf.js protractor_conf.js
	
Here is the sample config 
	
For more available configuration options you can access this file 
`./node_modules/protractor/referenceConf.js`

##Running Your First Test
In your terminal, you will need to run 3 things: 
- `webdriver-manager`
  Protractor comes with
- your web server that you want to test 
( in this tutorial I run it using `grunt serve` )
- 'protractor'

I am using [tmux](http://tmux.sourceforge.net/) to manage my terminal instances like this:

![terminal window](images/terminal_screenshot.png)


##Writing Your First Test
###Basic Testing

// insert sample test code here


###Steping Up A Notch
As you can see from the code above, you can pile a bunch of page testing in one 
testing config file. 
It will grow nasty pretty quick and become unreadable. Another way to manage the 
the test case is by separating the selector and test into separate class.

```
function IndexPage() {
  this.button = element(by.id('button1'));
  this.message = element(by.binding('messageText'));

  this.get = function () {
	browser.get('/#');
  };

  this.clickButton = function () {
	this.button.click();
  };

  this.getTitle = function () {
	return browser.getTitle();
  };

  this.getMessageText = function () {
	return this.message.getText();
  }
}

module.exports = IndexPage;
```

And in the main spec file you import the class in

```
var IndexPage = require('./IndexPage');

describe("hello-protractor", function () {

  //Create the object from the imported class
  var page = new IndexPage();

  beforeEach(function() {
      // Call the testing you define in the class 
      page.get();
  });

  describe("index", function () {
    it("should display the correct title", function () {
    	// Another test from the class
      	expect(page.getTitle()).toBe('hello protractor');
    });

    it("should display the message when button clicked", function () {
  		// Testing the click button by calling the function in the class
      	page.clickButton();

      	expect(page.getMessageText()).toBe('button 1 clicked');
    });
  });
});
```

##Protractor Cheat Sheet

###Global Variables
- [browser](): push location to the test browser
- [element](): select the DOM element
- [by](): selector helper ( you can select by model, id, class etc. )
- [protractor]():   


###Selector

####Generic Selector


####AngularJS Selector


##More Settings
###Testing Against Multiple Browser
If you are feeling confident with your code and want to test it against multiple 
browser you can set it up using:

```
multiCapabilities: [{
 	'browserName': 'firefox'
}, {
 	'browserName': 'chrome'
}]
```

You can also pass chrome-specific option by passing it as `chromeOptions` property:

```
capabilities: {
  	'browserName': 'chrome',
  	'chromeOptions': {
		'args': ['show-fps-counter=true']
  	}
},
```


###Taking Web Page Snapshots
If you want to take a _selfie_ of your website you can do it using 
`browser.takeScreenshot()`.

Here is the sample usage:

```
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
```

##Automate With Grunt
To make your life easier, you can get `grunt-protractor-runner` and you can add 
the protractor section in your `Gruntfile.js` 

```
protractor: {
    options: {
          configFile: "protractor-config.js”, //your protractor config file
          keepAlive: true, // If false, the grunt process stops when the test fails.
          noColor: false, // If true, protractor will not use colors in its output.
          args: {
              // Arguments passed to the command
          }
      },
    chrome: {
        options: {
              args: {
                  browser: "chrome"
              }
          }
    },
    safari: {
        options: {
            args: {
                browser: "safari"
            }
        }
    },
    firefox: {
        options: {
            args: {
                browser: "firefox"
            }
        }
    }
}
```

You can then run the test individually or better yet you can run it concurrently 
using `grunt-parallel`.
Install the concurrent plug-in in your project root directory using:

	$ npm install grunt-concurrent --save-dev

Register each browser test as separate test

```
grunt.registerTask('protractor-chrome', ['protractor:chrome']);
grunt.registerTask('protractor-safari', ['protractor:safari']);
grunt.registerTask('protractor-firefox', ['protractor:firefox']);
```

Call the registered tasks inside the concurrent settings:

```
concurrent:{
	protractor_test: ['protractor-chrome', 'protractor-safari', 'protractor-firefox']
}
```

Add a new task in your `Gruntfile.js`

```
grunt.registerTask('protractor-e2e', ['concurrent:protractor_test']);
```

Now you can call the protractor test easily using `grunt protractor-e2e` and all 
of 3 browser will run the test concurrently.

###But, there is more ... 
You can even add the task inside the watch list, so every time you change the test 
case / code, the testing will be triggered automatically, but use it with caution.
Install the watch plug in, if you have not already, using
	
	$ npm install grunt-contrib-watch --save-dev
	
and add the e2e settings inside the `watch`section:

```
e2eTest: {
	files: ['e2e/{,*/}*.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js',
            '<%= yeoman.app %>/{,*/}*.html',
                '.tmp/styles/{,*/}*.css',
                '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'],
        tasks: ['protractor-e2e']
      }
```

and **BOOM** ... _Awesome-Sauce_ ...

  
##Additional Reading

- [Introduction to Protractor] (https://docs.google.com/a/hasoffers.com/file/d/0BwDWzYJ-4RpAQnNRLXM3QVFPMjg/edit) - Highlevel overview of Functional Test ( E2E Testing ) and how Protractor can help you to do that.
- [Practical Protractor Tutorial](http://www.ng-newsletter.com/posts/practical-protractor.html) - Zero to somewhat-ProtractorHero in one page, I am using example from this resource to write this tutorial.
- [Protractor for AngularJS](http://ramonvictor.github.io/protractor/slides) - Great slide presentation by Ramon Victor about protractor, longer than the previous tutorial but totally worth reading.
- [Egghead Tutorial](https://egghead.io/series/learn-protractor-testing-for-angularjs) - Fast and easy tutorial about protractor, only 9:16 long.
- [Protractor API](https://github.com/angular/protractor/blob/master/docs/api.md) - List of protractor available functions.
- [bonus video](http://www.sophia.org/tutorials/measuring-angles-with-a-protractor--4) - This is not that kind of _protractor_ tutorial.
