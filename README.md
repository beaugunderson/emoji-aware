[![travis]](http://travis-ci.org/beaugunderson/emoji-aware)
[![codecov.io](https://codecov.io/github/beaugunderson/emoji-aware/coverage.svg?branch=master)](https://codecov.io/github/beaugunderson/emoji-aware?branch=master)
[![downloads]](https://www.npmjs.com/package/emoji-aware)
[![version]](https://www.npmjs.com/package/emoji-aware)

[travis]: https://img.shields.io/travis/beaugunderson/emoji-aware.svg
[downloads]: https://img.shields.io/npm/dm/emoji-aware.svg
[version]: https://img.shields.io/npm/v/emoji-aware.svg

## emoji-aware

Emoji-aware unicode string utilities for JavaScript.

You'll need these if you ever want to split strings that contain emoji.

If you use naive methods for this (or packages that purport to split unicode
strings correctly) you'll have trouble because emoji can span multiple
characters (and multiple surrogate pairs).

The longest emoji is specified by 4 "regular" emoji with zero-width joiners in
between them, for example. This library will correctly split that emoji into
one space in the returned array of characters.

(But the unicode portion probably needs
[some more work](https://mathiasbynens.be/notes/javascript-unicode)).

### Example

```js
var split = require('emoji-aware').split;

var result = split('cats 😸 are the best');

result[5] === '😸';
// true
```
