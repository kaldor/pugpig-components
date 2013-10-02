// Generated on 2013-09-17 using generator-pugpig 2.0.0
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var distRoot = 'dist',
    yeomanConfig = {
      app: 'app',
      dist: {
        'static': distRoot + '/pugpig-stylist-static',
        'theme': distRoot + '/pugpig-stylist-theme'
      }
    };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:server']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/**/*.css'],
        tasks: ['copy:styles']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/static/*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      casper: {
        files: ['test/functional/**/*.js'],
        tasks: ['casper']
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      'static': {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist['static'])
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>/static'
      }
    },
    clean: {
      'static': {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist.static %>/*',
            '!<%= yeoman.dist.static %>/.git*'
          ]
        }]
      },
      theme: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist.theme %>/*',
            '!<%= yeoman.dist.theme %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    compass: {
      'static': {
        options: {
          config: '.compass.rb'
        }
      },
      theme: {
        options: {
          config: '.compass.rb'
        }
      },
      server: {
        options: {
          config: '.compass.rb'
        }
      }
    },
    imagemin: {
      'static': {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist.static %>/images'
        }]
      },
      theme: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist.theme %>/images'
        }]
      }
    },
    svgmin: {
      'static': {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist.static %>/images'
        }]
      },
      theme: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist.theme %>/images'
        }]
      }
    },
    cssmin: {
      'static': {
        expand: true,
        cwd: '<%= yeoman.dist.static %>/styles',
        src: ['*.css'],
        dest: '<%= yeoman.dist.static %>/styles',
        ext: '.css'
      },
      theme: {
        expand: true,
        cwd: '<%= yeoman.dist.theme %>/styles',
        src: ['*.css'],
        dest: '<%= yeoman.dist.theme %>/styles',
        ext: '.css'
      }
    },
    copy: {
      'static': {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist.static %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/*.css',
            'static/**/*',
            'fonts/*'
          ]
        }]
      },
      theme: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist.theme %>',
          src: [
            '*.{php,info,png}',
            'images/{,*/}*.{webp,gif}',
            'styles/*.css',
            'fonts/*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      static_scripts: {
        expand: true,
        dot: true,
        cwd: '.tmp/scripts',
        dest: '<%= yeoman.dist.static %>/scripts',
        src: '{,*/}*.js'
      },
      theme_scripts: {
        expand: true,
        dot: true,
        cwd: '.tmp/scripts',
        dest: '<%= yeoman.dist.theme %>/scripts',
        src: '{,*/}*.js'
      },
      static_bower_components: {
        expand: true,
        dot: true,
        cwd: '.tmp/bower_components',
        dest: '<%= yeoman.dist.static %>/bower_components',
        src: '**/*'
      },
      theme_bower_components: {
        expand: true,
        dot: true,
        cwd: '.tmp/bower_components',
        dest: '<%= yeoman.dist.theme %>/bower_components',
        src: '**/*'
      }
    },
    concurrent: {
      server: [
        'compass',
        'copy:styles'
      ],
      'static': [
        'compass',
        'imagemin:static',
        'svgmin:static'
      ],
      theme: [
        'compass',
        'imagemin:theme',
        'svgmin:theme'
      ]
    },
    replace: {
      update_version: {
        src: ['<%= yeoman.dist.theme %>/stylist.info'],
        overwrite: true,
        replacements: [{
          from: /version\s*=\s*".*?"/g,
          to: "version =\"7.x-<%= grunt.config('meta-version').toString().replace(/\.([^\.]*)$/g, '_$1') %>\""
        }]
      }
    },
    casper : {
      options : {
        test : true,
        'log-level' : 'warning',
        'fail-fast' : true
      },
      src: ['test/functional/*.js']
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist.static %>'
      },
      html: '<%= yeoman.app %>/static/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%= yeoman.dist.static %>']
      },
      html: ['<%= yeoman.dist.static %>/static/{,*/}*.html']
    },
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // `name` and `out` is set by grunt-usemin
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          findNestedDependencies: true
        }
      }
    },
    rename: {
      bower_components: {
        files: [{
          src: [ distRoot + '/bower_components' ],
          dest: '.tmp/bower_components'
        }]
      },
      scripts: {
        files: [{
          src: [ distRoot + '/scripts' ],
          dest: '.tmp/scripts'
        }]
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:static:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'useminPrepare',
    'build:theme',
    'build:static',
    'requirejs',
    'uglify',
    'usemin',
    'rename',
    'copy:static_scripts',
    'copy:theme_scripts',
    'copy:static_bower_components',
    'copy:theme_bower_components',
    'clean:server'
  ]);

  grunt.registerTask('build:theme', [
    'clean:theme',
    'concurrent:theme',
    'copy:theme',
    'cssmin:theme',
    'describe',
    'replace:update_version'
  ]);

  grunt.registerTask('build:static', [
    'clean:static',
    'concurrent:static',
    'copy:static',
    'cssmin:static'
  ]);

  // TODO: npm module that performs this task
  grunt.registerTask('describe', 'Describes current git commit', function (prop) {

    var done = this.async();

    grunt.log.write('Describe current commit: ');

    grunt.util.spawn({
      cmd: 'git',
      args: [ 'describe', '--tags', '--abbrev=0', '--match', '[0-9]*' ]
    }, function (err, result) {

      var latestVersion = err ? '0.0.0' : result.toString().trim();

      grunt.util.spawn({
        cmd : 'git',
        args : [ 'describe', '--tags', '--abbrev=0', '--exact-match', 'HEAD' ]
      }, function (err, result) {

        if (err || latestVersion !== result) {
          latestVersion = latestVersion + '_dev';
        }

        grunt.util.spawn({
          cmd : 'git',
          args : [ 'diff', '--shortstat' ]
        }, function (err, result) {
          if (err) {
            grunt.log.error(err);
            return done(false);
          }

          if ( result.toString().trim().length ) {
            latestVersion = latestVersion + '_local';
          }

          grunt.config(prop || 'meta-version', latestVersion);

          grunt.log.ok(latestVersion);

          done( latestVersion );

        });

      });

    });

  });

  grunt.registerTask('default', [
    'build'
  ]);

};
