'use strict';

var Parsimmon = require('parsimmon');
var flattenDeep = require('lodash.flattendeep');

var OptionalVariationSelector =
  exports.OptionalVariationSelector = Parsimmon.regex(/[\uFE0E\uFE0F]{0,1}/)
    .desc('an optional variation selector (\\uFE0E or \\uFE0F)');

var KeycapEmoji = Parsimmon.seq(
  Parsimmon.regex(/[0-9#*]/),
  OptionalVariationSelector,
  Parsimmon.string('\u20E3')
).desc('a keycap emoji');

var FlagEmoji = Parsimmon.regex(/\uD83C[\uDDE6-\uDDFF]/)
  .times(2)
  .desc('a flag emoji');

var ZeroWidthJoiner = Parsimmon.string('\u200D')
  .desc('zero-width joiner (\\u200D)');

var OptionalFitzpatrickModifier =
  Parsimmon.regex(/(\uD83C[\uDFFB-\uDFFF]){0,1}/)
    .desc('an optional Fitzpatrick modifier');

var SimpleEmoji = Parsimmon.alt(
  // Simple Unicode emoji
  Parsimmon.regex(/[\u203C-\u3299]/),
  Parsimmon.regex(/[\u2702-\u27B0]/),
  // Emoji flags
  FlagEmoji,
  // Surrogate pairs
  Parsimmon.regex(/\uD83C[\uDC04-\uDFFF]/),
  Parsimmon.regex(/\uD83D[\uDC00-\uDFFF]/),
  Parsimmon.regex(/\uD83E[\uDC00-\uDFFF]/),
  // Single characters (trademark, copyright) that become emoji with a
  // variation selector (TODO: make the variation selector required here?)
  Parsimmon.string('\u00A9'),
  Parsimmon.string('\u00AE')
);

var ZeroWidthJoinerEmoji = Parsimmon.seq(
  SimpleEmoji,
  OptionalVariationSelector,
  Parsimmon.seq(
    ZeroWidthJoiner,
    SimpleEmoji,
    OptionalVariationSelector
  ).times(1, 3)
);

var Emoji = exports.Emoji = Parsimmon.seq(
  Parsimmon.alt(
    ZeroWidthJoinerEmoji,
    Parsimmon.seq(
      SimpleEmoji,
      OptionalFitzpatrickModifier,
      OptionalVariationSelector
    ),
    KeycapEmoji
  ),
  OptionalFitzpatrickModifier
).map(function (result) {
  return flattenDeep(result).join('');
});

exports.parseOne = function (string) {
  var result = Emoji.parse(string);

  if (!result.status) {
    return false;
  }

  return result.value;
};

exports.parse = function (string) {
  var result = Emoji.many().parse(string);

  if (!result.status) {
    return false;
  }

  return result.value;
};
