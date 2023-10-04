const Router = require('express').Router();

module.exports = (function() {
    Router.use('/tested-modules', require('./modules'));

    return Router;
})();