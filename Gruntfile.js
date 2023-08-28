// grunt.loadNpmTasks('grunt-contrib-watch');
// grunt.loadNpmTasks('grunt-contrib-clean');
// grunt.loadNpmTasks('grunt-contrib-uglify');
// grunt.loadNpmTasks('grunt-contrib-concat');

// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      files: {
        "dest/output.min.js": ["script.js"],
      },
    },
  },
});
