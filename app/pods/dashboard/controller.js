import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
    currentUser: Ember.inject.service(),

    date: null,
    showGames: true,
    showDashboards: false,
    selectedGame: null,

    dashboards: Ember.computed.oneWay('currentUser.dashboards'),
    selectedDashboard: Ember.computed.oneWay('defaultDashboard'),
    defaultDashboard: Ember.computed.oneWay('currentUser.defaultDashboard'),

    actions: {
        changeDate(value) {
            this.set('date', value);

            if(moment(this.get('date')).isValid()) {
                const games = this.store.query(
                    'game',
                    { filter: { 'date': this.get('date') } }
                ).then((games) => {
                    this.set('games', games);

                    if (!Ember.isEmpty(games.content)) {
                        const gameId = games.content[0].id;

                        this.store.findRecord('game', gameId).then((game) => {
                            this.set('selectedGame', game);
                        });
                    }
                });
            }
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

