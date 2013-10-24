define([
  'app',
  'apps/brightcove/config'
], function( App ) {

  App.module('BrightcoveApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var selectors = App.module( 'BrightcoveApp' ).Config.selectors;

    Show.View = App.Views.ItemView.extend({
      ui: {
        poster: selectors.show.poster,
        video: selectors.show.video
      },
      triggers: function() {
        var triggers = {};
        triggers[ 'click ' + selectors.show.poster ] = 'get:brightcove:video:url';
        return triggers;
      },
      initialize: function() {
        this.bindUIElements();
        this.bindEvents();
      },
      bindEvents: function() {
        $( window ).on( 'resize', _.debounce( _.bind( this.resizeVideo, this ), 200 ) );
      },
      render: function( url ) {
        if ( _.isUndefined( url ) ) {
          return false;
        }
        this.ui.video.attr({
          controls: 'controls',
          preload: 'none',
          src: url,
          poster: this.getPosterSrc()
        });
        return this;
      },
      getVideoId: function() {
        return this.$el.data( 'brightcove-video-id' );
      },
      getPosterSrc: function() {
        return this.ui.poster.attr( 'src' );
      },
      resizeVideo: function() {
        if ( _.isUndefined( this.ui.video ) ) {
          return false;
        }
        this.ui.video.css({
          width: this.getWidth(),
          height: this.getHeight(),
        });
        return this;
      },
      removePoster: function() {
        setTimeout( _.bind( function() {
          this.hideUI( this.ui.poster.css({
            zIndex: -1
          }) );
        }, this ), 500 );
        return this;
      },
      showVideo: function() {
        this.showUI( 'video' );
        return this;
      },
      play: function() {
        var video = this.getVideoHTMLElement();
        video.load();
        video.play();
      },
      pause: function() {
        if ( _.isUndefined( this.ui.video ) ) {
          return false;
        }
        var video = this.getVideoHTMLElement();
        video.pause();
      },
      getVideoHTMLElement: function() {
        return this.ui.video[ 0 ];
      }
    });

  });

});