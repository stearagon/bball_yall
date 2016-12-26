import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('sign-up');
  this.route('dashboard');
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    if (config.environment === 'production') {
        return ga('send', 'pageview', {
            'page': this.get('url'),
            'title': this.get('url')
        });
    }
  }.on('didTransition')
});

export default Router;
