'use strict';

module.exports = function() {
	$.gulp.task('vendor_js', function() {
		return $.gulp.src($.path.vendorJs)
		.pipe($.gp.concat('vendor.js'))
		.pipe($.gp.uglify())
		.pipe($.gulp.dest($.config.root + '/assets/js'))
		.pipe($.gulp.dest($.config.root_php + '/assets/js'))
	})
};
