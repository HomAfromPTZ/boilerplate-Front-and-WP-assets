'use strict';

module.exports = function() {
	$.gulp.task('js_lint', function() {
		var sourcePath = $.path.app.src;

		return $.gulp.src(sourcePath+"**/*.js")
			.pipe($.gp.eslint())
			.pipe($.gp.eslint.format());
	})
};
