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
           importPath: '<%= app %>/bower_components/normalize-scss/sass/',
           outputStyle: 'expanded',
           boring: true,
           sassDir: '<%= app %>/scss/',
           cssDir: '<%= app %>/css/',
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
    cachebreaker: {
      dev: {
          options: {
              match: ['app.*.js', 'app.*.css'],
              position: 'overwrite',
              replacement: 'md5',
              src: {
                  path: '<%= dist%>/js/app.min.js', path: '<%= dist%>/css/app.min.css'
              }
          },
          files: {
              src: ['<%= dist%>/index.html']
          }
      }
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
					src: ['assets/images/**', 'assets/fonts/**', '**.png', '**.ico', '**/*.html','*.xml', '**/*.php', '!**/*.scss', '!bower_components/**', '!node_modules/**', 'data/**'],
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
    svgstore: {
      options: {
        prefix : 'icon-',
        cleanup: true, 
        formatting: true, 
        includeTitleElement: true, 
        svg: {
          style: "display: none"
        }
      },
      default : {
          files: {
            '<%= app %>/assets/images/svg-icon-defs.svg': ['<%= app %>/assets/images/icons/*.svg'],
          }
        }
      },
    ngconstant: {
      options: {
        name: 'constants',
        space: ' ',
        wrap: true
      },
      development:{
        options: {
          dest: '<%= app %>/js/constants/env.js'
        },
        constants: {
          ENV: grunt.file.readJSON('env-config/dev.json')
        }
      },
      sandbox: {
        options: {
          dest: '<%= app %>/js/constants/env.js'
        },
        constants: {
          ENV: grunt.file.readJSON('env-config/sandbox.json')
        }
      },
      production: {
        options: {
          dest: '<%= app %>/js/constants/env.js'
        },
        constants: {
          ENV: grunt.file.readJSON('env-config/prod.json')
        }
      }
    },
    toggleComments: {
      file: {'<%= dist %>/app.min.js' : '<%= dist %>/app.min.js'}
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
				tasks: ['compass:dist', 'ngconstant:development']
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
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-cache-breaker');
    grunt.registerTask('default', ['bower-install', 'svgstore', 'compass:dist', 'connect:app', 'watch']);
    

    //
    // Register Combinations into single tasks and rename a few
    //
    grunt.registerTask('bower-install', ['wiredep']);
    grunt.registerTask('default', ['bower-install', 'compass:dist', 'ngconstant:development', 'connect:app', 'watch']);
    grunt.registerTask('validate-js', ['jshint']);


    //
    // For Development
    //
    grunt.registerTask('publish-dev', ['bower-install', 'compass', 'clean:dist', 'ngconstant:development', 'useminPrepare', 'copy:dist', 'concat', 'cssmin', 'uglify', 'usemin', 'toggleComments', 'cachebreaker:dev']);


    //
    // For Sandbox
    //
    grunt.registerTask('publish-sandbox', ['bower-install', 'compass', 'clean:dist', 'ngconstant:sandbox', 'useminPrepare', 'copy:dist', 'concat', 'cssmin', 'uglify', 'usemin', 'toggleComments', 'cachebreaker:dev']);



    //
    // For Production
    //
    grunt.registerTask('publish-prod', ['bower-install', 'compass', 'clean:dist', 'ngconstant:production', 'useminPrepare', 'copy:dist', 'concat', 'cssmin', 'uglify', 'usemin', 'toggleComments', 'cachebreaker:dev']);

};

