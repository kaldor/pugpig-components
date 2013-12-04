define([
  'app'
], function( App ) {

  'use strict';

  App.module('MessagingApp', function( MessagingApp, App, Backbone, Marionette, $, _ ) {

    var queueMessages = false,
      messageQueue = [],
      API = {
        buildRequestParams: function( data ) {
          var params = '';
          $.each( data, function( key, value ) {
            params += '/' + encodeURIComponent( key ) + '/' + encodeURIComponent( value );
          });
          return params;
        },
        postMessage: function( message ) {

          if ( queueMessages ) {
            messageQueue.push( message );
          } else {

            var iframe = document.createElement( 'iframe' ),
            params = (typeof message.data !== 'undefined') ? API.buildRequestParams( message.data ) : '';

            iframe.setAttribute( 'src', 'pugpig://' + message.type + params );
            document.documentElement.appendChild( iframe );
            iframe.parentNode.removeChild( iframe );
            iframe = null;

          }
        },
        processMessageQueue: function() {
          queueMessages = false;
          $.each( messageQueue, API.postMessage );
        }
      };

    App.commands.setHandler( 'post:message', API.postMessage );
    App.commands.setHandler( 'process:message:queue', API.processMessageQueue );

  });

});