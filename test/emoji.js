'use strict';

import test from 'ava';

var characters = require('./fixtures/emoji-characters.js');
var emoji = require('../parsers/emoji.js');
var isEmoji = require('../lib/is-emoji.js');

test('parse one emoji', function (t) {
  t.plan(characters.length);

  characters.forEach(function (e) {
    t.is(emoji.parse(e)[0], e);
  });
});

test('parse two emoji', function (t) {
  t.plan(characters.length * 2);

  characters.forEach(function (e) {
    var result = emoji.parse(e + e);

    t.is(result[0], e);
    t.is(result[1], e);
  });
});

test('parseOne emoji', function (t) {
  t.plan(characters.length);

  characters.forEach(function (e) {
    t.is(emoji.parseOne(e), e);
  });
});

test('parseOne fail non-emoji', function (t) {
  t.plan(1);

  t.false(emoji.parseOne('a'));
});

test('parse fail on emoji with non-emoji', function (t) {
  t.plan(characters.length);

  characters.forEach(function (e) {
    var result = emoji.parse(`a${e}a`);

    t.false(result);
  });
});

test('isEmoji emoji', function (t) {
  t.plan(characters.length);

  characters.forEach(function (e) {
    t.true(isEmoji(e));
  });
});

test('isEmoji fail on non-emoji', function (t) {
  t.plan(1);

  t.false(isEmoji('a'));
});
