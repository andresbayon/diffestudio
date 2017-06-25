const replace = require('replace')
const pjson = require('../package.json')

Object.getOwnPropertyNames(pjson.config).forEach((configName) => {
  console.log('Replacing {#' + configName + '} for ' + pjson.config[configName])
  replace({
    regex: '{#' + configName + '}',
    replacement: pjson.config[configName],
    paths: ['build'],
    recursive: true,
    silent: false
  })
})
