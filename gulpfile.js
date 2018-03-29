(function() {
  "use strict";
  const gulp = require("gulp");
  const eslint = require("gulp-eslint");
  const clean = require("gulp-clean");
  const replace = require("gulp-replace");

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
})();
