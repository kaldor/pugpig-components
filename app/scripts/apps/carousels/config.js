define([
  'app'
], function( App ) {

  App.module('CarouselsApp', function( CarouselsApp, App, Backbone, Marionette, $, _ ) {

    var moduleNamespace = '.pugpig-carousel';

    CarouselsApp.Config = {
      selectors: {
        show: {
          el: moduleNamespace,
          nextButton: moduleNamespace + '__next-button',
          prevButton: moduleNamespace + '__prev-button',
          items: moduleNamespace + '__item',
          itemsContainer: moduleNamespace + '__items',
          pager: moduleNamespace + '__pager',
          pagerItem: moduleNamespace + '__pager-item',
          progress: moduleNamespace + '__progress'
        }
      },
      swipeSensitivity: 0.7
    };

  });

});


