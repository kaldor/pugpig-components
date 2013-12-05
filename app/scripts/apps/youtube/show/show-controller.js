/*global YT*/
define([
  'app',
  'apps/youtube/config'
], function( App ) {

  'use strict';

  App.module('YouTubeApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var config = App.module( 'YouTubeApp' ).Config,
      selectors = config.selectors;

    Show.Controller = App.Controllers.Base.extend({
      initialize: function() {
        App.execute( 'snapshot:register', this );

        this.showView = this.getShowView();
        this.player = null;
        this.createPlayer();
      },
      getShowView: function() {
        return new Show.View({
          el: this.options.el
        });
      },
      createPlayer: function() {
        if ( typeof YT === 'undefined' ) {
          setTimeout( _.bind( this.createPlayer, this ), 200 );
          return false;
        }
        this.player = new YT.Player( this.showView.ui.player[ 0 ], {
          videoId: this.showView.getVideoId(),
          events: {
            onReady: _.bind( function() {
              App.execute( 'snapshot:unregister', this );
            }, this )
          }
        });
      }
    });

  });

});