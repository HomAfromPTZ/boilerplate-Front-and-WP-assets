'use strict';

module.exports = function() {
	$.gulp.task('copy_templates', function() {
		return $.gulp.src('./source/template/**/*.jade', { since: $.gulp.lastRun('copy_templates') })
			.pipe($.gulp.dest($.config.root_node + '/templates'));
	});
};
