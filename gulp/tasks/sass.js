'use strict';

module.exports = function() {
	$.gulp.task('sass', function() {
		return $.gulp.src('./source/style/*.sass')
		.pipe($.gp.sourcemaps.init())
		.pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
		.pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
		.pipe($.gp.csso())
		.pipe($.gp.sourcemaps.write())
		.pipe($.gulp.dest($.config.root + '/assets/css'))
		.pipe($.gulp.dest($.config.root_php + '/assets/css'))
		.pipe($.browserSync.stream());
	})
};
