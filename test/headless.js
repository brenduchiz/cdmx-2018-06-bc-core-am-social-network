global.window = global;
global.assert = require('chai').assert;
require('../app');
require('./data.spec.js');