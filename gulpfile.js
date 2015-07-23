var gulp = require("gulp");
var babel = require("gulp-babel");

var builtDir = "./built"

gulp.task("transpile", function() {
    return gulp.src("src/**.js")
        .pipe(babel())
        .pipe(gulp.dest(builtDir));
});

gulp.task("watch", function () {
    gulp.watch("src/**.js", ["transpile"]);
});

gulp.task("default", ["transpile", "watch"]);
