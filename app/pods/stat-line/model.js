import DS from 'ember-data';

export default DS.Model.extend({
    value: DS.attr('number'),
    date: DS.attr('string'),
    teamId: DS.attr('number'),
    gameId: DS.attr('number'),
});
