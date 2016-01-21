'use strict';

import test from 'ava';

var characters = require('./fixtures/emoji-characters.js');
var emoji = require('../parsers/emoji.js');

characters.forEach(function (e) {
  test('parseOne emoji ' + e, function (t) {
    t.plan(1);
    t.is(emoji.parseOne(e), e);
  });
});

test('parseOne fail non-emoji', function (t) {
  t.plan(1);

  t.false(emoji.parseOne('a'));
});
