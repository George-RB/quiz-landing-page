const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer').default;
const browserSync = require('browser-sync').create();

function styles() {
  // Ищем SCSS в папке assets/css
  return src('./assets/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest('./assets/css'))
    .pipe(browserSync.stream()); // Обновляем CSS в браузере без перезагрузки
}

function html() {
  return src('./*.html').pipe(dest('./dist')).pipe(browserSync.stream());
}

function scripts() {
  return src('./assets/js/**/*.js')
    .pipe(dest('./dist/assets/js'))
    .pipe(browserSync.stream());
}

function images() {
  return src('./assets/img/**/*').pipe(dest('./dist/assets/img'));
}

function copyCss() {
  return src('./assets/css/**/*.css').pipe(dest('./dist/assets/css'));
}

function serve() {
  browserSync.init({
    server: { baseDir: './dist' }, // Сервер раздаёт папку dist
  });
  // Следим за изменениями
  watch('./assets/css/**/*.scss', styles);
  watch('./*.html', html).on('change', browserSync.reload);
  watch('./assets/js/**/*.js', scripts).on('change', browserSync.reload);
  watch('./assets/img/**/*', images).on('change', browserSync.reload);
}

exports.default = series(
  parallel(styles, html, scripts, images, copyCss),
  serve,
);
exports.build = parallel(styles, html, scripts, images, copyCss);
