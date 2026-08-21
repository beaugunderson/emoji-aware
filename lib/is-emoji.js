'use strict';

var Emoji = require('../parsers/emoji.js').Emoji;

module.exports = function (string) {
  // On a failed parse, parsimmon records the error position in a cache keyed by
  // the input string. That cache is a bare object, so an input naming one of
  // Object.prototype's own properties resolves to the inherited value and the
  // write lands on Object.prototype. None of those names is an emoji.
  if (string in Object.prototype) {
    return false;
  }

  return Emoji.parse(string).status;
};
