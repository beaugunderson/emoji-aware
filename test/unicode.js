'use strict';

import test from 'ava';

var characters = require('./fixtures/emoji-characters.js');
var unicode = require('../parsers/unicode-and-emoji.js');

test('parse string that includes emoji', t => {
  t.plan(characters.length * 7);

  characters.forEach(function (e) {
    var result = unicode.parse(`abcd${e}fg`);

    t.is(result[0], 'a');
    t.is(result[1], 'b');
    t.is(result[2], 'c');
    t.is(result[3], 'd');
    t.is(result[4], e);
    t.is(result[5], 'f');
    t.is(result[6], 'g');
  });
});
