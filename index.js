'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./laika.production.js');
} else {
  module.exports = require('./laika.development.js');
}
