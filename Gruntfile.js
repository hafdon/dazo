// grunt.loadNpmTasks('grunt-contrib-watch');
// grunt.loadNpmTasks('grunt-contrib-clean');
// grunt.loadNpmTasks('grunt-contrib-uglify');
// grunt.loadNpmTasks('grunt-contrib-concat');

const DIST_DIR = "../collection.media";

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      my_target: {
        files: {
          [`${DIST_DIR}/_script.js`]: ["src/script.js"],
        },
      },
    },
    cssmin: {
      target: {
        files: {
          [`${DIST_DIR}/_style.css`]: ["src/style.css"],
        },
      },
    },
    watch: {
      files: ["src/script.js", "src/style.css"],
      tasks: ["uglify", "cssmin"],
    },
  });

  // https://github.com/clean-css/clean-css#how-to-use-clean-css-api
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  // https://github.com/mishoo/UglifyJS
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask("default", ["watch"]);
};
