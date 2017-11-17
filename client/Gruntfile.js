'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: '.',
		dist: 'dist',

     compass: {
       dist: {
         options: {
           config: 'config.rb',
           importPath: '<%= app %>/bower_components/foundation/scss',
           outputStyle: 'expanded',
           boring: true,
           sassDir: '<%= app %>/scss/*.scss',
           cssDir: '<%= app %>/css/app.css',
           basePath: '<%= app %>'
         }
       }

     },

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= app %>/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['assets/fonts/**', '**.png', '**.ico', '**/*.html','*.xml', '**/*.php', '!**/*.scss', '!bower_components/**', '!node_modules/**', 'data/**'],
					dest: '<%= dist %>/'
				} ]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: 'assets/images/',
					src: ['**/*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%= dist %>/assets/images/'
				}]
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= app %>/index.html'],
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['compass:dist']
			},
			sass: {
				files: '<%= app %>/scss/**/*.scss',
				tasks: ['compass']
			},
			livereload: {
				files: ['<%= app %>/**/*.html', '<%= app %>/data/*.json', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: 35729
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 8080,
					base: '<%= app %>/',
					livereload: 35729
            }
		},
			dist: {
				options: {
					port: 8080,
					base: '<%= dist %>/',
					keepalive: true,
					livereload: false,
				}
			}
		},

		wiredep: {
			target: {
				src: [
					'<%= app %>/**/*.html'
				],
				exclude: [
					'modernizr',
					'/foundation'
				]
			},
      options: {
          bowerJson: require('./bower.json')
      }
		}

	});



    //
    // Registering tasks
    //
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-json-minify');

    grunt.registerTask('bower-install', ['wiredep']);

    grunt.registerTask('default', ['bower-install', 'compass:dist', 'connect:app', 'watch']);
    grunt.registerTask('validate-js', ['jshint']);
    grunt.registerTask('server-dist', ['connect:dist']);


    //
    // Publish tasks
    //
    //grunt.registerTask('publish-noimg', ['compass', 'clean:dist', 'useminPrepare', 'copy:dist', 'concat', 'cssmin', 'uglify','json-minify:build', 'usemin']);
  grunt.registerTask('publish', ['bower-install', 'compass', 'clean:dist', 'useminPrepare', 'copy:dist', 'concat', 'cssmin', 'uglify', 'usemin']);

};
