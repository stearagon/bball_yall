import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
    currentUser: Ember.inject.service(),

    date: null,
    selectedGame: null,
    showGames: true,

    games: Ember.computed('date', function() {
        if(moment(this.get('date')).isValid()) {
            return this.store.query(
                'game',
                { filter: { 'date': this.get('date') } }
            );
        }
    }),

    dashboards: Ember.computed.oneWay('currentUser.dashboards'),
    selectedDashboard: Ember.computed.oneWay('defaultDashboard'),
    defaultDashboard: Ember.computed.oneWay('currentUser.defaultDashboard'),

    actions: {
        changeDate(event) {
            this.set('date', event.target.value);
        },

        toggleGamesView() {
            this.toggleProperty('showGames');
            this.toggleProperty('showDashboards');
        },

        openGame(game) {
            this.set('showGames', false);
            this.set('selectedGame', game);
            this.set('showDashboards', true);
        },
    }
});

