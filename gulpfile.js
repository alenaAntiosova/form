const gulp = require(`gulp`);
const rename = require(`gulp-rename`);
const imagemin = require(`gulp-imagemin`);
const webp = require(`gulp-webp`);
const svgstore = require(`gulp-svgstore`);

gulp.task(`images`, function () {
  return gulp.src(`source/img/**/*.{png,jpg,svg}`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))

    .pipe(gulp.dest(`source/img`));

});

gulp.task(`webp`, function () {
  return gulp.src(`source/img/**/*.{png,jpg}`)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(`source/img`));
});

gulp.task(`sprite`, function () {
  return gulp.src(`source/img/*.svg`)
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename(`sprite_auto.svg`))
    .pipe(gulp.dest(`source/img`));
});
