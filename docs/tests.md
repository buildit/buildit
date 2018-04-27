# End-to-end testing with Cypress

## Run Locally
* Run the website locally with `npm run start`
* Live run the test suite with `npm run cypress:open`
* Run the tests in a headless environment with `npm run cypress:cli`
* If you're having issues with port 8080 being already in use run this command: `kill -9 $(lsof -t -i:8080)`
* Travis will invoke `npm run cypress:travis` to run the tests

## Write tests
* Create a file under ./cypress/integration/
* Label the file using this convention `<FILENAME>_spec`
* Learn more about [Cypress](https://www.cypress.io/support/)


# Accessibility testing with Pa11y CI
## Run Locally
* Run the website locally with `npm run start`
* Live run the test with `npm run pa11y`
* If you're having issues with port 8080 being already in use run this command: `kill -9 $(lsof -t -i:8080)`
* Travis will invoke `npm run pa11y:travis` to run the tests 


## Setup test runner
* Modify test runner [configuration](../.pa11yci.json)
* Learn more about [Pa11y CI](https://github.com/pa11y/pa11y-ci)