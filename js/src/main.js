(function( require ) {
    
  "use strict";
  
  require([
    'js/config.js'
  ], function() {

    require([
      'zepto',
      'backbone',
      'lodash'
    ], function( $, Backbone, _ ) {
      log('Ready to go');
    });

  });

}( requirejs ));

window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments));}};