define([
  'backbone',
  'marionette'
], function( Backbone, Marionette ) {

  return _.extend(Backbone.Marionette.Application.prototype, {
    register: function( instance, id ) {
      if (this._registry == null) {
        this._registry = {};
      }
      return this._registry[id] = instance;
    },
    unregister: function( instance, id ) {
      return delete this._registry[id];
    }
  });

});