import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        openGame(game) {
            this.sendAction('openGame', game);
        },
    }
});
