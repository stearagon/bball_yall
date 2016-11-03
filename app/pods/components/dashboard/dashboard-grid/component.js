import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['dashboard-grid'],
    chartType: Ember.computed('chart.dataInputs.type', function() {
        const chart = this.get('chart');

        if (chart) {
            return `stat-chart/${this.get('chart.dataInputs.type')}`;
        } else {
            return 'stat-chart/line-chart';
        }
    }),
});
