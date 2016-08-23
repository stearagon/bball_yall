import Devise from 'ember-simple-auth/authenticators/devise';
import ENV from 'bball-yall/config/environment';

export default Devise.extend({
  serverTokenEndpoint: `${ENV.APP.API_HOST}/users/sign_in`,
});
