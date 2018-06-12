const path = require('path'),
    del = require('del'),
    gulp = require('gulp'),
    deleted = require('gulp-deleted2'),
    changed = require("gulp-changed"),
    env = require('gulp-environments'),
    htmlMin = require('gulp-htmlmin'),
    imageMin = require('gulp-imagemin');
    cssMin = require('gulp-clean-css'),
    less = require('gulp-less'),
    ts = require('gulp-typescript'),
    jsMinify = require('gulp-uglify-es').default,
    sourcemaps = require('gulp-sourcemaps'),
    LessAutoprefix = require('less-plugin-autoprefix');

let development = env.development,
    production = env.production;

let autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

let tsBgProject = ts.createProject('tsconfig.json', { outFile: 'initialize.js' });
let tsPopupProject = ts.createProject('tsconfig.json', { outFile: 'script.js' });

gulp.task('html-minify-popup', () => {
    gulp.src('src/popup/*.html')
        .pipe(deleted('dist/popup', '*.html'))
        .pipe(production(htmlMin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist/popup'));
});

gulp.task('image-minify', () =>
    gulp.src('src/icons/**')
        .pipe(deleted('dist/icons', '*'))
        .pipe(changed('dist/icons'))
        .pipe(imageMin())
        .pipe(gulp.dest('dist/icons'))
);

gulp.task("ts-minify-bg", () =>
    gulp.src(['./src/initialize.ts'])
        .pipe(development(sourcemaps.init()))
        .pipe(tsBgProject())
        .pipe(production(jsMinify()))
        .pipe(development(sourcemaps.write()))
        .pipe(gulp.dest('dist/'))
);

gulp.task("ts-minify-popup", () =>
    gulp.src(['./src/popup/ts/*.ts'])
        .pipe(development(sourcemaps.init()))
        .pipe(tsPopupProject())
        .pipe(production(jsMinify()))
        .pipe(development(sourcemaps.write()))
        .pipe(gulp.dest('dist/popup/js/'))
);

gulp.task('less', () =>
    gulp.src('./src/popup/less/style.less')
        .pipe(development(sourcemaps.init()))
        .pipe(less({
            plugins: [autoprefix, require('less-plugin-glob')]
        }))
        .pipe(production(cssMin()))
        .pipe(development(sourcemaps.write()))
        .pipe(gulp.dest('dist/popup/css/'))
);

gulp.task('style', () =>
    gulp.src('./src/style/*.less')
        .pipe(development(sourcemaps.init()))
        .pipe(less({
            plugins: [autoprefix, require('less-plugin-glob')]
        }))
        .pipe(production(cssMin()))
        .pipe(development(sourcemaps.write()))
        .pipe(gulp.dest('dist/style/'))
);

gulp.task('copy', ['clean:root', 'clean:fonts'], () => {
    gulp.src(['src/manifest.json', 'src/style/fonts/**'], {base: 'src'})
    .pipe(changed('dist'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean:fonts', () => {
    gulp.src('src/style/fonts/**', {read: false})
    .pipe(deleted('dist/style/fonts/', '**'));
});

gulp.task('clean:root', () => {
    gulp.src('src/manifest.json', {read: false})
    .pipe(deleted('dist', 'manifest.json'));
});

gulp.task('clean', ['clean:root', 'clean:fonts'], () =>
    production(del([
        'dist/style/maps',
        'dist/popup/css/maps',
        'dist/popup/js/maps'
    ]))
);

gulp.task('watch', () => {
    gulp.watch('src/popup/*.html', ['html-minify-popup']);
    gulp.watch('src/popup/less/**/*', ['less']);
    gulp.watch('src/style/*.less', ['style']);
    gulp.watch('src/popup/ts/*.ts', ['ts-minify-popup']);
    gulp.watch('src/*.ts', ['ts-minify-bg']);
    gulp.watch(['src/manifest.json', 'src/style/fonts/**'], ['copy']);
});

gulp.task('default', ['copy', 'image-minify', 'html-minify-popup', 
        'less', 'style', 'ts-minify-bg', 'ts-minify-popup']);
