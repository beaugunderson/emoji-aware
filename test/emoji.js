'use strict';

import test from 'ava';

var characters = require('./fixtures/emoji-characters.js');
var emoji = require('../parsers/emoji.js');

characters.forEach(function (e) {
  test('parse one emoji ' + e, function (t) {
    t.plan(1);
    t.is(emoji.parse(e)[0], e);
  });

  test('parse two emoji ' + e + e, function (t) {
    t.plan(2);

    var result = emoji.parse(e + e);

    t.is(result[0], e);
    t.is(result[1], e);
  });

  test('parse fail on emoji with non-emoji a' + e + 'a', function (t) {
    t.plan(1);

    var result = emoji.parse(`a${e}a`);

    t.false(result);
  });
});
