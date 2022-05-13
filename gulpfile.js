import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";
// import htmlmin from "gulp-htmlmin";
// import terser from "gulp-terser";
import squoosh from "gulp-libsquoosh";
import svgo from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import del from "del";
import browser from "browser-sync";

// Styles

export const styles = () => {
  return gulp
    .src("source/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

// HTML

const html = () => {
  return gulp.src("source/*.html").pipe(gulp.dest("build"));
};

// Scripts

const scripts = () => {
  return gulp
    .src("source/js/script.js")
    .pipe(gulp.dest("build/js"))
    .pipe(browser.stream());
};

// Images

const optimizeImages = () => {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"));
};

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg}").pipe(gulp.dest("build/img"));
};

// WebP

const createWebp = () => {
  return gulp
    .src("source/img/content/*.{png,jpg}")
    .pipe(
      squoosh({
        webp: {},
      })
    )
    .pipe(gulp.dest("build/img/content"));
};

// SVG

const svg = () =>
  gulp
    .src(["source/img/*.svg", "!source/img/icons/*.svg"])
    .pipe(svgo())
    .pipe(gulp.dest("build/img"));

const sprite = () => {
  return gulp
    .src("source/img/sprite/*.svg")
    .pipe(svgo())
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

// Copy

const copy = (done) => {
  gulp
    .src(["source/fonts/*.{woff2,woff}", "source/*.ico"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
  done();
};

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Reload

const reload = (done) => {
  browser.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/script.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(styles, html, scripts, svg, sprite, createWebp)
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(styles, html, scripts, svg, sprite, createWebp),
  gulp.series(server, watcher)
);

// import gulp from 'gulp';
// import plumber from 'gulp-plumber';
// import sass from 'gulp-dart-sass';
// import postcss from 'gulp-postcss';
// import autoprefixer from 'autoprefixer';
// import browser from 'browser-sync';

// // Styles

// export const styles = () => {
//   return gulp.src('source/sass/style.scss', { sourcemaps: true })
//     .pipe(plumber())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
//     .pipe(browser.stream());
// }

// // Server

// const server = (done) => {
//   browser.init({
//     server: {
//       baseDir: 'source'
//     },
//     cors: true,
//     notify: false,
//     ui: false,
//   });
//   done();
// }

// // Watcher

// const watcher = () => {
//   gulp.watch('source/sass/**/*.scss', gulp.series(styles));
//   gulp.watch('source/*.html').on('change', browser.reload);
// }

// export default gulp.series(
//   styles, server, watcher
// );
