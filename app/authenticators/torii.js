import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import ENV from 'bball-yall/config/environment';

export default ToriiAuthenticator.extend({
  torii: Ember.inject.service(),
  serverTokenEndpoint: `${ENV.APP.API_HOST}/users/auth/twitter`,
});
