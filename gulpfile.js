var gulp = require('gulp');
var react = require('gulp-react');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('scripts', () => {
    // Single entry point to browserify
    gulp.src('src/index.js')
        .pipe(browserify({
            insertGlobals : true,
            debug: false
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
});

gulp.task('build', () => {
    return gulp.src('src/app/**/*.js')
        .pipe(concat('app.js'))
        .pipe(react({harmony: false, es6module: true}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build-prod', () => {
    return gulp.src('src/app/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(react({harmony: false, es6module: true}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});

gulp.task('sass', () => {
    return gulp.src(["resources/sass/style.scss", "src/app/*/**.scss"])
        .pipe(concat("style.scss"))
        .pipe(sass())
        .pipe(gulp.dest("resources/css"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('dev', ['serve'], () => {
    gulp.watch('src/app/*/**.js', ['build']);
    gulp.watch(['resources/sass/style.scss','src/app/*/**.scss'], ['sass']);
});