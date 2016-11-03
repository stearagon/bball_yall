import Ember from 'ember';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    setupController(controller) {
        controller.set('date', moment().format('YYYY-MM-DD'));
    },
});
