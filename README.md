# red-tape

red-tape extends [tape](https://github.com/substack/tape) to support
generators and assertion errors such as those thrown by
[chai](https://github.com/chaijs/chai).

## Features

* Supports generators, promises, etc, using [co](https://github.com/tj/co)
* Catches errors rather than relying on assertion methods
* Shows stack traces for easy bug finding

## Works well with

* Assertion libraries:
    * [chai](https://github.com/chaijs/chai)
* TAP formatters:
    * [colortape](https://github.com/shuhei/colortape)
    * [faucet](https://github.com/substack/faucet)
    * [tap-min](https://github.com/gummesson/tap-min)
    * [tap-summary](https://github.com/zoubin/tap-summary)

## Installation

```
npm install red-tape --save-dev
```

## Usage

```javascript
'use strict';

var test = require('..'),
    expect = require('chai').expect;

test('showing sub-tests', function* showingSubTests(t) {

    // Create sub-tests to group assertions into a single pass or fail.
    // If the sub-test finishes without error, then it passes.
    yield t.test('first sub-test', function* firstSubTest(t) {
        expect(true).to.be.true;
        expect('thing').to.equal('thing');
    });

    // If an error is thrown, then it fails.
    yield t.test('second sub-test', function* secondSubTest(t) {
        expect(false).to.be.true;
    });

    // Nesting them works too.
    yield t.test('third sub-test', function* thirdSubTest(t) {
        yield t.test('fourth sub-test', function* fourthSubTest(t) {
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

    // Regular errors are handled as failures and a traceback is shown.
    asd

});

test('showing success', function* showingSuccess(t) {

    t.pass('one')
    t.pass('two')
    t.pass('three')
    t.pass('four')

});
```

## API

### require('red-tape')

Returns the `Test.test` function, used to initiate a new test.

```javascript
const test = require('red-tape');
test('my test', function*(t) {
    test.pass('cool');
});
```

### Test.test(name, callback(t))

Runs a test. The callback is passed in a new `Test` object as `t`, and that
can be used for creating a sub-test.

```javascript
test('sub-tests', function*(t) {
    t.test('test 1', function*(t) {
        // first group of assertions
    });
    t.test('test 2', function*(t) {
        // second group of assertions
    });
});
```

### Test.pass(msg)

Records the test as passed.

```javascript
test('test.pass', function*(t) {
    t.pass('all is well');
});
```

### Test.fail(msg)

Records the test as failed.

```javascript
test('test.fail', function*(t) {
    t.fail('nothing works');
});
```

### Test.assert(value, msg)

Equivalent to:
```javascript
if (value) {
    t.pass(msg);
} else {
    t.fail(msg);
}
```

```javascript
test('test.assert', function*(t) {
    t.assert(Math.random() > 0.5, 'this might work');
});
```
