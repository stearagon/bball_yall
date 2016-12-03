import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
    actions: {
        openGame(game) {
            this.sendAction('openGame', game);
        },
    }
});
