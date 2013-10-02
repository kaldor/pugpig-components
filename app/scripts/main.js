/*global requirejs,log*/
( function( require ) {

  'use strict';

  require.config({
    baseUrl: '../scripts',
    paths: {
      jquery: '../bower_components/jquery/jquery',
      backbone: '../bower_components/backbone/backbone',
      lodash: '../bower_components/lodash/dist/lodash',
      text: '../bower_components/text/text',
      hammer: '../bower_components/hammerjs/dist/jquery.hammer',
      marionette: '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
      fastclick: '../bower_components/fastclick/lib/fastclick',
      'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
      'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter'
    },
    shim: {
      jquery: {
        exports: 'jQuery'
      },
      lodash: {
        exports: '_'
      },
      backbone: {
        deps: ['jquery', 'lodash'],
        exports: 'Backbone'
      },
      marionette: {
        deps: ['jquery', 'lodash', 'backbone'],
        exports: 'Marionette'
      },
      'config/marionette/application': {
        deps: ['backbone','marionette']
      },
      hammer: {
        exports: 'Hammer',
        deps: ['jquery']
      }
    },
    map: {
      "*": { "underscore": "lodash" }
    }
  });

  require([
    'config/marionette/application',
    'controllers/_base',
    'views/_base/view',
    'views/_base/item-view',
    'apps/modals/modals-app',
    'apps/carousels/carousels-app',
    'apps/back-to-top/back-to-top-app',
    'apps/toggle-target/toggle-target-app'
  ], function() {

    require([
      'app',
      'fastclick',
      'jquery'
    ], function ( App, Fastclick, $ ) {

      $(function() {
        FastClick.attach( document.body );
        App.start();
      });

    });

  });

}( requirejs ));

window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments));}};