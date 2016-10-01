import Ember from 'ember';

export default Ember.Service.extend({
    user: null,
    session: Ember.inject.service('session'),
    store: Ember.inject.service('store'),

    email: Ember.computed('user.email', function() {
        return this.get('user.email');
    }),

    init() {
        let authToken = this.get('session.data.authenticated.token');

        let user = this.get('store').queryRecord(
            'user', { 'user': { 'authentication_token': authToken } });

        this.set('user', user);
    },
});
