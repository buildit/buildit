# Buildit website

This is the source code for the Buildit website: [https://buildit.wiprodigital.com/](https://buildit.wiprodigital.com/)

To provide feedback, raise bugs or request features, please use our [Buildit website feedback form](https://docs.google.com/forms/d/e/1FAIpQLScOeoF7XfYYs3R8b9K_zvSY0oVS92hAV82FXUOyy8JnDz2lNg/viewform).

If you want to get involved in the development of this website, then please see our [contribution guidelines](./CONTRIBUTING.md).

## Requirements

Node v8.10.0 or higher is required.

If you use [NVM](https://github.com/creationix/nvm) for managing Node, you can just issue the following command to install the right node version

    $ nvm install

and before running any other npm command, run

    $ nvm use


## Build and development

There are three ways to build and run the website:

| Script | Description |
|:--|:--|
| `npm run build` | Generates a minified local build |
| `npm run start` | Generates a minified local build and a local server instance |
| `npm run dev` | Generates a non minified local build and a local server instance |

Local hosting is at http://localhost:8080 and a browser window should open automatically.

Distribution goes into `./dist`.

Refer to the [build process](./docs/build-process.md) document for further details on all the tasks the build performs.

### Committing

All commits should be made with [Commitizen](https://github.com/commitizen/cz-cli). To make your commits with it 
simply run the following command.
 
`npm run commit`
 
Failure to format your commits properly will result in a rejected PR and/or failed cloud builds.

### Environments

Some of the files produced by the build, for example `sitemap.xml`, need to contain the website's absolute URL. Others, such as `robots.txt`, need to have different contents depending on where the build will be deployed to (so that we can prevent search engines indexing our staging environments).

To facilitate this, multiple environments can be defined in the `envs` section of [`config.json`](./config.json). Both the `npm start` and `npm run-script build` commands support an additional `--env` argument which takes the name of the desired environment for that build as its parameter (note that you need to proceed it with `--` so that `npm` passes that argument through to the underlying build script). For example:

    $ npm run-script build -- --env production

Where `production` corresponds to the key of the desired environment defined in `config.json`:

```js
{
  // ...
  "envs": {

    "production": {

      // The absolute URL that this site is deployed to
      "url": "https://buildit.foo.bar",

      // Whether or not search engine bots should be
      // prevented from indexing this site
      "excludeRobots": true

    },

    "other-env": {
      // ...
    },
    // ...
  },
  // ...
}
```

If no `--env` argument is provided to the builds, then the first environment defined in `config.json` will be used.

## Branches

For complete info see our [branching strategy docs](./docs/branching-strategy.md). The basic premise is that `master` is always correct and deployed, `develop` is used for creating feature branches and to then merge in to `master`. `next` is "special" and is used to build and test the _next_ big version of the app.

## Deployment

The app will auto-deploy to [production](https://buildit.wiprodigital.com/) using Travis with every passing merge to `master`.

It will also auto-deploy to the [`next` environment](www-next.buildit.digital/) with every passing merge to the `next` branch.

## More information

### General
* [Contribution guidelines](./CONTRIBUTING.md)
* [Coding standards](./docs/coding-standards.md)
* [Branching strategy](./docs/branching-strategy.md)
* [Testing](./docs/tests.md)
* [Build process](./docs/build-process.md)
* [Build and deploy pipeline](./docs/build-deploy-pipeline.md)

### Design
* [Flourish design elements](./docs/flourishes.md) to use, extend or create the flourish component

### Website technologies
Behind the scenes the website is using the following technologies, so be sure you know what you're doing before starting to change anything.

* [Metalsmith](http://metalsmith.io) for the core of the website,
* [HandlebarJS](https://handlebarsjs.com/) as templating engine,
* [`SCSS`](http://sass-lang.com/), with the addition of
  * [autoprefixer](https://github.com/postcss/autoprefixer)
  * [csso](https://github.com/css/csso)
  * [eyeglass](https://github.com/sass-eyeglass/eyeglass)
* [Cypress](./docs/tests.md), for end-to-end testing
* [Pa11y-CI](./docs/tests.md), for automated accessibility

### Decisions
Decisions linked to implementation details, have not been catalogued. Many of those decisions are now lost.  
Therefore, although late, we have decided to start logging all new decisions. These decisions will now be catalogued in the [Decision Log](./docs/DECISIONLOG.md)
