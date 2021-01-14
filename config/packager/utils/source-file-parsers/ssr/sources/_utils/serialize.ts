/**
 * Copy of `serialize-javascript` – https://github.com/yahoo/serialize-javascript
 * Converts also the difference only adds undefined as null
 */

const UID = Math.floor(Math.random() * 0x10000000000).toString(16);
const PLACE_HOLDER_REGEXP = new RegExp(
  `"@__(F|R|D|M|S)-${UID}-(\\d+)__@"`,
  'g',
);

const IS_NATIVE_CODE_REGEXP = /\{\s*\[native code\]\s*\}/g;
const IS_PURE_FUNCTION = /function.*?\(/;
// eslint-disable-next-line
const UNSAFE_CHARS_REGEXP = /[<>\/\u2028\u2029]/g;

const RESERVED_SYMBOLS = ['*', 'async'];

// Mapping of unsafe HTML and invalid JavaScript line terminator chars to their
// Unicode char counterparts which are safe to use in JavaScript strings.
const ESCAPED_CHARS = {
  '<': '\\u003C',
  '>': '\\u003E',
  '/': '\\u002F',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
};

const escapeUnsafeChars = (unsafeChar) => ESCAPED_CHARS[unsafeChar];

interface IOptions {
  space?: number;
  isJSON?: boolean;
  unsafe?: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const serialize = (obj: object, options: IOptions = {}): string => {
  // Backwards-compatibility for `space` as the second argument.
  if (typeof options === 'number' || typeof options === 'string') {
    options = { space: options }; // eslint-disable-line no-param-reassign
  }

  const functions = [];
  const regexps = [];
  const dates = [];
  const maps = [];
  const sets = [];

  // Returns placeholders for functions and regexps (identified by index)
  // which are later replaced by their string representation.
  function replacer(key, value) {
    if (typeof value === 'undefined') {
      return null;
    }

    if (!value) {
      return value;
    }

    // If the value is an object w/ a toJSON method, toJSON is called before
    // the replacer runs, so we use this[key] to get the non-toJSONed value.
    const origValue = this[key];
    const type = typeof origValue;

    if (type === 'object') {
      if (origValue instanceof RegExp) {
        return `@__R-${UID}-${regexps.push(origValue) - 1}__@`;
      }

      if (origValue instanceof Date) {
        return `@__D-${UID}-${dates.push(origValue) - 1}__@`;
      }

      if (origValue instanceof Map) {
        return `@__M-${UID}-${maps.push(origValue) - 1}__@`;
      }

      if (origValue instanceof Set) {
        return `@__S-${UID}-${sets.push(origValue) - 1}__@`;
      }
    }

    if (type === 'function') {
      return `@__F-${UID}-${functions.push(origValue) - 1}__@`;
    }

    return value;
  }

  function serializeFunc(fn) {
    const serializedFn = fn.toString();
    if (IS_NATIVE_CODE_REGEXP.test(serializedFn)) {
      throw new TypeError(`Serializing native function: ${fn.name}`);
    }

    // pure functions, example: {key: function() {}}
    if (IS_PURE_FUNCTION.test(serializedFn)) {
      return serializedFn;
    }

    const argsStartsAt = serializedFn.indexOf('(');
    const def = serializedFn
      .substr(0, argsStartsAt)
      .trim()
      .split(' ')
      .filter((val) => val.length > 0);

    const nonReservedSymbols = def.filter(
      (val) => RESERVED_SYMBOLS.indexOf(val) === -1,
    );

    // enhanced literal objects, example: {key() {}}
    if (nonReservedSymbols.length > 0) {
      return `${def.indexOf('async') > -1 ? 'async ' : ''}function${
        def.join('').indexOf('*') > -1 ? '*' : ''
      }${serializedFn.substr(argsStartsAt)}`;
    }

    // arrow functions
    return serializedFn;
  }

  let str;

  // Creates a JSON string representation of the value.
  // NOTE: Node 0.12 goes into slow mode with extra JSON.stringify() args.
  if (options.isJSON && !options.space) {
    str = JSON.stringify(obj);
  } else {
    str = JSON.stringify(obj, options.isJSON ? null : replacer, options.space);
  }

  // Protects against `JSON.stringify()` returning `undefined`, by serializing
  // to the literal string: "undefined".
  if (typeof str !== 'string') {
    return String(str);
  }

  // Replace unsafe HTML and invalid JavaScript line terminator chars with
  // their safe Unicode char counterpart. This _must_ happen before the
  // regexps and functions are serialized and added back to the string.
  if (options.unsafe !== true) {
    str = str.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars);
  }

  if (
    functions.length === 0 &&
    regexps.length === 0 &&
    dates.length === 0 &&
    maps.length === 0 &&
    sets.length === 0
  ) {
    return str;
  }

  // Replaces all occurrences of function, regexp, date, map and set placeholders in the
  // JSON string with their string representations. If the original value can
  // not be found, then `undefined` is used.
  return str.replace(PLACE_HOLDER_REGEXP, (match, type, valueIndex) => {
    if (type === 'D') {
      return `new Date("${dates[valueIndex].toISOString()}")`;
    }

    if (type === 'R') {
      return regexps[valueIndex].toString();
    }

    if (type === 'M') {
      return `new Map(${serialize(
        Array.from(maps[valueIndex].entries()),
        options,
      )})`;
    }

    if (type === 'S') {
      return `new Set(${serialize(
        Array.from(sets[valueIndex].values()),
        options,
      )})`;
    }

    const fn = functions[valueIndex];

    return serializeFunc(fn);
  });
};
