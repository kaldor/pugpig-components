define([
  'app',
  'apps/carousels/config'
], function( App ) {

  App.module('CarouselsApp.Show', function( Show, App, Backbone, Marionette, $, _ ) {

    var selectors = App.module( 'CarouselsApp' ).Config.selectors;

    Show.Controller = App.Controllers.Base.extend({
      initialize: function( options ) {

        this.itemIndex = _.isUndefined( options.initialIndex ) ? 0 : options.initialIndex;
        this.direction = null;
        this.grouped = _.isUndefined( options.group ) ? false : true;
        this.el = $( options.el );

        if ( this.grouped ) {

          var groupItems = this.getGroupItems(),
            numGroupItems = groupItems.length;

          this.itemHtml = this.getGroupItemHtml( groupItems );

          this.numViewItems = numGroupItems;

          this.carouselView = this.getCarouselView({
            appendTo: this.el,
            items: this.itemHtml,
            numItems: numGroupItems,
            useTemplate: true
          });

        } else {

          this.itemHtml = this.getItemHtml();

          this.calculateNumberOfViewItems();

          this.carouselView = this.getCarouselView({
            el: this.el,
            html: this.itemHtml,
            numItems: this.numViewItems
          });

        }

        this.setupCarouselView();

        this.pagerView = this.getPagerView();
        this.pagerView.setElement( this.carouselView.pagerEl );
        this.setupPagerView();

        this.progressView = this.getProgressView();
        this.progressView.setElement( this.carouselView.progressEl );
        this.setupProgressView();

        this.listenToViews();
        this.listenForCloseEvent();
      },
      getGroupItems: function() {
        return $( '[data-group="' + this.options.group + '"]' )
      },
      getGroupItemHtml: function( items ) {
        return _.map( items, function( el ) {
          return $( el ).html();
        });
      },
      listenToViews: function() {
        this.listenTo( this.carouselView, 'click:carousel:next', _.partial( this.changeItem, 'next') );
        this.listenTo( this.carouselView, 'click:carousel:prev', _.partial( this.changeItem, 'prev') );
        this.listenTo( this.carouselView, 'reset:carousel', _.partial( this.changeItem, null ) );
        this.listenTo( this.carouselView, 'resize:carousel', this.resizeCarouselView );

        this.listenTo( this.pagerView, 'click:carousel:pager', _.bind( function( index ) {
          this.itemIndex = index;
          this.changeItem();
        }, this ) );

        this.listenTo( this.carouselView, 'start:carousel:drag', _.bind( function() {
          this.carouselView.freezeItemHeights()
            .detachItems( this.itemIndex );
        }, this ) );

        this.listenTo( this.carouselView, 'end:carousel:drag', _.bind( function() {
          this.carouselView.reattachItems()
            .unfreezeItemHeights();
        }, this ) );
      },
      listenForCloseEvent: function() {
        if ( this.options.closeEvent ) {
          App.vent.on( this.options.closeEvent, _.bind( this.close, this ) );
        }
      },
      getItemHtml: function() {
        return this.el.data( 'html' );
      },
      getPagerView: function() {
        return new Show.Pager({
          numItems: this.carouselView.numItems
        });
      },
      setupPagerView: function() {
        this.pagerView.render();
      },
      getProgressView: function() {
        return new Show.Progress();
      },
      setupProgressView: function() {
        this.progressView.render({
          currentIndex: this.itemIndex,
          numItems: this.carouselView.numItems
        });
      },
      calculateNumberOfViewItems: function() {
        var items = $('<div />', {
          html: this.itemHtml
        }).find( selectors.show.items );
        this.numViewItems = this.grouped ? items.length : items.length + 1;
      },
      getCarouselView: function( options ) {
        return new Show.Carousel( options );
      },
      setupCarouselView: function() {
        this.carouselView.resizeContainerToFitItems()
          .freezeItemWidth()
          .render()
          .freezeItemWidth()
          .enableAnimation();
        if ( this.options.initialIndex ) {
          this.carouselView.disableAnimation()
            .changeItem( this.options.initialIndex );
          this.setNavigationVisibility();
        }
      },
      resizeCarouselView: function() {
        this.carouselView.disableAnimation()
          .updateContainerWidth()
          .resizeContainerToFitItems()
          .freezeItemWidth();
        this.changeItem( null );
      },
      isLastItem: function() {
        return this.itemIndex === (this.numViewItems - 1);
      },
      isFirstItem: function() {
        return this.itemIndex === 0;
      },
      hasNextItem: function() {
        return this.direction === 'next' && !this.isLastItem();
      },
      hasPrevItem: function() {
        return this.direction === 'prev' && !this.isFirstItem();
      },
      changeItem: function( direction ) {
        this.direction = direction;

        if ( !_.isNull( this.direction ) && ( this.hasNextItem() || this.hasPrevItem() ) ) {
          if ( direction === 'next' ) {
            this.itemIndex+=1;
          } else {
            this.itemIndex-=1;
          }
        }

        this.carouselView.changeItem( this.itemIndex );
        this.setNavigationVisibility();

        this.pagerView.setActiveItem( this.itemIndex );
        this.setupProgressView();
      },
      setNavigationVisibility: function() {
        if ( this.isFirstItem() ) {
          this.carouselView.hideUI( 'prevButton' );
        } else {
          this.carouselView.showUI( 'prevButton' );
        }
        if ( this.isLastItem() ) {
          this.carouselView.hideUI( 'nextButton' );
        } else {
          this.carouselView.showUI( 'nextButton' );
        }
      },
      close: function() {
        this.carouselView.close();
        this.pagerView.close();
        App.Controllers.Base.prototype.close.call( this );
      }
    });

  });

});