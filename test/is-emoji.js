'use strict';

const test = require('ava');

var characters = require('./fixtures/emoji-characters.js');
var isEmoji = require('../lib/is-emoji.js');

characters.forEach(function (e) {
  test('isEmoji ' + e, function (t) {
    t.true(isEmoji(e));
  });
});

test('isEmoji fail on non-emoji', function (t) {
  t.false(isEmoji('a'));
});
