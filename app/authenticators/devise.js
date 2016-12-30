import Devise from 'ember-simple-auth/authenticators/devise';
import ENV from 'bball-yall/config/environment';
import Ember from 'ember';

export default Devise.extend({
  serverTokenEndpoint: `${ENV.APP.API_HOST}/users/sign_in`,
  invalidate(data) {
    return Ember.$.ajax({
      url: `${ENV.APP.API_HOST}/users/sign_out`,
      type: 'GET',
      data: { email: data.email, token: data.token },
    }).then(() => {
      return this._super();
    });
  },
});
