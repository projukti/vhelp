var exec = require('cordova/exec');

function FirebaseCorePlugin(config, name) {

    var PLUGIN_NAME = 'FirebaseCorePlugin';

    exec(dispatchEvent, null, 'FirebaseCorePlugin', 'initialize', [config, name]);

    this.setUserProperty = function (name, value) {

        if (name) {
            exec(null, null, PLUGIN_NAME, 'setUserProperty', [name, value]);
        }
    };

    this.clearUserProperties = function() {

    };

    this.setUserId = function(id) {

    };

    this.clearUserId = function() {

    };

    this.logEvent = function (name, data) {


        var parameters = {};
        var key;

        if (typeof data !== 'object') {
            parameters.value = data
        } else {

            for (key in data) {
                parameters[key.replace(/[^\w_]+/g, '_')] = data[key];
            }
        }

        if (name) {
            exec(null, null, PLUGIN_NAME, 'logEvent', [
                name.replace(/[^\w_]+/g, '_'),
                parameters
            ]);
        }
    };

    function dispatchEvent(config) {

        var event = new Event(config.type);
        var prop;
        if (config.data) {
            for (prop in config.data) {
                event[prop] = config.data[prop];
            }
        }
        window.dispatchEvent(event);
    }
}

module.exports = FirebaseCorePlugin;