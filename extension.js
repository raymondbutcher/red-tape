'use strict';

var co = require('co'),
    stackTrace = require('stack-trace'),
    test = require('tape'),
    Test = require('tape/lib/test');

Test.prototype.run = co.wrap(function*() {
    if (this._skip) {
        this.end();
    } else {
        this.emit('prerun');
        try {
            yield this._cb(this);
        } catch (err) {
            this._fail_with_error(err.message, err);
        }
        this.end();
        this.emit('run');
    }
});

Test.prototype.test = function(name, cb) {
    var t = this;
    function pass() {
        t.pass(name);
    }
    function fail(err) {
        t._fail_with_error(name, err);
    }
    return co(cb(t)).then(pass, fail);
}


Test.prototype._fail_with_error = function(msg, err) {
    var trace = stackTrace.parse(err)[0];
    var at = err.stack.match(/ at (.+?\))/);
    this.emit('result', {
        id: this.assertCount++,
        ok: false,
        name: msg,
        operator: 'error',
        expected: err.expected,
        actual: {
            stack: err.stack,
            inspect: function() {
                return String(err.actual);
            }
        },
        at: at ? at[1] : undefined,
        functionName: trace.getFunctionName(),
        file: trace.getFileName(),
        line: trace.getLineNumber(),
        column: trace.getColumnNumber(),
    });
};

module.exports = test;
