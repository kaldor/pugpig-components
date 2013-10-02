define([
  'app'
], function ( App ) {

  App.module( 'Controllers', function( Controllers, App, Backbone, Marionette, $, _ ) {

    Controllers.Base = Marionette.Controller.extend({
      constructor: function( options ) {
        Marionette.Controller.prototype.constructor.call( this, options );
        this._instance_id = _.uniqueId( 'controller' );
        App.execute( 'register:instance', this, this._instance_id );
      },
      close: function() {
        delete this.options;
        Marionette.Controller.prototype.close.call( this );
        App.execute( 'unregister:instance', this, this._instance_id );
      }
    });

  });

});