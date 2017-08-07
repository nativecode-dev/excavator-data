const gulp = require('gulp')
const plugins = require('gulp-load-plugins')(gulp)

const config = {
  babel: { presets: ['es2015'] },
  package: require('./package.json'),
  typescript: require('./tsconfig.json')
}

gulp.task('build:clean', () => {
  return gulp.src(['.nyc_output', 'coverage', 'dist', 'lib'])
    .pipe(plugins.debug({ title: '[clean]' }))
    .pipe(plugins.clean())
})

gulp.task('build:js', ['build:clean'], () => {
  return gulp.src('src/**/*.js')
    .pipe(plugins.debug({ title: '[js]' }))
    .pipe(plugins.eslint())
    .pipe(plugins.babel(config.babel))
    .pipe(gulp.dest('lib'))
})

gulp.task('build:ts', ['build:clean'], () => {
  return gulp.src('src/**/*.ts')
    .pipe(plugins.debug({ title: '[ts]' }))
    .pipe(plugins.tslint())
    .pipe(plugins.typescript(config.typescript.compilerOptions))
    .pipe(gulp.dest('lib'))
})

gulp.task('build', ['build:js', 'build:ts'])
gulp.task('clean', ['build:clean'])
