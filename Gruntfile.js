module.exports = function(grunt) {
  var timer = require("grunt-timer");
  timer.init(grunt);
  grunt.initConfig({
    files: {
      js: {
        src: ["front/2_js/main.js", "front/2_js/**/*.js"],
        vendors: ["bower_components/jquery/dist/jquery.js", "bower_components/greensock/src/minified/TweenMax.min.js"],
      },
      assets: {
        templates: "front/1_templates/",
        images: "front/4_images/",
        fonts: "front/6_fonts/"
      },
      back: {
        src: "back/services"
      }
    },
    sass: {
      options: {
        sourceMap: false,
        outputStyle: 'extended',
        includePaths: ['bower_components/compass-mixins/lib/', 'bower_components/susy/sass/', 'front/3_sass']
      },
      dist: {
        files: [{

          expand: true, // Enable dynamic expansion.
          cwd: 'front/3_sass/', // Src matches are relative to this path.
          src: ['**/*.scss'], // Actual pattern(s) to match.
          dest: 'generated/static/css', // Destination path prefix.
          ext: '.css', // Dest filepaths will have this extension.
          extDot: 'first' // Extensions in filenames begin after the first dot
        }, ],
      }
    },
    sync: {
      images: {
        files: [{
          cwd: '<%= files.assets.images %>',
          src: ['**'],
          dest: 'generated/static/images'
        }],
        verbose: true
      },
      templates: {
        files: [{
          cwd: '<%= files.assets.templates %>',
          src: ['**'],
          dest: 'generated/static/'
        }],
        verbose: true
      },
      fonts: {
        files: [{
          cwd: '<%= files.assets.fonts %>',
          src: ['**'],
          dest: 'generated/static/fonts'
        }],
        verbose: true
      },
      back: {
        files: [{
          cwd: '<%= files.back.src %>',
          src: ['**'],
          dest: 'generated/services/'
        }],
        verbose: true
      }
    },
    uglify: {
      generated: {
        options: {
          mangle: {
            except: ['jQuery', 'TweenMax']
          },
          sourceMap: true,
          sourceMapName: 'generated/static/sourcemap.map',
          sourceMapIncludeSources: true
        },
        src: ["<%= files.js.vendors %>", "<%= files.js.src %>"],
        dest: "generated/static/js/front.min.js"
      }
    },
    'http-server': {
      static: {
        // the server root directory
        root: 'generated/static',
        port: 8081,
        // port: function() { return 8282; }
        host: "127.0.0.1",
        cache: 60,
        showDir: true,
        autoIndex: true,
        // server default file extension
        ext: "html",
        // run in parallel with other tasks
        runInBackground: true
      }

    },
    'compile-handlebars': {
      globalTemplate: {
        template: 'front/1_templates/pages/**/*.hbs',
        templateData: 'front/1_templates/datas/pages/**/*.json',
        output: 'generated/static/*.html',
        partials: 'front/1_templates/partials/**/*.hbs',
        registerFullPath: false,
        globals: [
          'front/1_templates/datas/globals.json'
        ]
      }
    },
    'clean': ["generated"],
    watch: {
      options: {
        livereload: true
      },
      templates: {
        files: ["<%= files.assets.templates %>/**/*.hbs"],
        tasks: ["compile-handlebars"]
      },
      js: {
        files: ["<%= files.js.src %>"],
        tasks: ["newer:uglify:generated"]
      },
      sass: {
        files: ["app/3_sass/**/*.scss"],
        tasks: ["sass:dist"]
      }
    },
    scp: {
      options: {
        host: '172.16.20.222',
        username: 'user',
        password: 'bizz$user'
      },
      static: {
        files: [{
          cwd: 'generated/static',
          src: '**/*',
          filter: 'isFile',
          // path on the server
          dest: '/home/user/thot/static/'
        }]
      }
    }
  });
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['sass:dist', 'sync:images', 'sync:fonts', 'sync:back', 'compile-handlebars:globalTemplate', 'uglify:generated', 'http-server', 'watch']);
  grunt.registerTask('build', ['clean', 'sass:dist', 'sync:images', 'sync:fonts', 'sync:back', 'compile-handlebars:globalTemplate', 'uglify:generated']);
  grunt.registerTask('deploy_static', ['build', 'scp:static']);
}
