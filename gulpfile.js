import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
//compilar con dartSass
const sass = gulpSass(dartSass);

/* Exportar html principal */
export function html(done) {
    src('index.html').pipe(dest('build'));
    done();
}
/* Exportar las imagenes */

export function images() {
    return src('src/img/**/*', { encoding: false }).pipe(dest('build/img'));
}

/* Exportar json */

export function data(done) {
    src('src/data/**/*').pipe(dest('build/data'));
    done();
}

/* Exporta archivos javaScript */
export function js(done) {
    src('src/js/**/*.js').pipe(dest('build/js'));
    done();
}
//funcion para calcular
export function css(done) {
    //encontrar la ubicacion de mi archivo
    src('src/scss/app.scss', { sourcemaps: true })
        //ubica el archivo y ejecuta el pipe
        .pipe(sass().on('error', sass.logError))
        //donde se almacenara
        .pipe(dest('build/css', { sourcemaps: true }));
    done();
}

export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('index.html', html);
    watch('src/img/**/*', images);
    watch('src/data/**/*', data);
}

/* Carpeta Build */
export const build = series(html, images, data, js, css);
// DEFAULT
// ======================

import browserSync from 'browser-sync';
const bs = browserSync.create();
export function server(done) {
    bs.init({
        server: {
            baseDir: 'build',
        },
    });

    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('src/index.html', html);

    watch('src/img/**/*', images).on('change', bs.reload);
    done();
}

export default series(build, server);
