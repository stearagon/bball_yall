import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'bball-yall/config/environment';
import Ember from 'ember';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:devise',

    namespace: 'api',

    host: ENV.APP.API_HOST,
    coalesceFindRequests: true,
    pathForType(type) {
        return Ember.String.underscore(Ember.Inflector.inflector.pluralize(type));
    },

    sortQueryParams(obj) {
        var keys = Object.keys(obj);
        var len = keys.length;
        if (len < 2) {
            const queryParams = {};
            const queryObj = obj[keys[0]];
            const queryObjKeys = Object.keys(queryObj);
            for (var i = 0; i < queryObjKeys.length; i++) {
                queryParams[Ember.String.underscore(queryObjKeys[i])] = queryObj[queryObjKeys[i]];
            }
            obj[keys[0]] = queryParams;
            return obj;
        }
        var newQueryParams = {};
        var sortedKeys = keys.sort();

        for (var k = 0; k < len; k++) {
            newQueryParams[Ember.String.undercore(sortedKeys[k])] = obj[sortedKeys[k]];
        }

        return newQueryParams;
    },
});
