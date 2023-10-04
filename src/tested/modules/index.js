const ChildRouter = require('express').Router();
const CONTROLLER = require('./controller');

module.exports = (function() {
    ChildRouter.get('/ping', CONTROLLER['ping']);
    return ChildRouter;
})();