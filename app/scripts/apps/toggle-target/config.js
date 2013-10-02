define([
  'app'
], function( App ) {

  App.module('ToggleTargetApp', function( ToggleTargetApp, App, Backbone, Marionette, $, _ ) {

    var moduleNamespace = '.pugpig-toggle-target';

    ToggleTargetApp.Config = {
      selectors: {
        show: {
          el: moduleNamespace,
          trigger: moduleNamespace + '__trigger',
          target: moduleNamespace + '__target'
        }
      }
    };

  });

});