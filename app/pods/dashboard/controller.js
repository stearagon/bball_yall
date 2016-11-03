import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
    currentUser: Ember.inject.service(),

    date: null,
    games: Ember.computed('date', function() {
        if(moment(this.get('date')).isValid()) {
            return this.store.query(
                'game',
                { filter: { 'date': this.get('date') } }
            ).then((games) => {
                this.set('selectedGame', games.objectAt(0));
                return games;
            });
        }
    }),

    dashboards: Ember.computed.oneWay('currentUser.dashboards'),
    selectedDashboard: Ember.computed.oneWay('defaultDashboard'),
    defaultDashboard: Ember.computed.oneWay('currentUser.defaultDashboard'),

    actions: {
        changeDate(event) {
            this.set('date', event.target.value);
        },
    }
});

