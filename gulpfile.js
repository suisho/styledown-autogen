var gulp = require('gulp');
var to5 = require('gulp-6to5');

gulp.task('default', function () {
  gulp.watch("src/*.js", function(){
    return gulp.src('src/*.js')
      .pipe(to5({loose : "all"}).on("error",console.log))
      .pipe(gulp.dest('dist'));
  })
});