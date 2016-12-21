import TwitterOauthProvider from 'torii/providers/twitter-oauth1';

export default TwitterOauthProvider.extend({
  fetch: function(authorization){
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const code = JSON.parse(localStorage.getItem('ember_simple_auth:session')).authenticated.code
      if(!!code) {
        return resolve({code: code});
      } else {
        return reject();
      }
    });
  },
});
