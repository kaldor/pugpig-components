/*global casper*/
(function() {

  'use strict';

  var root = 'http://localhost:9000/static/modal.html';

  casper.test.on( 'fail', function( failure ) {
    casper.capture( 'test/functional/fail.png' );
    casper.exit( 1 );
  });

  casper.start( root );

  casper.then( function() {

    this.test.info( 'Test modal launcher appends modal to the body' );

    this.click( '.pugpig-modal-launcher' );

    this.waitForSelector( '.pugpig-modal', function() {
      this.test.pass( 'Modal appended to the body' );
    }, function() {
      this.test.fail( 'Modal was not appended to the body' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test modal is visible' );

    this.waitUntilVisible( '.pugpig-modal', function() {
      this.test.pass( 'Modal is visible' );
    }, function() {
      this.test.fail( 'Modal is not visible' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test close button removes modal from the body' );

    this.click( '.pugpig-modal__close' );

    this.waitWhileSelector( '.pugpig-modal', function() {
      this.test.pass( 'Modal removed from the body' );
    }, function() {
      this.test.fail( 'Modal was not removed from the body' );
    }, 2000 );

  });

  casper.run(function() {
    this.test.renderResults( true );
    this.exit();
  });

}());