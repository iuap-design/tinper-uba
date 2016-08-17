var webpack = require('webpack');
var del = require('del');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var gutil = require("gulp-util");
var zip = require('gulp-zip');


module.exports = function( gulp, webpackconfig ){

    var webpackconfig = webpackconfig;

    /**
     * 压缩css文件
     * @param  {[type]} 'style'   [description]
     * @param  {[type]} function( [description]
     * @return {[type]}           [description]
     */
    gulp.task('style',function() {
        gulp.src('./dist/style.css')
            .pipe(rename({suffix:'.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('dist'));
    });

    /**
     * 压缩js文件
     * @param  {[type]} 'script'  [description]
     * @param  {[type]} function( [description]
     * @return {[type]}           [description]
     */
    gulp.task('script',function(){
        gulp.src('./dist/*.js')
            .pipe(rename({suffix:'.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
    });

    /**
     * copy files
     * @param  {[type]} 'copy'    [description]
     * @param  {[type]} function( [description]
     * @return {[type]}           [description]
     */
    gulp.task('copy' ,function(){
        gulp.src('./src/sys/*.*')
        .pipe(gulp.dest('./dist/sys/'));
        gulp.src('./src/trd/*.*')
        .pipe(gulp.dest('./dist/trd/'))
    });

    /**
     * 执行 `webpack` 打包
     * @param  {[type]} 'webpack'         [description]
     * @param  {[type]} function(callback [description]
     * @return {[type]}                   [description]
     */
    gulp.task('webpack', function(callback) {
        var start = (new Date()).getTime();
        webpack(webpackconfig, function(err, stats){
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({
                colors:true
            }));
            var end = (new Date()).getTime();
            console.log('webpack ok! cost:' + (end-start) + 'ms');
            callback();
        })
    });

    gulp.task('war' , function() {
        gulp.src('dist/**')
            .pipe(zip('dist.war'))
            .pipe(gulp.dest('./'));

         console.info('build ok!');
    });

    gulp.task('default', ['copy'], function() {
        gulp.start('webpack');
    });

    gulp.task('test',function() {
        console.log('test suceess!')
    });

};
