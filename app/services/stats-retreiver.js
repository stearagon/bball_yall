import Ember from 'ember';

const { get } = Ember;

export default Ember.Service.extend({
    data: null,
    store: Ember.inject.service(),

    getData(game, dataInputs) {
        const store = this.get('store');

        return store.query(
            'statLine',
            {
                filter: {
                    homeTeamId: game.get('homeTeam.id'),
                    awayTeamId: game.get('awayTeam.id'),
                    date: game.get('date'),
                    dataInputs: dataInputs,
                }
            }
        );
    },
});
