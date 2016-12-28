import Devise from 'ember-simple-auth/authorizers/devise';
import Ember from 'ember';
const { isEmpty } = Ember;

export default Devise.extend({
    authorize(data, block) {
        let authData;
        if (['twitter', 'facebook', 'google', 'github'].includes(data.provider) && data['code']) {
          var authInfo = data['code'].split(',');
          var code = authInfo[0];
          var email = authInfo[1];

          if (!isEmpty(code)) {
              authData = 'token="' + code + '", email="' + email + '"';
              block('Authorization', 'Token ' + authData);
          }
        } else {
          var _getProperties = this.getProperties('tokenAttributeName', 'identificationAttributeName');

          var tokenAttributeName = _getProperties.tokenAttributeName;
          var identificationAttributeName = _getProperties.identificationAttributeName;

          var userToken = data[tokenAttributeName];
          var userIdentification = data[identificationAttributeName];

          if (!isEmpty(userToken) && !isEmpty(userIdentification)) {
              authData = tokenAttributeName + '="' + userToken + '", ' + identificationAttributeName + '="' + userIdentification + '"';
              block('Authorization', 'Token ' + authData);
          }
        }
    },
});
