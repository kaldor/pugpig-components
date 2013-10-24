define([
  'app',
  'apps/carousels/config'
], function( App ) {

  App.module('ModalsApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var selectors = App.module( 'ModalsApp' ).Config.selectors;

    Show.Controller = App.Controllers.Base.extend({
      initialize: function() {
        this.body = $( 'body' );
        this.showView = this.getShowView();
        this.listenTo( this.showView, 'close:modal',  this.triggerCloseModal );
        this.listenTo( this.showView, 'click:modal:overlay', this.triggerCloseModal );
        this.listenTo( this.showView, 'setup:modal:carousels', this.setupModalCarousels );
        this.listenTo( this.showView, 'setup:modal:videos', this.setupModalVideos );
        this.listenTo( this.showView, 'setup:grouped:modal', this.setupGroupedModal );
        this.appendShowViewToBody();
        this.toggleScrolling();
        this.showView.render()
          .setContentMaxHeight()
          .appendContent()
          .show()
      },
      appendShowViewToBody: function() {
        this.body.append( this.showView.$el );
      },
      getShowView: function() {
        return new Show.View( this.options );
      },
      triggerCloseModal: function() {
        App.vent.trigger( 'close:modal' );
      },
      toggleScrolling: function() {
        this.body.toggleClass( 'disable-scroll' );
      },
      close: function() {
        this.toggleScrolling();
        App.Controllers.Base.prototype.close.call( this );
        this.showView.close();
      },
      setupModalCarousels: function() {
        App.execute( 'create:container:carousels', {
          container: selectors.show.el,
          closeEvent: 'close:modal'
        });
      },
      setupGroupedModal: function( options ) {
        App.execute( 'create:modal:carousel', {
          el: options.el,
          closeEvent: 'close:modal',
          group: options.group,
          initialIndex: options.initialIndex
        });
      },
      setupModalVideos: function() {
        App.execute( 'create:container:videos', {
          container: selectors.show.el,
          closeEvent: 'close:modal'
        });
      }
    });

  });

});