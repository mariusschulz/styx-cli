var gulp = require("gulp");
var babel = require("gulp-babel");

var builtDir = "./built"

gulp.task("babel", function() {
    return gulp.src("src/**.js")
        .pipe(babel())
        .pipe(gulp.dest(builtDir));
});

gulp.task("babel-watch", ["babel"], function () {
    gulp.watch("src/**.js", ["babel"]);
});

gulp.task("default", ["babel-watch"]);
