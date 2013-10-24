define([
  'app',
  'text!apps/modals/show/templates/show-template.html',
  'apps/modals/config'
], function( App, LayoutTemplate ) {

  App.module('ModalsApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var selectors = App.module( 'ModalsApp' ).Config.selectors;

    Show.View = App.Views.ItemView.extend({
      className: selectors.show.el.replace( '.', '' ) + ' is-invisible',
      template: _.template( LayoutTemplate ),
      ui: {
        content: selectors.show.content
      },
      triggers: function() {
        var triggers = {};
        triggers[ 'click ' + selectors.show.close ] = 'close:modal';
        return triggers;
      },
      events: {
        'click': 'checkClickTarget'
      },
      initialize: function( options ) {
        this.config = App.reqres.request( 'modals:config' );

        this.config.maxHeight = parseInt( this.config.maxHeight, 10 ) / 100;

        this.modalContent = options.content;
        this.setInstancePropertiesFor( 'initialIndex' );

        $( window ).on( 'resize', _.bind( this.setContentMaxHeight, this ) );
      },
      checkClickTarget: function( e ) {
        if ( e.target.className.indexOf( selectors.show.overlay.replace( '.', '' ) ) > -1 ) {
          this.trigger( 'click:modal:overlay' );
        }
      },
      show: function() {
        _.defer( _.bind( function() {
          this.$el.removeClass( this.IS_INVISIBLE_CLASS );
        }, this ));
      },
      setContentMaxHeight: function() {
        this.ui.content.css({
          maxHeight: $( window ).innerHeight() * this.config.maxHeight
        });
        return this;
      },
      appendContent: function() {
        var html;
        if ( typeof this.modalContent === 'string' ) {
          this.trigger( 'setup:grouped:modal', {
            el: this.ui.content,
            group: this.modalContent,
            initialIndex: this.initialIndex
          });
        } else {
          html = this.modalContent.$( selectors.setup.content ).clone();
          this.ui.content.html( html );
          this.trigger( 'setup:modal:carousels' );
          this.trigger( 'setup:modal:videos' );
        }
        return this;
      }
    });

  });

});