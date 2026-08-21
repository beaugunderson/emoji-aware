'use strict';

const test = require('ava');

var path = require('path');

var emoji = require('../emoji-aware.js');
var isEmoji = require('../lib/is-emoji.js');

var parsimmonPath = require.resolve('parsimmon');
var parsimmonVersion = require(path.join(path.dirname(parsimmonPath), '..', 'package.json')).version;

function pollutionCheck(t, fn) {
  t.false(Object.prototype.hasOwnProperty.call(Object.prototype, '0'));
  t.false(Object.prototype.hasOwnProperty.call(Object, '0'));

  try {
    fn();
  } finally {
    delete Object.prototype[0];
    delete Object[0];
  }
}

test.serial('isEmoji does not pollute Object.prototype', function (t) {
  pollutionCheck(t, function () {
    isEmoji('__proto__');

    t.false(Object.prototype.hasOwnProperty.call(Object.prototype, '0'));
    t.is(({})[0], undefined);
    t.is([][0], undefined);
  });
});

test.serial('isEmoji does not pollute the Object constructor', function (t) {
  pollutionCheck(t, function () {
    isEmoji('constructor');

    t.false(Object.prototype.hasOwnProperty.call(Object, '0'));
  });
});

test.serial('split does not pollute Object.prototype', function (t) {
  pollutionCheck(t, function () {
    emoji.split('__proto__');

    t.false(Object.prototype.hasOwnProperty.call(Object.prototype, '0'));
  });
});

test('isEmoji rejects Object.prototype property names', function (t) {
  t.false(isEmoji('__proto__'));
  t.false(isEmoji('constructor'));
  t.false(isEmoji('toString'));
});

// Tripwire: the guard in lib/is-emoji.js exists only because parsimmon keys its
// line/column cache on a bare object, so an input of "__proto__" writes through
// to Object.prototype. If parsimmon stops doing that, delete the guard.
test.serial('parsimmon still needs the is-emoji guard', function (t) {
  var Parsimmon = require('parsimmon');

  delete Object.prototype[0];

  Parsimmon.string('a').parse('__proto__');

  var stillVulnerable = Object.prototype.hasOwnProperty.call(Object.prototype, '0');

  delete Object.prototype[0];

  t.true(stillVulnerable,
    'parsimmon ' + parsimmonVersion + ' no longer pollutes Object.prototype; ' +
    'remove the guard in lib/is-emoji.js and this test.');
});
