const gulp = require("gulp");
const eslint = require("gulp-eslint");

gulp.task("lint", () => {
  return gulp
    .src(["**/*.js", "!node_modules/**"])
    .pipe(eslint({configFile: '.eslintrc'}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
