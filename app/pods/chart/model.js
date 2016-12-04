import DS from 'ember-data';

export default DS.Model.extend({
    dataInputs: DS.attr('object'),
    chartType: Ember.computed('dataInputs', function() {
        return `stat-chart/${this.get('dataInputs.type')}`;
    }),
});
