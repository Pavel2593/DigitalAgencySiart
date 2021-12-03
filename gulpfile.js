'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const uglify=require('gulp-uglify');
const del =require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const fileinclude = require('gulp-file-include');

const htmlPath = [
    './src/views/**/*.html',
];

const stylesPath = [
    './src/styles/main.scss',
];

const stylesLibPath = [
    './src/styles/_lib/*.css'
];

const scriptsPath = [
    './src/scripts/*.js',
    './src/modules/**/*.js'
];

const scriptsLibPath = [
    './src/scripts/lib/*.js'
];

const imagesPath = [
    './src/images/**/*.{jpg,png,svg}',
];

const fontsPath = [
    './src/fonts/*'
];


function html() {
    return gulp.src(htmlPath)
    .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
}

function styles() {
    return gulp.src(stylesPath)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./build/styles'))
    .pipe(browserSync.stream())
}


function stylesLib() {
    return gulp.src(stylesLibPath)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./build/styles/lib'))
        .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src(scriptsPath)
    .pipe(concat('index.js'))
    .pipe(uglify({
        toplevel: true
    }))
    .pipe(gulp.dest('./build/scripts'))
    .pipe(browserSync.stream())
}

function scriptsLib() {
    return gulp.src(scriptsLibPath)
    .pipe(gulp.dest('./build/scripts/lib',))
}

function images() {
    return gulp.src(imagesPath)
    .pipe(gulp.dest('./build/images'))
}

function fonts() {
    return gulp.src(fontsPath)
    .pipe(gulp.dest('./build/fonts'))
}

function clean() {
    return del(['./build'])
}

function watch() {
    browserSync.init({
        server: "./build"
    });
    gulp.watch("./src/views/**/*.html", html);
    gulp.watch("./src/modules/**/*.html", html);
    gulp.watch("./src/styles/**/*.scss", styles);
    gulp.watch("./src/modules/**/*.scss", styles);
    gulp.watch("./src/scripts/*.js", scripts);
    gulp.watch("./src/modules/**/*.js", scripts);
}

gulp.task('html', html);
gulp.task('styles', styles);
gulp.task('stylesLib', stylesLib);
gulp.task('scripts', scripts);
gulp.task('scriptsLib', scriptsLib);
gulp.task('clean', clean);
gulp.task('images', images);
gulp.task('watch', watch);
gulp.task('font', fonts);
gulp.task(
    'build',
    gulp.series(
        clean,
        gulp.parallel(
            html,
            styles,
            stylesLib,
            scripts,
            scriptsLib,
            images,
            fonts
        )
    )
);
gulp.task('develop', gulp.series('build', 'watch'));