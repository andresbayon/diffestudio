const gm = require('gm');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const imageminGifsicle = require('imagemin-gifsicle');
const imgParams = require('../package.json').config.images;

imagemin(['src/images/*.{jpg,png,gif,svg}'], 'build/images', {
  plugins: [
    imageminJpegtran(),
    imageminPngquant({ quality: '65-80' }),
    imageminSvgo({ plugins: [{ removeViewBox: false }] }),
    imageminGifsicle()
  ]
}).then(files => {
  for (let len = files.length; len--;) {
    if (/\.svg|gif$/.test(files[len].path)) {
      console.log('> Generada imagen', files[len].path);
    } else if (/\.jpg|jpeg|png$/.test(files[len].path)) {
      for (let len2 = imgParams.length, dest = null; len2--;) {
        dest = files[len].path.replace(/(build\/images\/)(.*)(\..*)$/, (str, path, name, ext) => {
          return path + name + imgParams[len2].postfix + ext;
        });
        gm(files[len].data)
        .resize(imgParams[len2].width, imgParams[len2].height, '!')
        .write(dest, err => {
          if (err) {
            console.error(err);
          } else {
            console.log('> Generada imagen', dest);
          }
        });
      }
    }
  }
});
