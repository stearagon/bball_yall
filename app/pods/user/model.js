import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr('string'),
    dashboards: DS.hasMany('dashboard', { async: true }),
    defaultDashboard: DS.belongsTo('dashboard', { async: true }),
    password: DS.attr('string'),
});
