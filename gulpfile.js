var gulp = require('gulp');


var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

var configServer = {root:'app/',port:8888};


gulp.task('lint',function(){

	gulp.src(['./app/**/*.js','!./app/bower_components/**'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(jshint.reporter('fail'));
});

gulp.task('clean',function(){
	gulp.src('./dist/*')
	.pipe(clean({force:true}));
});

gulp.task('minify-css',function(){
	var opts = {comments:true,spare:true};
	gulp.src(['./app/**/*.css','!./app/bower_components/**'])
	.pipe(minifyCss(opts))
	.pipe(gulp.dest('./dist/'));

});

gulp.task('minify-js',function(){
	gulp.src(['./app/**/*.js','!./app/bower_components/**'])
	.pipe(uglify({
		// inSourceMap:
		// outSourceMap : "app.js.map"
	}))
	.pipe(gulp.dest('./dist/'));

});

gulp.task('copy-bower-components',function(){
	gulp.src('./app/bower_components/**')
	.pipe(gulp.dest('./dist/bower_components'));
});

gulp.task('copy-html-file',function(){
	gulp.src('./app/**/*.html')
	.pipe(gulp.dest('./dist/'))
});

gulp.task('connect',function(){
	connect.server(configServer);
});

gulp.task('connectDist',function(){
	connect.server({root:'dist/',port:9999});
});

gulp.task('default',['lint','connect']);

gulp.task('build',function(){
	runSequence(['clean'],['lint','minify-css','minify-js','copy-html-file','copy-bower-components','connectDist'])
});