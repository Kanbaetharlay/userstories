const routeList = require('./routes_list');

module.exports = function(app, db) {
    routeList(app, db);
}