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
                    homeTeamId: get(game, 'homeTeam.id'),
                    awayTeamId: get(game, 'awayTeam.id'),
                    date: get(game, 'date'),
                    dataInputs: dataInputs,
                }
            }
        );
    },
});
