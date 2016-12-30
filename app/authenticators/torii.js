import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import ENV from 'bball-yall/config/environment';
import Ember from 'ember';

export default ToriiAuthenticator.extend({
  torii: Ember.inject.service(),
  invalidate(data) {
    const dataSplit = data.code.split(',');
    const email = dataSplit[1];
    const token = dataSplit[0];
    return Ember.$.ajax({
      url: `${ENV.APP.API_HOST}/users/sign_out`,
      type: 'GET',
      data: { email: email, token: token },
    }).then(() => {
      return this._super();
    });
  },
});
