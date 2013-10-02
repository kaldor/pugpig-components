define([
  'app',
  'apps/toggle-target/config'
], function( App ) {

  App.module('ToggleTargetApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var selectors = App.module( 'ToggleTargetApp' ).Config.selectors;

    Show.Controller = App.Controllers.Base.extend({
      initialize: function() {
        this.showView = this.getShowView();
        this.showView.render();
        this.listenTo( this.showView, 'toggle:target', this.toggleShowViewElements );
      },
      getShowView: function() {
        return new Show.View({
          el: this.options.el
        });
      },
      toggleShowViewElements: function( e ) {
        var trigger = $( e.currentTarget ),
          targetName = trigger.data( 'pugpig-target' ),
          target;
        if ( targetName ) {
          target = $( selectors.show.target + '[data-pugpig-target-name="' + targetName + '"]' );
          this.showView.toggleUI( target )
            .toggleTrigger( trigger );
        } else {
          this.showView.toggleUI( 'target' )
            .toggleTrigger();
        }
      }
    });

  });

});