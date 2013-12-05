define([
  'app',
  'apps/carousels/config',
  'apps/carousels/show/show-view',
  'apps/carousels/show/show-controller'
], function( App ) {

  'use strict';

  App.module('CarouselsApp', function( CarouselsApp, App, Backbone, Marionette, $, _ ) {

    var selectors = CarouselsApp.Config.selectors,
      controllers = {
        show: []
      }, API = {
        createAll: function( options ) {
          var selector = selectors.show.el + ':visible'

          if ( options ) {
            selector = options.container + ' ' + selector;
          }

          _.each( $( selector ), function( el ) {
            API.createOne(_.extend( {}, options, {
              el: el
            }) );
          });
        },
        createOne: function( options ) {
          controllers.show.push( new CarouselsApp.Show.Controller( options ) );
        }
      };

    CarouselsApp.on( 'start', API.createAll );

    App.reqres.setHandler( 'carousels:config', function() {
      return _.clone( App.module( 'CarouselsApp' ).Config );
    });

    App.commands.setHandler( 'create:container:carousels', API.createAll );

    App.commands.setHandler( 'create:modal:carousel', API.createOne );

  });

});