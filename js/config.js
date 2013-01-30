require.config({
  baseUrl: '.',
  paths: {
    zepto: 'js/lib/zepto.min',
    backbone: 'js/lib/backbone.min',
    lodash: 'js/lib/lodash.min',
    'views': 'js/src/views',
    'collections': 'js/src/collections',
    'models': 'js/src/models'
  },
  shim: {
    lodash: {
      exports: '_'
    },
    backbone: {
      deps: ["lodash", "zepto"],
      exports: "Backbone"
    }
  }
});