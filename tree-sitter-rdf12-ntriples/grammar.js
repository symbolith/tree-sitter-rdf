const common = require('../common/rules');

const EOL = common.EOL
const WS = common.WS_horizontal

module.exports = grammar({
  name: 'ntriples',

  extras: $ => [
    $.comment,
    WS,
    EOL
  ],

  supertypes: $ => [
    $.directive,
    $.statement,
    $.versionSpecifier,
    $.subject,
    $.predicate,
    $.object,
  ],

  rules: {

    ntriplesDoc: $ => seq(
      optional($.statement),
      repeat(seq(EOL, $.statement)),
      optional(EOL)
    ),

    comment: common.comment,

    statement: $ => choice(
      $.directive,
      $.triple,
    ),

    directive: $ => $.versionDirective,

    versionDirective: common.versionDirective,

    versionSpecifier: common.versionSpecifier,

    triple: $ => seq(
      field("subject", $.subject),
      field("predicate", $.predicate),
      field("object", $.object),
      "."
    ),

    subject: $ => choice(
      $.IRIREF,
      $.BLANK_NODE_LABEL
    ),

    predicate: $ => $.IRIREF,

    object: $ => choice(
      $.IRIREF,
      $.BLANK_NODE_LABEL,
      $.literal,
      $.tripleTerm
    ),

    tripleTerm: $ => seq(
      '<<(',
      field("subject", $.subject),
      field("predicate", $.predicate),
      field("object", $.object),
      ')>>'
    ),

    literal: common.literal_string12,

    _LANG_DIR: common._LANG_DIR,

    LANGTAG: common.LANGTAG,

    BASE_DIRECTION: common.BASE_DIRECTION,

    IRIREF: common.IRIREF,

    BLANK_NODE_LABEL: common.BLANK_NODE_LABEL,

    STRING_LITERAL_QUOTE: common.STRING_LITERAL_QUOTE,
  }
})
