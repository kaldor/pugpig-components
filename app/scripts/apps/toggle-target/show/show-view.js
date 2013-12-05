define([
  'app',
  'apps/toggle-target/config'
], function( App ) {

  'use strict';

  App.module('ToggleTargetApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var config = App.module( 'ToggleTargetApp' ).Config,
      selectors = config.selectors;

    Show.View = App.Views.ItemView.extend({
      ui: {
        target: selectors.show.target,
        trigger: selectors.show.trigger
      },
      events: function() {
        var events = {};
        events[ 'click ' + selectors.show.trigger ] = 'broadcastTriggerClick';
        return events;
      },
      broadcastTriggerClick: function( e ) {
        this.trigger('trigger:clicked', e );
      },
      render: function() {
        this.bindUIElements();
        this.hasMultipleTargets = this.ui.trigger.length > 1;
      },
      getCurrentlyVisibleTarget: function() {
        return this.ui.target.filter( ':not(.' + this.IS_INVISIBLE_CLASS + ')' );
      },
      hideCurrentlyVisibleTarget: function() {
        this.toggleUI( this.getCurrentlyVisibleTarget() );
      },
      getCurrentlyToggledTrigger: function() {
        return this.ui.trigger.filter( '.' + this.IS_TOGGLED_CLASS );
      },
      untoggleCurrentlyToggledTrigger: function() {
        this.getCurrentlyToggledTrigger()
          .removeClass( this.IS_TOGGLED_CLASS );
      },
      closeVisible: function( trigger ) {
        this.hideCurrentlyVisibleTarget();
        this.untoggleCurrentlyToggledTrigger();
      },
      toggleTarget: function( trigger ) {
        var target;
        if ( this.hasMultipleTargets ) {
          target = this.getTargetWithTrigger( trigger );
        } else {
          trigger = this.ui.trigger;
          target = this.ui.target;
        }
        this.toggleUI( target );
        trigger.toggleClass( this.IS_TOGGLED_CLASS );
      },
      getTargetWithTrigger: function( trigger ) {
        var targetName = trigger.data( 'pugpig-target' );
        return $( '[data-pugpig-target-name="' + targetName + '"]' );
      }
    });

  });

});