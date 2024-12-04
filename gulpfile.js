// Gulp
const {src, dest, watch, parallel} = require("gulp");
const plumber = require("gulp-plumber");

// SASS
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");

// CSS
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");

// JS
const js = require("gulp-terser-js");

// Images

const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const avif = require("gulp-avif");
const webp = require("gulp-webp");

// Compilar SASS
function compilar_sass(done) {
    src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/css"));
    done();
}
exports.compilar_sass_ = compilar_sass;

// Optimizar JS
function optimizar_js(done) {
    src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(js())
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/js"));
    done();
}
exports.optimizar_js_ = optimizar_js;

// Ver por cambios en archivos SASS y JS
function observar(done) {
    watch("src/scss/**/*.scss", compilar_sass);
    watch("src/js/**/*.js", optimizar_js);
    done();
}
exports.observar_ = observar;

// Minimizar imágenes
function optimizar_imagenes(done) {
    const parametros = {
        optimizationLevel: 3,
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(cache(imagemin(parametros)))
        .pipe(dest("build/img"));
    done();
}
exports.optimizar_imagenes_ = optimizar_imagenes;

// Convertir a webp
function convertir_webp(done){
    const parametros = {
        quality: 50,
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(webp(parametros))
        .pipe(dest("build/img"));
    done();
}
exports.convertir_webp_ = convertir_webp;

//Convertir a avif
function convertir_avif(done) {
    const parametros = {
        quality: 50,
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(avif())
        .pipe(dest("build/img"));
    done();
}
exports.convertir_avif_ = convertir_avif;

// Tarea principal

exports.todas_ = parallel(convertir_avif, convertir_webp, optimizar_imagenes, compilar_sass, optimizar_js, observar);