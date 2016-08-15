/**
 * Created by dingrf on 15/12/23.
 */

var webpack = require('webpack');
//var webpackconfig = require('./webpack.config');
var del = require('del');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
//var freemarker = require('gulp-freemarker');
var path = require('path');
var gutil = require("gulp-util");
var zip = require('gulp-zip');


module.exports = function(gulp, webpackconfig){
    var webpackconfig = webpackconfig;

    ///**
    // *  清理生产目录文件
    // */
    //gulp.task('clean', function(cb) {
    //    del(['../../dist/*.js','../../dist/*.css','../../dist/*.map','../../dist/**/*.html','../../dist/**/*.ftl','../../dist/*.woff2','../../dist/*.ttf',
    //        '../../dist/*.eot','../../dist/*.svg','../../dist/*.woff']).then(paths => {
    //        console.log('删除文件和文件夹成功\n', paths.join('\n'));
    //        cb();
    //    });
    //});


    /**
     *  压缩css文件
     */
    gulp.task('style',function() {
        gulp.src('./dist/style.css')
            .pipe(rename({suffix:'.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('dist'));
    });

    /**
     *  压缩js文件
     */
    gulp.task('script',function(){
        gulp.src('./dist/*.js')
            .pipe(rename({suffix:'.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
    });

    /**
     * copy
     */
    gulp.task('copy' ,function(){
        gulp.src('./src/sys/*.*')
        .pipe(gulp.dest('./dist/sys/'));
        gulp.src('./src/trd/*.*')
        .pipe(gulp.dest('./dist/trd/'))
    });

///**
// * copy ftl
// */
//gulp.task('copyFtl', ['copyComp'],function(){
//    gulp.src('./src/ftl/**/*.*')
//        .pipe(gulp.dest('dist/ftl'))
//
//});

    /**
     *  执行webpack打包
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


    /**
     * 编译freemarker中间文件
     */
    gulp.task('freemarker',['webpack'], function(){
        // console.log('freemarker ok!');
        //gulp.src('./src/mock/*.json')
        //    .pipe(freemarker({
        //        viewRoot: path.join(__dirname, "dist/"),
        //        options:{}
        //    }))
        //    .pipe(gulp.dest('dist'));

    });

    gulp.task('war' , function() {
        gulp.src('dist/**').pipe(zip('dist.war')).pipe(gulp.dest('./'));
         console.info('build ok!');
    });

    gulp.task('build', ['freemarker'], function() {
        console.log('build ok!');
        //gulp.start('style','script')
    });

    gulp.task('default', ['copy'], function() {
        gulp.start('build');
    });

    gulp.task('test',function() {
        console.log('test suceess!')
    });

};
