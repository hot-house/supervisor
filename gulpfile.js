var gulp = require('gulp')
var less = require('gulp-less')


gulp.task('watch-less',['less'], function() {
    gulp.watch('./src/public/styles/*.less', ['less']);  // Watch all the .less files, then run the less task
});

gulp.task('less', function () {
    return gulp.src('./src/public/styles/style.less')
    .pipe(less())
    .pipe(gulp.dest('./src/public/styles/'));
});
