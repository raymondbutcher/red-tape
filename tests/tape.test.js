'use strict';

var test = require('tape'),
    expect = require('chai').expect;

test('showing sub-tests', function showingSubTests(t) {

    t.doesNotThrow(function firstSubTest() {
        expect(true).to.be.true;
        expect('thing').to.equal('thing');
    }, 'first sub-test');

    t.doesNotThrow(function secondSubTest() {
        expect(false).to.be.true;
    }, 'second sub-test');

    t.end();

});

test('showing assertions', function showingAssertions(t) {

    var value1 = true;
    expect(value1).to.be.true;
    t.pass('value1');

    var value2 = false;
    if (value2) {
        t.pass('value2');
    } else {
        t.fail('value2');
    }

    var value3 = 'thing';
    t.assert(value3, 'value3');

    t.doesNotThrow(function () {
        var value4 = false;
        expect(value4).to.be.true;
    }, 'value4');

    t.end();
});

// tape doesn't handle this
// test('showing error handling', function showingErrorHandling(t) {
//
//     asd
//
// });

test('showing success', function showingSuccess(t) {

    t.pass('one')
    t.pass('two')
    t.pass('three')
    t.pass('four')

});
