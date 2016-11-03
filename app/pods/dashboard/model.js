import DS from 'ember-data';

export default DS.Model.extend({
    charts: DS.hasMany('chart', { async: false }),
    name: DS.attr('string'),
});
