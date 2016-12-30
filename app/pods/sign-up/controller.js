import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  email: null,
  password: '',
  passwordConfirm: '',
  isLoading: false,
  serverError: null,

  passwordMatch: Ember.computed('password', 'passwordConfirm', function() {
    const password = this.get('password');
    const passwordConfirm = this.get('passwordConfirm');

    if (!Ember.isEmpty(password) && !Ember.isEmpty(passwordConfirm)) {
      return password === passwordConfirm;
    }

    return true;
  }),

  allowFormSubmission: Ember.computed('password', 'passowrdConfirm', 'email', 'passwordMatch', function() {
    if (!Ember.isEmpty('password') && !Ember.isEmpty('passwordConfirm') && this.get('passwordMatch') && !Ember.isEmpty('email')) {
      return true;
    } else {
      return false;
    }
  }),

  actions: {
    signUp: function() {
      event.preventDefault();
      const userParams = this.getProperties('email', 'password');
      const user = this.store.createRecord('user', userParams);
      this.set('isLoading', true);

      return user.save().then(() => {
        return this.get('session').authenticate('authenticator:devise', userParams.email, userParams.password).then(() => {
          this.set('isLoading', false);
          this.transitionToRoute('dashboard');
        });
      }, (error) => {
        this.set('serverError', error.errors);
      });
    },
  }
});
