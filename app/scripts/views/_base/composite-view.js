define([
  'app'
], function( App ) {

  App.module( 'Views', function( Views, App, Backbone, Marionette, $, _ ) {

    Views.CompositeView = Marionette.CompositeView.extend({
      itemViewEventPrefix: 'childview'
    });

  });

});