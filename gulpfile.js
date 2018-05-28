const path = require('path'),
    del = require('del'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    changed = require("gulp-changed"),
    env = require('gulp-environments'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin');
    cleanCss = require('gulp-clean-css'),
    less = require('gulp-less'),
    jsMinify = require('gulp-uglify-es').default,
    sourcemaps = require('gulp-sourcemaps'),
    LessAutoprefix = require('less-plugin-autoprefix');

let development = env.development,
    production = env.production;

let autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('html-minify-popup', () => {
    gulp.src('src/popup/*.html')
        .pipe(production(htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist/popup/'));
});

gulp.task('image-minify', () =>
    gulp.src('src/icons/**')
        .pipe(changed('dist/icons'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/icons'))
);

gulp.task("js-minify-popup", () =>
    gulp.src(['./src/popup/js/control.js', './src/popup/js/option.js'])
        .pipe(development(sourcemaps.init()))
        .pipe(concat('script.js'))
        .pipe(production(jsMinify()))
        .pipe(development(sourcemaps.write('/maps')))
        .pipe(gulp.dest('dist/popup/js/'))
);

gulp.task("js-minify-bg", () =>
    gulp.src('./src/background.js')
        .pipe(production(jsMinify()))
        .pipe(gulp.dest('dist/'))
);

gulp.task('less', () =>
    gulp.src('./src/popup/less/style.less')
        .pipe(development(sourcemaps.init()))
        .pipe(less({
            plugins: [autoprefix, require('less-plugin-glob')]
        }))
        .pipe(production(cleanCss()))
        .pipe(development(sourcemaps.write('/maps')))
        .pipe(gulp.dest('dist/popup/css/'))
);

gulp.task('copy', () => {
    function getDestPath(file, dest = 'dist') { 
        let dir = file.base.split('src').pop();
        return path.join(dest, dir);
    }

    gulp.src(['src/manifest.json', 'src/style/fonts/**'])
        .pipe(changed(getDestPath))
        .pipe(gulp.dest(getDestPath));
});

gulp.task('clean', () =>
    del(['dist/popup/css/maps', 'dist/popup/js/maps'])
);

gulp.task('watch', () => {
    gulp.watch('src/popup/*.html', ['html-minify-popup']);
    gulp.watch('src/popup/less/**/*', ['less']);
    gulp.watch(['src/popup/js/*.js'], ['js-minify-popup']);
    gulp.watch(['src/*.js'], ['js-minify-bg']);
});

gulp.task('default', ['copy', 'image-minify', 'html-minify-popup', 'less', 'js-minify-bg', 'js-minify-popup']);
