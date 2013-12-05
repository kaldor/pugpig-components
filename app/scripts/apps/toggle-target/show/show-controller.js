define([
  'app',
  'apps/toggle-target/config'
], function( App ) {

  'use strict';

  App.module('ToggleTargetApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var config = App.module( 'ToggleTargetApp' ).Config,
      selectors = config.selectors;

    Show.Controller = App.Controllers.Base.extend({
      initialize: function() {
        this.showView = this.getShowView();
        this.showView.render();
        this.listenTo( this.showView, 'trigger:clicked', this.toggleShowViewElements );
      },
      getShowView: function() {
        return new Show.View({
          el: this.options.el
        });
      },
      toggleShowViewElements: function( e ) {
        var trigger = $( e.currentTarget );
        if ( this.showView.hasMultipleTargets && ( _.isUndefined( config.autoClose ) || config.autoClose === true ) && !trigger.hasClass( 'is-toggled' ) ) {
          this.showView.closeVisible( trigger );
        }
        this.showView.toggleTarget( trigger );
      }
    });

  });

});