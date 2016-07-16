'use strict';

const is = require('is'),
      prequire = require('parent-require'),
      influx = prequire('influx');

module.exports = function($opts) {
    var enabled = is.defined($opts.enabled) ? $opts.enabled : true,
        inject = $opts.inject || '$influx',
        uri = $opts.uri;

    if (enabled && (is.null(uri) || is.undefined(uri))) {
        throw new Error('URI is not defined!');
    }

    return function($$resolver, callback) {
        if (!enabled) {
            callback();
            return;
        }

        let client = influx($opts.uri || $opts.uris);
        $$resolver.add(inject, client);
        callback();
    };
};
