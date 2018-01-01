/**
 * Requires babel-register and then requires the main server module because
 * we run on an older LTS version of node with incomplete ES6 support.
 **/
require('babel-register');
require('./server');
