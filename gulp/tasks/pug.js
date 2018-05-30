'use strict';

module.exports = function() {
	$.gulp.task('pug', function() {
		return $.gulp.src($.path.template)
			.pipe($.gp.pug({ pretty: '\t' }))
			.on('error', $.gp.notify.onError(function(error) {
				return {
					title: 'Pug',
					message:  error.message
				}
			 }))
			.pipe($.gulp.dest($.config.root))
			.pipe($.gulp.dest($.config.root_php + '/templates'));
	});
};
