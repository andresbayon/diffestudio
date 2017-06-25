const imagemin = require('imagemin')

const imageminJpegtran = require('imagemin-jpegtran')

const imageminPngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')
const imageminGifsicle = require('imagemin-gifsicle')

imagemin(['src/images/*.{jpg,png,gif,svg}'], 'build/images', {
  plugins: [
    imageminJpegtran(),
    imageminPngquant({quality: '65-80'}),
    imageminSvgo({ plugins: [{ removeViewBox: false }] }),
    imageminGifsicle()
  ]
}).then(files => {
  console.log(files)
})
