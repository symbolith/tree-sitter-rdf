// [X]  See section "5.3 Grammar" in https://www.w3.org/TR/rdf12-n-triples/#sec-grammar-grammar for
//      corresponding rule X.

// [26]
// [171s]
const UCHAR = /(\\u[0-9A-Fa-f]{4}|\\U[0-9A-Fa-f]{8})/

// [163s]
const PN_CHARS_BASE = [
  /[A-Z]/,
  /[a-z]/,
  /[\u00C0-\u00D6]/,
  /[\u00D8-\u00F6]/,
  /[\u00F8-\u02FF]/,
  /[\u0370-\u037D]/,
  /[\u037F-\u1FFF]/,
  /[\u200C-\u200D]/,
  /[\u2070-\u218F]/,
  /[\u2C00-\u2FEF]/,
  /[\u3001-\uD7FF]/,
  /[\uF900-\uFDCF]/,
  /[\uFDF0-\uFFFD]/,
  /[\u{10000}-\u{EFFFF}]/u
]

// [164s]
const PN_CHARS_U = PN_CHARS_BASE.concat('_')

// [166s]
const PN_CHARS = PN_CHARS_U.concat([
  '-',
  /\d/,
  /[\u00B7]/,
  /[\u0300-\u036F]/,
  /[\u203F-\u2040]/
])

const rules = require('../common/rules');

module.exports = grammar({
  name: 'ntriples',

  extras: $ => [
    $.comment,
    /\s/
  ],

  rules: {

    // [1]
    ntriplesDoc: $ => seq(
      optional($.triple),
      repeat(seq($._EOL, $.triple)),
      optional($._EOL)
    ),

    comment: _ => token(prec(-1, /#.*/)),

    // [2]
    // [3]
    // [4]
    // [5]
    triple: $ => seq(
      field("subject", choice(
        $._IRIREF,
        $._BLANK_NODE_LABEL
      )),
      field("predicate", $._IRIREF),
      field("object", choice(
        $._IRIREF,
        $._BLANK_NODE_LABEL,
        $.literal,
        $.tripleTerm
      )),
      '.'
    ),

    // [6]
    literal: $ => seq(
      $._STRING_LITERAL_QUOTE,
      optional(choice(
        $._LANG_DIR,
        seq('^^', field('datatype_IRI', $._IRIREF))
      ))
    ),

    // [7]
    tripleTerm: $ => seq(
      '<<(',
      $.triple_term,
      ')>>'
    ),

    // 8.1 RDF Term Constructors
    triple_term: $ => seq(
      field("subject", choice(
        $._IRIREF,
        $._BLANK_NODE_LABEL
      )),
      field("predicate", $._IRIREF),
      field("object", choice(
        $._IRIREF,
        $._BLANK_NODE_LABEL,
        $.literal,
        $.tripleTerm
      )),
    ),

    // [7]
    _EOL: _ => /[\r\n]+/,

    // [8]
    _IRIREF: $ => seq(
      '<',
      alias(repeat(
        choice(
          token.immediate(/([^<>"{}|^`\\\x00-\x20])/),
          alias(token.immediate(UCHAR), $.UCHAR))),
        $.IRI),
      token.immediate('>')
    ),

    // [6.1]
    _LANG_DIR: $ => seq(
      '@',
      $.language_tag,
      optional($.base_direction)
    ),

    // 6.1 RDF Term Constructors
    language_tag: _ => token.immediate(seq(
      /[a-zA-Z]+/,
      repeat(seq('-', /[a-zA-Z0-9]+/))
    )),

    base_direction: _ => seq(
      '--',
      /[a-zA-Z]+/
    ),

    // [22]
    _STRING_LITERAL_QUOTE: $ => seq(
      '"',
      alias(
        repeat(choice(
          /[^\x22\x5C\x0A\x0D]/,
          $.ECHAR,
          alias(UCHAR, $.UCHAR)
        )),
        $.lexical_form),
      '"'),

    // [141s]
    _BLANK_NODE_LABEL: $ => seq(
      '_:',
      alias(
        token.immediate(seq(
          choice(
            ...PN_CHARS_U,
            /\d/),
          optional(seq(
            repeat(choice(
              ...PN_CHARS,
              '.'
            )),
            choice(...PN_CHARS)
          ))
        )), $.blank_node)
    ),

    // [159s]
    ECHAR: _ => /\\[tbnrf\\"']/,
  }
})
