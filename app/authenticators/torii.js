import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import Ember from 'ember';

export default ToriiAuthenticator.extend({
  torii: Ember.inject.service(),
});
