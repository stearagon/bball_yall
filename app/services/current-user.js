import Ember from 'ember';

const { get } = Ember;

export default Ember.Service.extend({
    user: null,
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    dashboards: Ember.computed.oneWay('user.dashboards'),
    email: Ember.computed.oneWay('user.email'),

    defaultDashboard: Ember.computed.oneWay('user.defaultDashboard'),

    init() {
        let email = this.get('session.data.authenticated.email');

        let user = this.get('store').queryRecord(
            'user', { filter: { 'email': email } });

        this.set('user', user);
    },
});
