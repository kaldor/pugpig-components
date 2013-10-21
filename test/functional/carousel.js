/*global casper*/
(function() {

  'use strict';

  var root = 'http://localhost:9000/static/carousel.html';

  casper.test.on( 'fail', function( failure ) {
    casper.capture( 'test/functional/fail.png' );
    casper.exit( 1 );
  });

  casper.start( root );

  casper.then( function() {

    this.test.info( 'Test next button applies a transform to carousel items container' );

    this.click( '.pugpig-carousel__next-button' );

    var hasTransform = this.getElementAttribute( '.pugpig-carousel__items', 'style' ).indexOf( 'transform' ) > -1 ? true : false;

    this.test.assertEquals( hasTransform, true, 'Carousel items container has a transform applied' );

  });

  casper.then( function() {

    this.test.info( 'Test next button applies the correct transform to carousel items container' )

    var containerStyles = this.getElementAttribute( '.pugpig-carousel__items', 'style' ),
      expectedTransform = '-' + this.getElementBounds( 'body').width + 'px',
      hasTransform = containerStyles.indexOf( expectedTransform ) > -1;

    this.test.assertEquals( hasTransform, true, 'Carousel items container has the correct transform applied' );

  });

  casper.then( function() {

    this.test.info( 'Test the Progress view updates correctly' );

    this.test.assertEquals( this.getElementInfo('.pugpig-carousel__progress').text.replace(/\s/g,'&nbsp;' ), '2&nbsp;/&nbsp;4', 'Progress view has updated to reflect the item change.' );

  });

    casper.then( function() {

    this.test.info( 'Test the Pager view updates correctly' );

      this.test.assertEquals( this.getElementInfo('.pugpig-carousel__pager .is-active').text, '2', 'Pager view has updated to reflect the item change.' );

    });

  casper.then( function() {

    this.test.info( 'Test previous button is visible once we\'re not viewing the first slide' );

    this.waitUntilVisible( '.pugpig-carousel__prev-button', function() {
      this.test.pass( 'Carousel previous button is visible now we\'re not viewing the first slide' );
    }, function() {
      this.test.fail( 'Carousel previous button didn\'t appear' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test prev button applies a transform of translate3d(0px, 0px, 0px) to carousel items container when we return to first slide' );

    this.click( '.pugpig-carousel__prev-button' );

    var hasTransform = this.getElementAttribute( '.pugpig-carousel__items', 'style' ).indexOf( 'transform: translate3d(0px, 0px, 0px)' ) > -1 ? true : false;

    this.test.assertEquals( hasTransform, true, 'Carousel items container has a transform of translate3d(0px, 0px, 0px) applied' );

  });

  casper.then( function() {

    this.test.info( 'Test prev button disappears when we return to the first slide' );

    this.waitUntilVisible( '.pugpig-carousel__prev-button.is-invisible', function() {
      this.test.pass( 'Carousel previous button is hidden now we\'ve returned to the first slide' );
    }, function() {
      this.test.fail( 'Carousel previous button didn\'t disappear' );
    }, 2000 );

  });

  casper.then( function() {

    this.test.info( 'Test next button disappears when we navigate to the last slide' );

    this.click( '.pugpig-carousel__next-button' );
    this.click( '.pugpig-carousel__next-button' );
    this.click( '.pugpig-carousel__next-button' );

    this.waitUntilVisible( '.pugpig-carousel__next-button.is-invisible', function() {
      this.test.pass( 'Carousel next button is hidden now we\'ve navigated to the last slide' );
    }, function() {
      this.test.fail( 'Carousel next button didn\'t disappear' );
    }, 2000 );

  });

  casper.run(function() {
    this.test.renderResults( true );
    this.exit();
  });

}());