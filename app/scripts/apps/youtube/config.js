define([
  'app'
], function( App ) {

  'use strict';

  App.module('YouTubeApp', function( YouTubeApp, App, Backbone, Marionette, $, _ ) {

    var moduleNamespace = '.pugpig-youtube';

    YouTubeApp.Config = {
      selectors: {
        show: {
          el: moduleNamespace,
          player: moduleNamespace + '__player'
        }
      },
      apiUrl: 'https://www.youtube.com/player_api'
    };

  });

});