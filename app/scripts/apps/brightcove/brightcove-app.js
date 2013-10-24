define([
  'app',
  'apps/brightcove/config',
  'apps/brightcove/show/show-view',
  'apps/brightcove/show/show-controller'
], function( App ) {

  App.module('BrightcoveApp', function( BrightcoveApp, App, Backbone, Marionette, $, _ ) {

    var selectors = BrightcoveApp.Config.selectors,
      controllers = {
        show: []
      }, API = {
        createAll: function( config ) {
          var selector = selectors.show.el + ':visible',
            closeEvent;

          if ( config ) {
            selector = config.container + ' ' + selector;
            closeEvent = config.closeEvent;
          }

          _.each( $( selector ), function( el ) {
            API.createOne({
              el: el,
              closeEvent: closeEvent
            });
          });
        },
        createOne: function( config ) {
          controllers.show.push(new BrightcoveApp.Show.Controller({
            el: $( config.el ),
            closeEvent: config.closeEvent
          }) );
        }
      };

    BrightcoveApp.on( 'start', API.createAll );

    App.reqres.setHandler( 'brightcove:config', function() {
      return _.clone( App.module( 'BrightcoveApp' ).Config );
    });

    App.commands.setHandler( 'pause:playing:brightcove:videos', function() {
      _.each( controllers.show, function( controller ) {
        controller.pauseVideo();
      });
    });

    App.commands.setHandler( 'create:container:videos', function( config ) {
      API.createAll({
        container: config.container,
        closeEvent: config.closeEvent
      });
    });

  });

});