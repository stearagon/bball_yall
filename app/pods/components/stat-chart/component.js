import Ember from 'ember';
import d3 from 'd3';
import moment from 'moment';

export default Ember.Component.extend({
    game: null,
    statsRetreiver: Ember.inject.service(),
    settingsOpen: false,
    settings: {
      height: 240,
      width: 490,
      topMargin: 10,
      rightMargin: 20,
      bottomMargin: 60,
      leftMargin: 55,
    },

    actions: {
      openSettings() {
        this.toggleProperty('settingsOpen');
      },
    },
});
