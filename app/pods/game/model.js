import DS from 'ember-data';

export default DS.Model.extend({
    date: DS.attr('string'),
    awayTeam: DS.belongsTo('team', { async: true }),
    homeTeam: DS.belongsTo('team', { async: true }),
});
