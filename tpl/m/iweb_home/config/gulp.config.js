/**
 * Created by dingrf on 15/12/23.
 */

var webpack = require('webpack');
//var webpackconfig = require('./webpack.config');
var del = require('del');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var freemarker = require('gulp-freemarker');
var path = require('path');


module.exports = function(gulp, webpackconfig){
    var webpackconfig = webpackconfig;

    /**
     *  清理生产目录文件
     */
    gulp.task('clean', function(cb) {
        del(['../../dist/*.js','../../dist/*.css','../../dist/*.map','../../dist/**/*.html','../../dist/**/*.ftl','../../dist/*.woff2','../../dist/*.ttf',
            '../../dist/*.eot','../../dist/*.svg','../../dist/*.woff']).then(paths => {
            console.log('删除文件和文件夹成功\n', paths.join('\n'));
            cb();
        });
    });


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
     * copy组件目录
     */
    gulp.task('copyComp', ['clean'],function(){
        //gulp.src('./src/component/**/*.*')
        //    .pipe(gulp.dest('dist/component'))

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
     *  执行webpack打包生成html
     */
    gulp.task('webpack', function(cb) {

        //console.log("gulp webpack.entry: "+webpackconfig.entry)
        webpack(webpackconfig, cb)
        console.log('webpack ok!');
    });


    /**
     * 编译freemarker中间文件
     */
    gulp.task('freemarker',['webpack'], function(){
        console.log('freemarker ok!');
        //gulp.src('./src/mock/*.json')
        //    .pipe(freemarker({
        //        viewRoot: path.join(__dirname, "dist/"),
        //        options:{}
        //    }))
        //    .pipe(gulp.dest('dist'));

    });



    gulp.task('build', ['freemarker'], function() {
        console.log('build ok!');
        //gulp.start('style','script')
    });

    gulp.task('default', ['copyComp'], function() {
        gulp.start('build');
    });

    gulp.task('test',function() {
        console.log('test suceess!')
    });

};
