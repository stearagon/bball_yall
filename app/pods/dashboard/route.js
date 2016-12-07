import Ember from 'ember';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    queryParams: {
        date: {
            refreshModel: false,
        }
    },

    model(params) {
        const date = params.date || moment().format('YYYY-MM-DD');

        const games = this.store.query(
            'game',
            { filter: { 'date': date } }
        );

        return Ember.RSVP.hash({
            games: games,
            date: date,
        });
    },

    setupController(controller, model) {
        controller.set('date', model.date);
        controller.set('games', model.games);
    },
});
