import DS from 'ember-data';

export default DS.Model.extend({
    city: DS.attr('string'),
    mascot: DS.attr('string'),
});
