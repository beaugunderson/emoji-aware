'use strict';

import test from 'ava';

var characters = require('./fixtures/emoji-characters.js');
var emoji = require('../parsers/emoji.js');
var isEmoji = require('../lib/is-emoji.js');

characters.forEach(function (e) {
  test('isEmoji emoji', function (t) {
    t.plan(1);

    t.true(isEmoji(e));
  });
});

test('isEmoji fail on non-emoji', function (t) {
  t.plan(1);

  t.false(isEmoji('a'));
});
