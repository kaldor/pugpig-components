define([
  'app'
], function( App ) {

  'use strict';

  App.module('SnapshotApp', function( SnapshotApp, App, Backbone, Marionette, $, _ ) {

    var readyCallback,
      registry = [],
      API = {
        register: function( controller ) {
          registry.push( controller._instance_id );
        },
        unregister: function( controller ) {
          registry = _.without( registry, controller._instance_id );
          API.checkIfReady();
        },
        postReadyMessage: function() {
          App.execute( 'post:message', {
            type: 'onPageReady'
          });
        },
        checkIfReady: function() {
          if ( registry.length === 0 ) {
            clearTimeout( readyCallback );
            readyCallback = setTimeout( API.postReadyMessage, 100 );
          }
        }
      };

    App.commands.setHandler( 'snapshot:register', API.register );

    App.commands.setHandler( 'snapshot:unregister', API.unregister );

  });

});