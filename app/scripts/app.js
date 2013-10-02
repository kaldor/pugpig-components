define([
  'marionette'
], function( Marionette ) {

  var App = new Marionette.Application();

  App.commands.setHandler( 'register:instance', function( instance, id ) {
    log( 'Register instance', instance, id );
    App.register( instance, id );
  });

  App.commands.setHandler( 'unregister:instance', function( instance, id ) {
    log( 'Unregister instance', instance, id );
    App.unregister( instance, id );
  });

  App.vent.on( 'log:close:view', function( view ) {
    log( 'Close view', view );
  });

  App.vent.on('all', function( evt ) {
    log('Event Caught: ' + evt);
  });

  return App;

});