define([
  'app',
  'text!apps/brightcove/show/templates/show-template.html',
  'apps/brightcove/config'
], function( App, ShowTemplate ) {

  App.module('BrightcoveApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var selectors = App.module( 'BrightcoveApp' ).Config.selectors;

    Show.View = App.Views.ItemView.extend({
      ui: {
        poster: selectors.show.poster
      },
      template: _.template( ShowTemplate ),
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
        this.$el.append( this.template({
          controls: 'controls',
          preload: 'none',
          width: this.getWidth(),
          height: this.getHeight(),
          poster: this.getPosterSrc(),
          src: url
        }) );
        this.ui.video = this.$( 'video' );
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
      },
      removePoster: function() {
        setTimeout( _.bind( function() {
          this.hideUI( this.ui.poster.css({
            zIndex: -1
          }) );
        }, this ), 500 );
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