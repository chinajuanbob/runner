const gulp = require('gulp'),
	combiner = require('stream-combiner2'),
	babel = require('gulp-babel'),
	bump = require('gulp-bump'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	istanbul = require('gulp-istanbul'),
	mocha = require('gulp-mocha');

gulp.task('default', ['build', 'test'], function () {
});

gulp.task('pre-test', function () {
	var combined = combiner.obj([ 
		gulp.src(['src/**/*.js']),
		// Covering files 
		istanbul(),
		// Force `require` to return covered files 
		istanbul.hookRequire()
	]);
	combined.once('error', console.error.bind(console));
	return combined;
});
 
gulp.task('test', ['pre-test'], function () {
	var combined = combiner.obj([ 
		gulp.src(['test/**/*.js']),
		mocha(),
		// Creating the reports after tests ran 
		istanbul.writeReports(),
		// Enforce a coverage of at least 90% 
		//istanbul.enforceThresholds({ thresholds: { global: 90 } })
	]);
	combined.once('error', function (error) {
		console.error(error);
        process.exit(1);
    });
	combined.once('end', function () {
		setTimeout(function(){
			process.exit();
		}, 500);
    });
	return combined;
});

gulp.task('build', function () {
	var combined = combiner.obj([
		gulp.src('src/**/*.js'),
		jshint(),
		jshint.reporter('default'),
		babel({	presets: ['es2015'] }),
		uglify(),
		concat('index.js'),
		gulp.dest('build')
	]);
	combined.once('error', console.error.bind(console));
	return combined;
});

gulp.task('bump', function(){
	return gulp.src(['./package.json'])
		.pipe(bump({type:'patch'}))
		.pipe(gulp.dest('./'));
});