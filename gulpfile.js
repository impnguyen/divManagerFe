(function() {
  "use strict";
  const gulp = require("gulp");
  const eslint = require("gulp-eslint");
  const clean = require("gulp-clean");
  const replace = require("gulp-replace");
  const ui5preload = require("gulp-ui5-preload");
  //const uglify = require("gulp-uglify");
  const prettydata = require("gulp-pretty-data");
  const gulpif = require("gulp-if");

  const env = {
    buildPath: "build",
    appEntry: "index.html",
    srvBaseUrl: "192.168.20.20",
    copySrcFiles: [
      "*controller/**/*",
      "*css/**/*",
      "*fragments/**/*",
      "*google/**/*",
      "*i18n/**/*",
      "*icons/**/*",
      "*model/**/*",
      "*view/**/*",
      "Component.js",
      "index.html",
      "manifest.json"
    ],
    lintSrcFiles: ["**/*.js", "!node_modules/**"]
  };

  gulp.task("lint", () => {
    return gulp
      .src(env.lintSrcFiles)
      .pipe(eslint({ configFile: ".eslintrc" }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });

  gulp.task("cleanBuild", () => {
    return gulp.src(env.buildPath).pipe(clean({ force: true }));
  });

  gulp.task("copy", () => {
    gulp.src(env.copySrcFiles).pipe(gulp.dest(env.buildPath));
  });

  gulp.task("replaceSrvEndpoint", () => {
    gulp
      .src(`${env.buildPath}/**/*`)
      .pipe(replace("localhost", env.srvBaseUrl))
      .pipe(gulp.dest("build/"));
  });

  gulp.task("ui5preload", function() {
    return gulp
      .src([`${env.buildPath}/**/**.+(js|xml)`])
      //.pipe(gulpif("**/*.js", uglify()))
      .pipe(gulpif("**/*.xml", prettydata({ type: "minify" })))
      .pipe(ui5preload({ base: `${env.buildPath}/`, namespace: "mpn.divManager" }))
      .pipe(gulp.dest(env.buildPath));
  });
})();
