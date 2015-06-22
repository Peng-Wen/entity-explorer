var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var EntityStore = _.assign({}, EventEmitter.prototype, {

});

module.exports = EntityStore;
