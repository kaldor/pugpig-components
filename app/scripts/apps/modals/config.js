define([
  'app'
], function( App ) {

  App.module('ModalsApp', function( ModalsApp, App, Backbone, Marionette, $, _ ) {

    var moduleNamespace = '.pugpig-modal';

    ModalsApp.Config = {
      maxHeight: '90%',
      selectors: {
        show: {
          el: moduleNamespace,
          close: moduleNamespace + '__close',
          overlay: moduleNamespace + '__overlay',
          content: moduleNamespace + '__content'
        },
        setup: {
          el: moduleNamespace + '-container',
          launcher: moduleNamespace + '-launcher',
          content: moduleNamespace + '-container__content'
        }
      }
    };

  });

});