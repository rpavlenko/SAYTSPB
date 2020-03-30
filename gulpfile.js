const {
  src,
  dest,
  watch,
  parallel,
  series
} = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
// const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');
const ftp = require('vinyl-ftp');

function bs() {
  serveSass();
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });

  watch("./src/*.html").on('change', browserSync.reload);
  watch("./src/sass/**/*.sass", serveSass);
  watch("./src/sass/**/*.scss", serveSass);
  watch("./src/js/*.js").on('change', browserSync.reload);
};

function serveSass() {
  return src("./src/sass/**/*.sass", "./src/sass/**/*.scss")
    .pipe(sass({
      outputStyle: 'nested',
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(dest("./src/css"))
    .pipe(browserSync.stream());
};

function buildCSS(done) {
  src('./src/css/**/**.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(dest('./dist/css/'));
  done();
}

function buildJS(done) {
  src(['./src/js/**.js', '!./src/js/**.min.js'])
    .pipe(minify({
      ext: {
        min: '.js'
      },
      noSource: true
    }))
    .pipe(dest('./dist/js/'));
  src('src/js/**.min.js')
    .pipe(dest('./dist/js/'));
  done();
}

function html(done) {
  src('./src/**.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('./dist/'));
  done();
}

function php(done) {
  src(['./src/**.php'])
    .pipe(dest('./dist/'));
  src('./src/phpmailer/**/**')
    .pipe(dest('./dist/phpmailer/'));
  done();
}

function fonts(done) {
  src('./src/fonts/**/**')
    .pipe(dest('./dist/fonts/'));
  done();
}

function imagemin(done) {
  src('src/img/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: '14F03sDB2snqDn4L9fZtwgDwxdxVGS75',
    }))
    .pipe(dest('./dist/img/'))
  src('src/img/**/*.svg')
    .pipe(dest('./dist/img/'))
  done();
}

function deploy(done) {
  var conn = ftp.create({
    host: 'rpavlenko.ru',
    user: 'justs320_gulp',
    password: 'F0m2K2p7',
    parallel: 10,
  });

  var globs = [
    'dist/**',
  ];
  return src(globs, {
      buffer: false
    })
    .pipe(conn.dest('/www/rpavlenko.ru/saytspb/'));
  done();
};

exports.serve = bs;
exports.deploy = deploy;
exports.build = series(buildCSS, buildJS, html, php, fonts, imagemin);