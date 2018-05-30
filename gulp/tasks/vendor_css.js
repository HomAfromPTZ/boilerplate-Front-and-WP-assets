'use strict';

module.exports = function() {
	$.gulp.task('vendor_css', function() {
		return $.gulp.src($.path.vendorCss)
		.pipe($.gp.concatCss('vendor.css'))
		.pipe($.gp.csso())
		.pipe($.gulp.dest($.config.root + '/assets/css'))
		.pipe($.gulp.dest($.config.root_php + '/assets/css'))
	})
};
