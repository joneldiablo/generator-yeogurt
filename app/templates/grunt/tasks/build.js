/**
 * Builds out an optimised site through minification of CSS and HTML, as well as uglification and optimisation of Javascript.
 */
'use strict';

var taskConfig = function(grunt) {
    grunt.registerTask('build', 'Build a production ready version of your site.', [
        'clean:dist',<% if (useServer) { %>
        'env:prod',<% } %>
        'injector',
        'copy:dist',
        'concurrent:compile',<% if (useKss) { %>
        'kss:dist',<% } %>
        'useminPrepare',
        'concat:generated',<% if (cssOption === 'css') { %>
        'cssmin:generated',<% } %>
        'usemin',
        'htmlmin:dist',
        'uglify',
        'clean:temp'
    ]);
};

module.exports = taskConfig;
