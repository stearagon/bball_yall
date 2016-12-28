import Ember from 'ember';

const { get, set } = Ember;

export default Ember.Service.extend({
    user: null,
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    dashboards: Ember.computed.oneWay('user.dashboards'),
    email: Ember.computed.oneWay('user.email'),

    defaultDashboard: Ember.computed.oneWay('user.defaultDashboard'),

    init() {
        let email;
        const data = get(this, 'session.data');

        if (['twitter', 'facebook', 'google', 'github'].includes(data.authenticated.provider)) {
            var authInfo = data.authenticated.code.split(',');
            email = authInfo[1];
        } else {
            email = data.authenticated.email;
        }
        const user = get(this,'store').queryRecord(
            'user', { filter: { 'email': email } });

        set(this, 'user', user);
    },
});
