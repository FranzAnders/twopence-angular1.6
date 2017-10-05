'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'client',
		dist: 'dist',

        express: {
            dev: {
              options: {
                  script: 'index.js',
                  port: '8080'
              }
            },
            staging: {

                options: {
                    script: 'dist/index.js',
                    port: '8080'
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
                    src: ['server/**/*', '<%= app %>/sitemap.xml', '<%= app %>/**.png', '<%= app %>/**.ico', 'index.html', 'index.js', 'package.json', 'config.rb', 'routes/**', '<%= app %>/assets/**', '<%= app %>/**/*.html', '<%= app %>/!**/*.scss', '!<%= app %>/bower_components/**' ],
                    dest: '<%= dist %>/'
                } ]
            },
        },

    		sass: {
    			dist: {
    				options: {
    					style: 'expanded', // expanded or nested or compact or compressed
    					loadPath: '<%= app %>/bower_components/foundation/scss',
    					compass: true,
    					quiet: false,
              update: true,
              lineNumbers: true
    				},
    				files: {
    					'<%= app %>/css/app.css': '<%= app %>/scss/main.scss'
    				}
    			}
    		},

        useminPrepare: {
            html: ['<%= app%>/index.html'],
            options: {
                dest: '<%= dist %>/<%= app%>',
                root: '<%= app%>'
            }
        },

        usemin: {
            html: ['<%= dist %>/<%= app%>/index.html', '!<%= app %>/bower_components/**'],
            options: {
                dirs: ['<%= dist %>/<%= app%>']
            }
        },

		    watch: {
           options: {
                livereload: true,
            },
            html: {
                files: ['<%= app %>/**/*.html']
            },
            images:  {
                files: ['<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}']

            },
            javascripts:  {

                files: ['<%= app %>/js/**/*.js']
            },
      			grunt: {
      				files: ['Gruntfile.js'],
      				tasks: ['sass']
      			},
      			sass: {
      				files: '<%= app %>/scss/**/*.scss',
      				tasks: ['sass']
      			},
            express: {
                files: ['index.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false,
                    livereload: 35729
                }
            }
		    },

        wiredep: {
            target: {
                src: [
                    '<%= app %>/index.html'
                ],
                exclude: [
                    'modernizr',
                    '/foundation'
                ]
            },
              options: {
                directory: '<%= app %>/bower_components',
                bowerJson: require('./client/bower.json')
            }
        }

	});

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('compile-sass', ['sass']);
    grunt.registerTask('bower-install', ['wiredep']);

    grunt.registerTask('default', ['compile-sass', 'bower-install', 'express:dev', 'watch']);

    // grunt.registerTask('validate-js', ['jshint']);
    // grunt.registerTask('server-dist', ['connect:dist']);
    // grunt.registerTask('publish-noimg', ['compile-sass', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'concat', 'cssmin', 'uglify','json-minify:build', 'usemin']);

    grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'useminPrepare', 'copy:dist','concat', 'cssmin', 'uglify', 'usemin']);

};
