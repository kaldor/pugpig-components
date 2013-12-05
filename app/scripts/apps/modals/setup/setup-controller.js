define([
  'app'
], function( App ) {

  'use strict';

  App.module('ModalsApp.Setup', function( Setup, App, Backbone, Marionette, $, _ ) {

    Setup.Controller = App.Controllers.Base.extend({
      initialize: function() {
        this.showView = this.getShowView();
        this.listenTo( this.showView, 'show:modal', function( options ) {
          App.vent.trigger( 'show:modal', options );
        });
      },
      getShowView: function() {
        return new Setup.Modals({
          el: this.options.el
        });
      }
    });

  });

});