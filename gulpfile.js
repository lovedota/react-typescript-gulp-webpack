'use strict';

var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    config = require('./gulpfile.config'),
    browserSync = require('browser-sync'),
    superstatic = require('superstatic'),
    typescript = require('typescript'),
    path = require('path'),
    tsProject;

tsProject = tsc.createProject('tsconfig.json', { typescript: typescript });

/**
 * Generates file list and definition list into tsconfig.json.
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
            return `".${filePath}" ${(i + 1 < length ? ',' : '')}`;
        }
    })).pipe(gulp.dest('./'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', () => {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
        config.libraryTypeScriptDefinitions]; //reference to library .d.ts files


    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    tsResult.dts.pipe(gulp.dest(config.tsOutputPath));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', (cb) => {
    var typeScriptGenFiles = [
        config.tsOutputPath + '/**/*.js',    // path to all JS files auto gen'd by editor
        config.tsOutputPath + '/**/*.js.map', // path to all sourcemap files auto gen'd by editor
        '!' + config.tsOutputPath + '/lib'
    ];

    // delete the files
    del(typeScriptGenFiles, cb);
});

gulp.task('watch', () => {
    gulp.watch([config.allTypeScript], ['bundle']);
});

gulp.task('bundle', ['compile-ts'], () => {
    return gulp
        .src(config.allJavaScript)
        .pipe(webpack({
            entry: {
                bundle: `${config.tsOutputPath}/main.js`
            },
            output: {
                filename: '[name].js',
            },
            module: {
              loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel', // 'babel-loader' is also a legal name to reference
                    query: {
                        presets: ['react', 'es2015']
                    }
                },
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "sass"]
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    loader: 'url-loader?limit=10000'
                }
              ]
            },
            sassLoader: {
                includePaths: [path.resolve(__dirname, "./node_modules")]
            }
        }))
        .pipe(gulp.dest(config.dist))
});

gulp.task('serve', ['bundle', 'watch'], () => {
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
            baseDir: './',
            middleware: superstatic({ debug: false })
        }
    });
});

gulp.task('default', ['bundle']);
