module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000/',//You Can change base URL here
    browser: 'chrome',
    specPattern: [
      'cypress/e2e/userApiTest.spec.js',
      'cypress/e2e/postApiTest.spec.js',
    ],
    
    "chromeWebSecurity": false,
    autoOpen: true,
    testIsolation: false,
    video: true// Enable video recording
    

  }
};


