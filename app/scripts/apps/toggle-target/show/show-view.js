define([
  'app',
  'apps/toggle-target/config'
], function( App, LayoutTemplate ) {

  App.module('ToggleTargetApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var selectors = App.module( 'ToggleTargetApp' ).Config.selectors;

    Show.View = App.Views.ItemView.extend({
      ui: {
        target: selectors.show.target,
        trigger: selectors.show.trigger
      },
      events: function() {
        var events = {};
        events[ 'click ' + selectors.show.trigger ] = 'toggleTarget';
        return events;
      },
      toggleTarget: function( e ) {
        this.trigger('toggle:target', e );
      },
      toggleTrigger: function( trigger ) {
        var trigger = trigger || this.ui.trigger;
        trigger.toggleClass( 'is-toggled' );
      },
      render: function() {
        this.bindUIElements();
      }
    });

  });

});