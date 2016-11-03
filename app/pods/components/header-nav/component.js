import Ember from 'ember';

export default Ember.Component.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),

    actions: {
        invalidateSession() {
            this.attrs.signOut();
        }
    },
});
