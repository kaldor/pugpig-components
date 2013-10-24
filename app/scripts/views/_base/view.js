define([
  'app'
], function( App ) {

  App.module( 'Views', function( Views, App, Backbone, Marionette, $, _ ) {

    var _close = Marionette.View.prototype.close;

    return _.extend( Marionette.View.prototype, {
      IS_INVISIBLE_CLASS: 'is-invisible',
      IS_LOADING_CLASS: 'is-loading',
      IS_ACTIVE_CLASS: 'is-active',
      IS_TOGGLED_CLASS: 'is-toggled',
      setInstancePropertiesFor: function() {
        var args, key, val, _ref, _results,
          __slice = [].slice;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        _ref = _.pick.apply(_, [this.options].concat(__slice.call(args)));
        _results = [];
        for (key in _ref) {
          val = _ref[key];
          _results.push(this[key] = val);
        }
        return _results;
      },
      enableAnimation: function() {
        this.$el.removeClass( this.IS_LOADING_CLASS );
        return this;
      },
      disableAnimation: function() {
        this.$el.addClass( this.IS_LOADING_CLASS );
        return this;
      },
      hideUI: function( name ) {
        var el = this.ui[ name ] || name;
        el.addClass( this.IS_INVISIBLE_CLASS );
        return this;
      },
      showUI: function( name ) {
        var el = this.ui[ name ] || name;
        el.removeClass( this.IS_INVISIBLE_CLASS );
        return this;
      },
      toggleUI: function( name ) {
        var el = this.ui[ name ] || name;
        el.toggleClass( this.IS_INVISIBLE_CLASS );
        return this;
      },
      close: function() {
        _close.call( this );
        App.vent.trigger( 'log:close:view', this );
      },
      getWidth: function() {
        return this.$el.innerWidth();
      },
      getHeight: function() {
        return this.$el.innerHeight();
      }
    });

  });

});



