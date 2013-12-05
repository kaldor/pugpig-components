define([
  'app',
  'apps/youtube/config'
], function( App ) {

  'use strict';

  App.module('YouTubeApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var selectors = App.module( 'YouTubeApp' ).Config.selectors;

    Show.View = App.Views.ItemView.extend({
      ui: {
        player: selectors.show.player
      },
      initialize: function() {
        this.bindUIElements();
      },
      getVideoId: function() {
        return this.$el.data( 'video-id' );
      }
    });

  });

});