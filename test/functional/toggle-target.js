/*global casper*/
(function() {

  'use strict';

  var root = 'http://localhost:9000/static/toggle-target.html';

  casper.test.on( 'fail', function( failure ) {
    casper.capture( 'test/functional/fail.png' );
    casper.exit( 1 );
  });

  casper.start( root );

  casper.then( function() {

    this.test.info( 'Test first toggle button displays the first caption' );

    this.click( '.pugpig-toggle-target:first-of-type .pugpig-toggle-target__trigger' );

    this.waitForSelector( '.pugpig-toggle-target:first-of-type .pugpig-toggle-target__target:not(.is-invisible)', function() {
      this.test.pass( 'Target was toggled into view' );
    }, function() {
      this.test.fail( 'Target wasn\'t toggled into view' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test first toggle button hides the first caption if its visible' );

    this.click( '.pugpig-toggle-target:first-of-type .pugpig-toggle-target__trigger' );

    this.waitForSelector( '.pugpig-toggle-target:first-of-type .pugpig-toggle-target__target.is-invisible', function() {
      this.test.pass( 'Target was hidden from view' );
    }, function() {
      this.test.fail( 'Target wasn\'t hidden from view' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test second toggle button displays the second caption' );

    this.click( '.pugpig-toggle-target:nth-of-type(2) .pugpig-toggle-target__trigger' );

    this.waitForSelector( '.pugpig-toggle-target:nth-of-type(2) .pugpig-toggle-target__target:not(.is-invisible)', function() {
      this.test.pass( 'Target was toggled into view' );
    }, function() {
      this.test.fail( 'Target wasn\'t toggled into view' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test second toggle button hides the second caption if its visible' );

    this.click( '.pugpig-toggle-target:nth-of-type(2) .pugpig-toggle-target__trigger' );

    this.waitForSelector( '.pugpig-toggle-target:nth-of-type(2) .pugpig-toggle-target__target.is-invisible', function() {
      this.test.pass( 'Target was hidden from view' );
    }, function() {
      this.test.fail( 'Target wasn\'t hidden from view' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test third toggle button displays the third caption' );

    this.click( '.pugpig-toggle-target:nth-of-type(3) .pugpig-toggle-target__trigger' );

    this.waitForSelector( '.pugpig-toggle-target:nth-of-type(3) .pugpig-toggle-target__target:not(.is-invisible)', function() {
      this.test.pass( 'Target was toggled into view' );
    }, function() {
      this.test.fail( 'Target wasn\'t toggled into view' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test third toggle button hides the third caption if its visible' );

    this.click( '.pugpig-toggle-target:nth-of-type(3) .pugpig-toggle-target__trigger' );

    this.waitForSelector( '.pugpig-toggle-target:nth-of-type(3) .pugpig-toggle-target__target.is-invisible', function() {
      this.test.pass( 'Target was hidden from view' );
    }, function() {
      this.test.fail( 'Target wasn\'t hidden from view' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test fourth toggle button displays the fourth caption' );

    this.click( '.pugpig-toggle-target:nth-of-type(4) .pugpig-toggle-target__trigger' );

    this.waitForSelector( '.pugpig-toggle-target:nth-of-type(4) .pugpig-toggle-target__target:not(.is-invisible)', function() {
      this.test.pass( 'Target was toggled into view' );
    }, function() {
      this.test.fail( 'Target wasn\'t toggled into view' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test fourth toggle button hides the fourth caption if its visible' );

    this.click( '.pugpig-toggle-target:nth-of-type(4) .pugpig-toggle-target__trigger' );

    this.waitForSelector( '.pugpig-toggle-target:nth-of-type(4) .pugpig-toggle-target__target.is-invisible', function() {
      this.test.pass( 'Target was hidden from view' );
    }, function() {
      this.test.fail( 'Target wasn\'t hidden from view' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test functionality based on data-pugpig-target / data-pugpig-target-name linkage to allow for multiple triggers / targets in one parent element' );

    this.click( '.multiple-trigger-target-test .pugpig-toggle-target__trigger:first-child' );

    this.waitUntilVisible( '.multiple-trigger-target-test .pugpig-toggle-target__target[data-pugpig-target-name="1"]', function() {
      this.test.pass( 'Target was toggled into view' );
    }, function() {
      this.test.fail( 'Target wasn\'t toggled into view' );
    }, 2000 );

    this.click( '.multiple-trigger-target-test .pugpig-toggle-target__trigger:first-child' );

    this.waitForSelector( '.multiple-trigger-target-test .pugpig-toggle-target__target[data-pugpig-target-name="1"].is-invisible', function() {
      this.test.pass( 'Target was hidden from view' );
    }, function() {
      this.test.fail( 'Target wasn\'t hidden from view' );
    }, 2000 );

  });

  casper.run(function() {
    this.test.renderResults( true );
    this.exit();
  });

}());