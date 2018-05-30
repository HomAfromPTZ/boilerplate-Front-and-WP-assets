'use strict';

module.exports = function() {
	$.gulp.task('js_process', function() {
		var sourcePath = $.path.app.src,
			bundles = $.path.app.bundles;

		var bundled = bundles.map(function(bundle){
			return $.browserify([sourcePath+bundle])
			.bundle()
			.pipe($.vinyl(bundle))
			.on('error', $.gp.notify.onError(function(error) {
				return {
					title: 'JS Bundle',
					message:  error.message
				}
			 }))
			.pipe($.buffer())
			.pipe($.gp.sourcemaps.init())
			.pipe($.gp.babel())
			.pipe($.gp.uglify())
			.pipe($.gp.sourcemaps.write())
			.pipe($.gulp.dest($.config.root + '/assets/js'))
			.pipe($.gulp.dest($.config.root_php + '/assets/js'));
		});

		return $.merge(bundled);
	})
};
