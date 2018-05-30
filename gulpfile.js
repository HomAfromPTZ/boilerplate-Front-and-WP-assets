'use strict';

global.$ = {
	package: require('./package.json'),
	config: require('./gulp/config'),
	path: {
		fonts: require('./gulp/paths/fonts.js'),
		task: require('./gulp/paths/tasks.js'),
		template: require('./gulp/paths/template.js'),
		vendorJs: require('./gulp/paths/vendor_js_paths.js'),
		vendorCss: require('./gulp/paths/vendor_css_paths.js'),
		app: require('./gulp/paths/app.js')
	},
	gulp: require('gulp'),
	rimraf: require('rimraf'),
	browserify: require('browserify'),
	vinyl: require('vinyl-source-stream'),
	buffer: require('vinyl-buffer'),
	merge: require('merge-stream'),
	browserSync: require('browser-sync').create(),
	gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
	require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
	'clean',
	// 'sprites_svg',
	$.gulp.parallel(
		'vendor_css',
		'vendor_js',
		// 'js_lint',
		'js_process',
		'sass',
		'pug',
		'copy_fonts',
		'copy_image'
		),
	$.gulp.parallel(
		'watch',
		'serve'
		)
	));
