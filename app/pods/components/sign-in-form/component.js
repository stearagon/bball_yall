import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),

  email: null,
  password: null,
  isLoading: false,

  actions: {
    authenticate: function() {
      this.set('isLoading', true);
      let { email, password } = this.getProperties('email', 'password');
      return this.get('session').authenticate('authenticator:devise', email, password).then(() => {
        this.set('isLoading', false);
      }, (reason) => {
        this.set('isLoading', false);
        this.set('errorMessage', reason.error);
      });
    }
  }
});
