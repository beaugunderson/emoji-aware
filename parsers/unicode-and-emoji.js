'use strict';

var Emoji = require('./emoji.js').Emoji;
var Parsimmon = require('parsimmon');
var _ = require('lodash');

var SurrogatePair = Parsimmon.regex(/[\uD800-\uDBFF][\uDC00-\uDFFF]/);

var Unicode = exports.Unicode = Parsimmon.alt(
  Emoji,
  Parsimmon.regex(/[\u0000-\uD799]/),
  SurrogatePair
);

exports.parseOne = function (string) {
  return Unicode.parse(string).value.map(function (p) {
    return _.flattenDeep(p).join('');
  });
};

exports.parse = function (string) {
  return Unicode.many().parse(string).value.map(function (p) {
    return _.flattenDeep(p).join('');
  });
};
