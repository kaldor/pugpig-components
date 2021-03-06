define([
  'app',
  'text!apps/carousels/show/templates/carousel-template.html',
  'text!apps/carousels/show/templates/progress-template.html',
  'apps/carousels/config',
  'hammer'
], function( App, CarouselTemplate, ProgressTemplate ) {

  'use strict';

  App.module('CarouselsApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var selectors = App.module( 'CarouselsApp' ).Config.selectors;

    Show.Carousel = App.Views.ItemView.extend({
      ui: {
        nextButton: selectors.show.nextButton,
        prevButton: selectors.show.prevButton,
        items: selectors.show.items,
        itemsContainer: selectors.show.itemsContainer,
        itemsWrapper: selectors.show.itemsWrapper
      },
      triggers: function() {
        var triggers = {};
        triggers[ 'click ' + selectors.show.nextButton ] = 'click:carousel:next';
        triggers[ 'click ' + selectors.show.prevButton ] = 'click:carousel:prev';
        return triggers;
      },
      template: _.template( CarouselTemplate ),
      initialize: function( options ) {

        this.config = App.reqres.request( 'carousels:config' );

        this.setInstancePropertiesFor( 'numItems' );

        if ( options.useTemplate ) {
          this.$el.html( this.template({
            items: this.options.items
          }) );

          options.appendTo.append( this.$el );

          this.$el = this.$( selectors.show.el );
        } else {
          this.$el = this.options.el;
          this.setInstancePropertiesFor( 'html' );
        }

        this.bindUIElements();
        this.updateContainerWidth();
        this.currentOffset = 0;
        this.setupHammer();
        $( window ).on( 'resize', _.bind( this.resizeCarousel, this ) );

        this.setSubViewElements();

      },
      setSubViewElements: function() {
        this.pagerEl = this.$( selectors.show.pager );
        this.progressEl = this.$( selectors.show.progress );
      },
      resizeCarousel: function() {
        this.trigger( 'resize:carousel' );
      },
      setupHammer: function() {
        this.ui.itemsContainer.hammer({
          drag_lock_to_axis: true
        }).on('release dragleft dragright swipeleft swiperight', _.bind( this.handleHammer, this ) );
      },
      handleHammer: function( e ) {

        e.gesture.preventDefault();
        this.disableAnimation();

        this.trigger( 'start:carousel:drag' );

        switch(e.type) {
          case 'dragright':
            // intentional fall through
          case 'dragleft':
            this.handleHammerDrag( e );
            break;
          case 'swipeleft':
            this.handleHammerSwipe( e, 'next' );
            break;
          case 'swiperight':
            this.handleHammerSwipe( e, 'prev' );
            break;
          case 'release':
            this.handleHammerRelease( e );
            break;
        }

      },
      handleHammerSwipe: function( e, type ) {
        this.enableAnimation();
        this.trigger( 'click:carousel:' + type );
        this.trigger( 'end:carousel:drag' );
        e.gesture.stopDetect();
      },
      handleHammerDrag: function( e ) {
        this.ui.itemsContainer.css({
          transform: 'translate3d(' + ( -this.currentOffset + e.gesture.deltaX ) + 'px, 0px, 0px)'
        });
      },
      handleHammerRelease: function( e ) {
        this.enableAnimation();
        if( Math.abs(e.gesture.deltaX) > this.containerWidth / ( 1 / ( 1 - this.config.swipeSensitivity ) ) ) {
          if(e.gesture.direction == 'right') {
            this.trigger( 'click:carousel:prev' );
          } else {
            this.trigger( 'click:carousel:next' );
          }
        } else {
          this.trigger( 'reset:carousel' );
        }
        this.trigger( 'end:carousel:drag' );
      },
      resizeContainerToFitItems: function() {
        this.ui.itemsContainer.width( this.containerWidth * this.numItems );
        return this;
      },
      getContainerWidth: function() {
        return this.ui.itemsWrapper.innerWidth();
      },
      getContainerHeight: function() {
        return this.ui.itemsWrapper.innerHeight();
      },
      updateContainerWidth: function() {
        this.containerWidth = this.getContainerWidth();
        return this;
      },
      updateContainerHeight: function() {
        this.containerHeight = this.getContainerHeight();
        return this;
      },
      freezeItemWidth: function() {
        this.$( selectors.show.items ).width( this.containerWidth );
        return this;
      },
      freezeItemHeight: function() {
        this.$( selectors.show.items ).height( this.containerHeight );
        return this;
      },
      unfreezeItemHeight: function() {
        this.$( selectors.show.items ).height( '' );
        return this;
      },
      render: function( itemHtml ) {
        if ( !this.useTemplate ) {
          this.ui.itemsContainer.append( this.html );
        }
        this.bindUIElements();
        return this;
      },
      changeItem: function( index ) {
        this.currentOffset = this.containerWidth * index;
        this.ui.itemsContainer.css({
          transform: 'translate3d(-' + ( this.currentOffset ) + 'px, 0px, 0px)'
        });
        return this;
      },
      detachItems: function( index ) {

        if ( !this.itemsDetached ) {
          var before = index > 0 ? this.ui.items.slice( 0, index - 1 ) : null,
            after = index < this.ui.items.length ? this.ui.items.slice( index + 2, this.ui.items.length ) : null;

          if ( !_.isNull( before ) ) {
            _.each( before, function( el ) {
              var item = $( el );
              item.data( 'html', item.html() );
            });
            before.empty();
          }
          if ( !_.isNull( after ) ) {
            _.each( after, function( el ) {
              var item = $( el );
              item.data( 'html', item.html() );
            });
            after.empty();
          }
          this.itemsDetached = true;
        }

        return this;
      },
      reattachItems: function() {
        _.each( this.ui.items, function( el ) {
          var item = $( el ),
            html = item.data( 'html' );
          if ( html ) {
            item.html( html );
          }
        })
        delete this.itemsDetached;
        return this;
      }
    });

    Show.Pager = App.Views.ItemView.extend({
      events: function() {
        var events = {};
        events[ 'click ' + selectors.show.pagerItem ] = 'changeItem';
        return events;
      },
      changeItem: function( e ) {
        var index = this.$( selectors.show.pagerItem ).index( $( e.currentTarget ) );
        this.trigger('click:carousel:pager', index );
      },
      render: function() {},
      setActiveItem: function( index ) {
        this.$( '.' + this.IS_ACTIVE_CLASS ).removeClass( this.IS_ACTIVE_CLASS );
        this.$( selectors.show.pagerItem ).eq( index ).addClass( this.IS_ACTIVE_CLASS );
      }
    });

    Show.Progress = App.Views.ItemView.extend({
      template: _.template( ProgressTemplate ),
      render: function( options ) {
        this.$el.html( this.template({
          currentIndex: options.currentIndex + 1,
          numItems: options.numItems
        }) );
      }
    });

  });

});