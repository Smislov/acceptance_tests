// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['disable-infobars']
    }
  },
  chromeOnly: true,
  chromeDriver: `./node_modules/webdriver-manager/selenium/chromedriver_2.35${process.platform.indexOf('win') === 0 ? '.exe' : ''}`,
  directConnect: true,
  baseUrl: 'http://10.253.129.218:8080/refdata/#/ref-data',
  framework: 'jasmine',
   jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};