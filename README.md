# Main Street Hub UI Boilerplate
This is the front-end starting point for all applications at Main Street Hub.

## Batteries Included
* [React](https://facebook.github.io/react/docs/getting-started.html) for rendering
* [Redux](http://redux.js.org/) for application state
* [SuperAgent](https://github.com/visionmedia/superagent) for AJAX calls
* [Mocha](https://mochajs.org/) is our test harness
* [Expect](https://github.com/mjackson/expect) is our assertion library
* [Enzyme](https://github.com/airbnb/enzyme) to help with testing React components
* [Webpack](https://github.com/webpack/webpack) for bundling our app

## Setup Locally
For initial setup, the repository needs to be forked and cloned, and dependencies need to be install using npm (package manager). To do so, visit the github repository page and fork the repo. Once forked, run the following commands:

```bash
git clone https://github.com/YOUR_USER_NAME/ui-boilerplate.git
cd ui-boilerplate
npm install
```

## Development
We use npm as our task manager and webpack for our bundling and dev testing.  To run the app in development, use the following command:

```bash
npm start
```

The application will be accessible at http://localhost:3000/. Changes will automatically load in once saved.

## Testing
Tests are located alongside their source code with the suffix `.test.js`.  Most components can be tested with [shallow rendering](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md), which isolates the component to just itself and its immediate children and is the recommended way to test.

Before submitting a pull request, make sure your change passes tests and linting.  You can invoke the tests and linter with:

```bash
npm test
```

Tests and linting can both be run in "watch" mode, rerunning when a file changes:

```bash
npm run test:watch
```

```bash
npm run lint:watch
```

## Deployment
For deployment, we bundle our application into four distinct parts:

* `app.[hash].js` - The application JavaScript we write
* `vendor.[hash].js` - The external JavaScript libraries we depend on
* `styles.[hash].css` - The css file for our application
* `index.html` - The basic HTML we need to house our JavaScript app

To generate a `dist` folder ready for deployment, run:

```bash
npm run build
```

This will generate the above files, plus source map files for the JavaScript and CSS files.
