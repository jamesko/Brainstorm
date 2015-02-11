#Brainstorming app

This app is built to make the process of brainstorming and idea sharing within Hack Reactor easier

It leverages React, Flux, and Socket.io to create a truly seamless user and responsive user experience

##Team

  - __Original Development Team Members__: Bree DeWoody, Dmitri Rabinowitz, Gunnari Auvinen, Jason Deppen
  - __Legacy Development Team Members__: Julie Knowles, Pat Lauer, Rory Campbell

##Roadmap

View the project roadmap/issues [here](https://waffle.io/kitchencooks/brainstorm)

##Interested in Contributing?

Please review [CONTRIBUTING.md](CONTRIBUTING.md)

###App Gulp Tasks

serve index.js with nodemon (page will reload on server and client files changes)

`gulp`

run *client side* tests automatically whenever files change

`gulp karma-auto`

run server side tests one time

`npm test`

set up automatic jsx compiling on save:

first install react tools if you have not already (may need to run as sudo)

`npm install -g react-tools`

then run from the root of the application

`gulp jsx-auto`

## Development

### Installing Dependencies

1. Run npm and bower install

From within the root directory:

```sh
npm install -g react-tools
npm install
bower install
```

2. Gulp tasks

```sh
gulp jsx-auto
```

To build JSX

```sh
gulp
```

To server assets and launch on localhost:3000

3. Acquire correct github credentials by registering your app [here](https://github.com/settings/applications). Make sure to get your client_id and client_secret. For working in development set your homepage url as: `http://127.0.0.1:3000`. Set your authorization callback url as: `http://localhost:3000/auth/callback`

4. Create a config.js file in /server/config with the following contents:
```sh
var config = {
  clientID: "FILL_ME_IN",
  clientSecret: "FILL_ME_IN",
  callbackURL: 'http://localhost:3000/auth/callback'
};
module.exports = config;
```
