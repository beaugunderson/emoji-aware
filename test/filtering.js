'use strict';

import test from 'ava';

var characters = require('./fixtures/emoji-characters.js');
var utilities = require('../emoji-aware.js');

test('onlyEmoji fail broken string', t => {
  t.plan(1);

  var result = utilities.onlyEmoji('\uDC00\uDC01');

  t.false(result);
});

test('withoutEmoji fail broken string', t => {
  t.plan(1);

  var result = utilities.withoutEmoji('\uDC00\uDC01');

  t.false(result);
});

test('onlyEmoji', t => {
  t.plan(characters.length);

  characters.forEach(function (e) {
    var result = utilities.onlyEmoji(`abcd${e}fg`);

    t.same(result, [e]);
  });
});

test('withoutEmoji', t => {
  t.plan(characters.length);

  characters.forEach(function (e) {
    var result = utilities.withoutEmoji(`abcd${e}fg`);

    t.same(result, ['a', 'b', 'c', 'd', 'f', 'g']);
  });
});
