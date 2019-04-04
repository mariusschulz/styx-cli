var gulp = require("gulp");
var gulpBabel = require("gulp-babel");

var libDir = "./lib";

function babel() {
  return gulp
    .src("src/**/*.js")
    .pipe(
      gulpBabel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(gulp.dest(libDir));
}

function babelWatch() {
  gulp.watch("src/**.js", babel);
}

gulp.task("babel", babel);
gulp.task("babel-watch", babelWatch);
gulp.task("default", babelWatch);
