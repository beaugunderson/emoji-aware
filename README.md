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
