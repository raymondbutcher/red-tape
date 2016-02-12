'use strict';

var test = require('..'),
    expect = require('chai').expect,
    wait = require('co-wait');

test('showing sub-tests', function* showingSubTests(t) {

    // Create sub-tests to group assertions into a single pass or fail.
    // If the sub-test finishes without error, then it passes.
    t.test('first sub-test', function* firstSubTest(t) {
        expect(true).to.be.true;
        expect('thing').to.equal('thing');
    });

    // If an error is thrown, then it fails.
    t.test('second sub-test', function* secondSubTest(t) {
        expect(false).to.be.true;
    });

    // If tests are nested, then it ????
    t.test('third sub-test', function* thirdSubTest(t) {
        t.test('fourth sub-test', function* fourthSubTest(t) {
            t.pass('nesting');
        });
    });

});

test('showing assertions', function* showingAssertions(t) {

    // Code that doesn't throw an error will do nothing as far as
    // the test is concerned, so you can manually report a test pass.
    var value1 = true;
    expect(value1).to.be.true;
    t.pass('value1');

    // Or you can manually report passes and fails using logic.
    var value2 = false;
    if (value2) {
        t.pass('value2');
    } else {
        t.fail('value2');
    }

    // Or you can assert that the value is truthy,
    // to pass or fail accordingly.
    var value3 = 'thing';
    t.assert(value3, 'value3');

    // If any kind of error is raised in a top-level test,
    // then it will be caught and shown as a test failure.
    var value4 = false;
    expect(value4).to.be.true;

});

test('showing error handling', function* showingErrorHandling(t) {

    // Syntax errors are handled as failures and a traceback is shown.
    asd

});

test('showing success', function* showingSuccess(t) {

    t.pass('one')
    t.test('two', function*(t) {
        yield wait(500);
        t.pass('nested three');
    });
    t.test('four', function(t) {
        t.pass('nested five');
    });

});

test('showing regular functions', function showingRegularFunctions(t) {

    t.pass('one')
    t.test('two', function*(t) {
        // yield wait(500);
        t.pass('nested three');
    });
    t.test('four', function(t) {
        t.pass('nested five');
    });

});
