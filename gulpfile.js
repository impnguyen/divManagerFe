(function() {
  "use strict";
  const gulp = require("gulp"),
    eslint = require("gulp-eslint"),
    clean = require("gulp-clean"),
    replace = require("gulp-replace"),
    ui5preload = require("gulp-ui5-preload"),
    prettydata = require("gulp-pretty-data"),
    gulpif = require("gulp-if"),
    connect = require("gulp-connect"),
    proxy = require("http-proxy-middleware");

  const env = {
    buildPath: "build",
    appEntry: "index.html",
    ui5Resource: "../libs/openui5-runtime-1.52.9/resources/sap-ui-core.js",
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
      "manifest.json",
      "manifest.appcache"
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
    return gulp.src(env.buildPath, { allowEmpty: true }).pipe(clean({ force: true }));
  });

  gulp.task("copy", () => {
    return gulp.src(env.copySrcFiles).pipe(gulp.dest(env.buildPath));
  });

  gulp.task("replaceSrvEndpoint", () => {
    return gulp
      .src(`${env.buildPath}/**/*`)
      .pipe(replace("localhost", env.srvBaseUrl))
      .pipe(gulp.dest("build/"));
      done();
  });

  gulp.task("replaceUi5Lib", () => {
    return gulp
      .src(`${env.buildPath}/${env.appEntry}`)
      .pipe(
        replace(
          "https://openui5.hana.ondemand.com/1.52.9/resources/sap-ui-core.js",
          env.ui5Resource
        )
      )
      .pipe(gulp.dest("build/"));
      done();
  });

  gulp.task("ui5preload", function() {
    return (
      gulp
        .src([`${env.buildPath}/**/**.+(js|xml)`])
        //.pipe(gulpif("**/*.js", uglify()))
        .pipe(gulpif("**/*.xml", prettydata({ type: "minify" })))
        .pipe(
          ui5preload({ base: `${env.buildPath}/`, namespace: "mpn.divManager" })
        )
        .pipe(gulp.dest(env.buildPath))
    );
  });

  gulp.task("connect", function() {
    connect.server({
      livereload: true,
      middleware: function(connect, opt) {
        return [
          proxy("/api", {
            target: "http://google.de",
            changeOrigin: true
          })
        ];
      }
    });
  });

  // gulp.task("default", ["connect"]);
})();
