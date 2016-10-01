import Ember from 'ember';

export default Ember.Component.extend({
    currentUser: Ember.inject.service('currentUser'),
    session: Ember.inject.service('session'),

    actions: {
        invalidateSession() {
            this.attrs.signOut();
        }
    },
});
