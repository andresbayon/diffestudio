const fs = require('fs');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const walk = require('walk');
const ejs = require('ejs');
const htmlmin = require('htmlmin');
const imgBP = require('../package.json').config.breakpoints;

const walker = walk.walk('src/pages');

const writeFile = (dest, string, next) => {
  mkdirp(getDirName(dest), (err) => {
    if (err) {
      console.error('> Error', err);
    } else {
      fs.writeFile(dest, string, 'utf-8', (err) => {
        if (err) {
          console.error('> Error al escribir el fichero:', err);
        } else {
          console.log('> Creado fichero en', dest);
        }
      });
    }
    next();
  });
};

const parseFile = (path, stats, string, next) => {
  const isEJS = /\.ejs$/.test(stats.name);
  const root = path + '/' +  stats.name;
  const relPath = /^src\/pages\/*(.*?)$/.exec(path)[1];
  const dest = 'build' + ((relPath !== '') ? '/' : '') + relPath + ((isEJS) ? '/index.html' : '/' + stats.name);
  if (isEJS) {
    ejs.renderFile(root, {
      images: imgBP
    }, (err, result) => {
      if (err) {
        console.error('Error en EJS:', root, err);
      }
      writeFile(dest, htmlmin(result, {
        collapseWhitespace: true
      }), next);
    })
  } else {
    writeFile(dest, string, next);
  }
};

walker.on('file', (path, stats, next) => {
  fs.readFile('src/pages/' + stats.name, 'utf-8', (err, str) => {
    parseFile(path, stats, str, next);
  });
 });

 walker.on('errors', (root, nodeStatsArray, next) => {
   console.error('> Error al recorrer el directorio de páginas.', root, nodeStatsArray);
   next();
 });

 walker.on('end', () => {
   console.log('> Directorio de páginas recorrido con éxito.');
 });
