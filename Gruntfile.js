module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*\n' +
				' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
				' *  <%= pkg.description %>\n' +
				' *  <%= pkg.homepage %>\n' +
				' *\n' +
				' *  Copyright (c) <%= grunt.template.today("yyyy") %>\n' +
				' *  MIT License\n' +
				' */\n'
		},
		concat: {
			options: {
				banner: '<%= meta.banner %>'
			},
			dist: {
				src: ['src/jquery.github.js'],
				dest: 'dist/jquery.github.js'
			}
		},

		lintspaces: {
			all: {
				src: [
					'*', 'src/*', 'spec/*', 'demo/*', 'assets/base.css'
				],
				options: {
					newline: true,
					trailingspaces: true,
					indentation: 'tabs',
					spaces: 2
				}
			}
		},

		jasmine: {
			src: 'src/jquery.github.js',
			options: {
				specs: 'spec/*spec.js',
				helpers: 'spec/helpers/*.js',
				vendor: 'lib/jquery.min.js'
			}
		},

		jshint: {
			files: ['src/jquery.github.js'],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			my_target: {
				src: ['dist/jquery.github.js'],
				dest: 'dist/jquery.github.min.js'
			}
		},

		watch: {
			files: ['**/*'],
			tasks: ['jshint', 'concat', 'uglify'],
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-lintspaces');

	grunt.registerTask('default', ['lintspaces', 'jshint', 'concat', 'uglify']);
	grunt.registerTask('test', ['lintspaces', 'jshint', 'jasmine']);

};
