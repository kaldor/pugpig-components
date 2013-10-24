define([
  'app',
  'apps/brightcove/config'
], function( App ) {

  App.module('BrightcoveApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var config = App.module( 'BrightcoveApp' ).Config,
      selectors = config.selectors;

    Show.Controller = App.Controllers.Base.extend({
      initialize: function() {
        this.params = config.apiParams;
        this.params.token = config.apiToken;
        this.showView = this.getShowView();
        this.listenTo( this.showView, 'get:brightcove:video:url', _.bind( this.setupShowView, this ) );

        if ( this.options.closeEvent ) {
          App.vent.on( this.options.closeEvent, _.bind( this.close, this ) );
          this.setupShowView();
        }
      },
      getShowView: function() {
        return new Show.View({
          el: this.options.el
        });
      },
      setupShowView: function() {
        App.execute( 'pause:playing:brightcove:videos' );
        this.params.video_id = this.showView.getVideoId();
        $.when( this.requestVideoUrl() ).done( _.bind( this.renderVideo, this ) );
      },
      requestVideoUrl: function() {
        return $.ajax({
          url: config.apiUrl,
          data: this.params,
          dataType: 'jsonp'
        });
      },
      renderVideo: function( data ) {
        var url = data.renditions[ 0 ].url;
        this.showView.render( url )
          .showVideo()
          .resizeVideo()
          .removePoster()
          .play();
      },
      pauseVideo: function() {
        this.showView.pause();
      },
      close: function() {
        this.showView.close();
        App.Controllers.Base.prototype.close.call( this );
      }
    });

  });

});