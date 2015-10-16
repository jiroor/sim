'use strict'

import gulp from 'gulp'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'

gulp.task('uglify', () => {
  gulp.src('sim.js')
    .pipe(uglify())
    .pipe(rename('sim.min.js'))
    .pipe(gulp.dest('./'))
})

gulp.task('default', ['uglify'])
