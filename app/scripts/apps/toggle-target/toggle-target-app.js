define([
  'app',
  'apps/toggle-target/show/show-view',
  'apps/toggle-target/show/show-controller'
], function( App ) {

  'use strict';

  App.module('ToggleTargetApp', function( ToggleTargetApp, App, Backbone, Marionette, $, _ ) {

    var selectors = ToggleTargetApp.Config.selectors,
      controllers = {
        show: []
      }, API = {
        start: function( config ) {
          _.each( $( selectors.show.el ), function( el ) {
            controllers.show.push(new ToggleTargetApp.Show.Controller({
              el: $( el )
            }) );
          });
        }
      };

    ToggleTargetApp.on( 'start', API.start );

  });

});