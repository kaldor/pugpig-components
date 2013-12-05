define([
  'app',
  'apps/youtube/config',
  'apps/youtube/show/show-view',
  'apps/youtube/show/show-controller'
], function( App ) {

  'use strict';

  App.module('YouTubeApp', function( YouTubeApp, App, Backbone, Marionette, $, _ ) {

    var selectors = YouTubeApp.Config.selectors,
      controllers = {
        show: []
      }, API = {
        loadYouTubeAPI: function() {
          var tag = document.createElement( 'script' );
          tag.src = YouTubeApp.Config.apiUrl;
          var firstScriptTag = document.getElementsByTagName( 'script' )[ 0 ];
          firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
        },
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
          controllers.show.push(new YouTubeApp.Show.Controller({
            el: $( config.el )
          }) );
        }
      };

    YouTubeApp.on( 'before:start', API.loadYouTubeAPI );

    YouTubeApp.on( 'start', API.createAll );

    App.reqres.setHandler( 'youtube:config', function() {
      return _.clone( App.module( 'YouTubeApp' ).Config );
    });

  });

});