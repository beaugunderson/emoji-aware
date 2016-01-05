'use strict';

import test from 'ava';

var characters = require('./fixtures/emoji-characters.js');
var consoleFormat = require('../lib/console-format.js');

test('consoleFormat emoji', t => {
  t.plan(characters.length);

  characters.forEach(function (e) {
    var result = consoleFormat(`${e}:`);

    t.is(result, `${e} :`);
  });
});
