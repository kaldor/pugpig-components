define([
  'app',
  'apps/modals/config'
], function( App ) {

  'use strict';

  App.module('ModalsApp.Setup', function( Setup, App, Backbone, Marionette, $, _ ) {

    var selectors = App.module( 'ModalsApp' ).Config.selectors;

    Setup.Modals = App.Views.ItemView.extend({
      events: function() {
        var events = {};
        events[ 'click ' + selectors.setup.launcher ] = 'showModal';
        return events;
      },
      showModal: function( e ) {
        // TODO: This line needs to be changed as it is a quick fix for Stylist
        var viewIndex = $( e.currentTarget ).parents('.grid').find( selectors.setup.launcher ).index( $( e.currentTarget ) );
        this.trigger( 'show:modal', {
          content: this.isGrouped() ? this.$el.data( 'group' ) : this,
          initialIndex: viewIndex
        });
      },
      isGrouped: function() {
        return this.$el.data( 'group' );
      }
    });

  });

});