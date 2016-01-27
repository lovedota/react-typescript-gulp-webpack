'use strict';

var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    del = require('del'),
    config = require('./gulpfile.config'),
    browserSync = require('browser-sync'),
    superstatic = require('superstatic'),
    typescript = require('typescript'),
    path = require('path');

/**
 * Generates file list and definition list into tsconfig.json. Atom auto do it
 */
gulp.task('gen-ts-refs', () => {
    var target = gulp.src('./tsconfig.json');
    var sources = gulp.src(
        [config.allTypeScript, config.libraryTypeScriptDefinitions],
        {read: false}
    );

    return target.pipe(inject(sources, {
        starttag: '"files": [',
        endtag: ']',
        transform(filePath, file, i, length) {
            return `'.${filePath}' ${(i + 1 < length ? ',' : '')}`;
        }
    })).pipe(gulp.dest('./'));
});


gulp.task('watch', () => {
    gulp.watch([config.allTypeScript], ['bundle']);
});

gulp.task('bundle', () => {
    return gulp
        .src(config.entry)
        .pipe(webpack({
            entry: {
                bundle: config.entry
            },
            output: {
                filename: '[name].js',
                publicPath: '/assets/'
            },
            module: {
              loaders: [
                {
                   test: /\.ts(x?)$/,
                   loaders: ['babel', 'ts'],
                   exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.scss$/,
                    loaders: ['style', 'css', 'sass']
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    loader: 'url?limit=10000'
                },
                {
                    test: require.resolve('jquery'),
                    loader: 'expose?$!expose?jQuery'
                },
                {
                    test: /\.less$/,
                    loaders: ['style', 'css', 'less']
                }
              ]
            },
            sassLoader: {
                includePaths: [path.resolve(__dirname, './node_modules')]
            },
            //devtool: 'inline-source-map',
            resolve: {
               extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
               alias: {
                   'bootstrap/js': 'bootstrap-sass/assets/javascripts/bootstrap.js',
                   'bootstrap/css': 'bootstrap-sass/assets/stylesheets/_bootstrap.scss',
                   'bootstrap-select/js': 'bootstrap-select/js/bootstrap-select.js',
                   'bootstrap-select/css': 'bootstrap-select/sass/bootstrap-select.scss'
               }
            },
            watch: true
        }))
        .pipe(gulp.dest(config.dist))
});

gulp.task('serve', () => {
    console.log('Starting browserSync and superstatic...\n');

    browserSync({
        port: 3000,
        files: ['index.html', '**/bundle.js'],
        injectChanges: true,
        logFileChanges: false,
        logLevel: 'silent',
        logPrefix: 'reactTypescript',
        notify: true,
        reloadDelay: 200,
        server: {
            baseDir: './public',
            middleware: superstatic({ debug: false })
        }
    });
});

gulp.task('default', ['serve', 'bundle']);
