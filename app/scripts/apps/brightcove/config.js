define([
  'app'
], function( App ) {

  App.module('BrightcoveApp', function( BrightcoveApp, App, Backbone, Marionette, $, _ ) {

    var moduleNamespace = '.pugpig-brightcove';

    BrightcoveApp.Config = {
      selectors: {
        show: {
          el: moduleNamespace,
          poster: moduleNamespace + '__poster',
          video: moduleNamespace + '__video'
        }
      },
      apiUrl: 'http://api.brightcove.com/services/library?',
      apiToken: '',
      apiParams: {
        media_delivery: 'http',
        video_fields: 'renditions',
        command: 'find_video_by_id'
      }
    };

  });

});