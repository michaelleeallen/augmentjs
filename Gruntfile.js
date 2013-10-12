module.exports = function(grunt) 
{
	var coffeeConfig = {
		compile: {
			files: {
				'dist/augment.js': 'src/augment.coffee'
			}
		}
	};

	var qUnitConfig = {
		all: ["test/**/*.html"]
	};

	grunt.initConfig({
		coffee: coffeeConfig,
		qunit: qUnitConfig
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');	
	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.registerTask('compile', ['coffee:compile']);
	grunt.registerTask('test', ['coffee:compile', 'qunit:all']);
};
