define([
  'app',
  'apps/modals/config',
  'apps/modals/setup/setup-view',
  'apps/modals/setup/setup-controller',
  'apps/modals/show/show-view',
  'apps/modals/show/show-controller'
], function( App ) {

  App.module('ModalsApp', function( ModalsApp, App, Backbone, Marionette, $, _ ) {

    var selectors = ModalsApp.Config.selectors,
      controllers = {
        show: null,
        setup: []
      }, API = {
        setup: function() {
          _.each( $( selectors.setup.el ), function( el ) {
            controllers.setup.push(new ModalsApp.Setup.Controller({
              el: $( el )
            }) );
          });
        },
        show: function( options ) {
          controllers.show = new ModalsApp.Show.Controller( options );
        },
        close: function() {
          controllers.show.close();
          delete controllers.show;
        }
      };

    ModalsApp.on( 'start', API.setup );

    App.vent.on( 'show:modal', API.show );

    App.vent.on( 'close:modal', API.close );

    App.reqres.setHandler( 'modals:config', function() {
      return _.clone( App.module( 'ModalsApp' ).Config );
    });

  });

});