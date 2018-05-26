const path = require('path');
const del = require('del');
const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const env = require('gulp-environments');
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const less = require('gulp-less');
const jsMinify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const LessAutoprefix = require('less-plugin-autoprefix');

let development = env.development;
let production = env.production;

let autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('html-minify-popup', function () {
    gulp.src('src/popup/*.html')
        .pipe(production(htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('addon/popup/'));
});

gulp.task("js-minify-popup", () => {
    gulp.src(['./src/popup/js/control.js', './src/popup/js/option.js'])
        .pipe(development(sourcemaps.init()))
        .pipe(concat('script.min.js'))
        .pipe(production(jsMinify()))
        .pipe(development(sourcemaps.write('/maps')))
        .pipe(gulp.dest('addon/popup/js/'))
});

gulp.task("js-minify-bg", () => {
    gulp.src('./src/background.js')
        .pipe(production(jsMinify()))
        .pipe(gulp.dest('addon/'))
});

gulp.task('less', () => {
    gulp.src('./src/popup/less/style.less')
        .pipe(rename("style.min.css"))
        .pipe(development(sourcemaps.init()))
        .pipe(less({
            plugins: [autoprefix, require('less-plugin-glob')]
        }))
        .pipe(production(cleanCss()))
        .pipe(development(sourcemaps.write('/maps')))
        .pipe(gulp.dest('addon/popup/css/'))
});

gulp.task('clean', () => {
  return del(['addon/popup/css/maps', 'addon/popup/js/maps']);
});

gulp.task('watch', () => {
    gulp.watch('src/popup/*.html', ['html-minify-popup']);
    gulp.watch('src/popup/less/**/*', ['less']);
    gulp.watch(['src/popup/js/*.js'], ['js-minify-popup']);
    gulp.watch(['src/*.js'], ['js-minify-bg']);
});

gulp.task('build', ['html-minify-popup', 'less', 'js-minify-bg', 'js-minify-popup']);

gulp.task('default', ['build']);