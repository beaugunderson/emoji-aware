'use strict';

const test = require('ava');

var characters = require('./fixtures/emoji-characters.js');
var emoji = require('../emoji-aware.js');

characters.forEach(function (e) {
  test(`onlyEmoji ${e}✌🏿️`, function (t) {
    var result = emoji.onlyEmoji(`${e}✌🏿️`);

    t.is(result.length, 2);
  });
});
