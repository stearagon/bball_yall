/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'bball-yall',
    podModulePrefix: 'bball-yall/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      API_HOST: 'https://nba-rails.herokuapp.com', //need to put actual host name
    },

    contentSecurityPolicy: {
        'connect-src': "*",
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_HOST = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

    ENV['ember-simple-auth'] = {
      routeAfterAuthentication: 'dashboard',
      routeIfAlreadyAuthenticated: 'dashboard'
    }

    ENV['torii'] = {
        sessionServiceName: 'session',
        providers: {
            twitter: {
                requestTokenUri: `${ENV.APP.API_HOST}/api/users/auth/twitter`,
            },
            facebook: {
                requestTokenUri: `${ENV.APP.API_HOST}/api/users/auth/facebook`,
            },
        }
    }
  return ENV;
};
