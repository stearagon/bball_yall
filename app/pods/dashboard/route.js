import Ember from 'ember';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        const date = moment().format('YYYY-MM-DD');

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
        controller.set('date', new Date());
        controller.set('games', model.games);
    },
});
