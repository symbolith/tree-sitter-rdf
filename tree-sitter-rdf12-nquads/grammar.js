import common from '../common/rules.js';

const EOL = common.EOL
const WS = common.WS_horizontal

export default grammar({
  name: 'nquads',

  extras: $ => [
    $.comment,
    EOL,
    WS
  ],

  supertypes: $ => [
    $.directive,
    $.graphLabel,
    $.object,
    $.predicate,
    $.statement,
    $.subject,
    $.versionSpecifier,
  ],

  rules: {

    nquadsDoc: $ => seq(
      optional($.statement),
      repeat(seq(EOL, $.statement)),
      optional(EOL)
    ),

    comment: common.comment,

    statement: $ => choice(
      $.directive,
      $.quad,
    ),

    directive: $ => $.versionDirective,

    versionDirective: common.versionDirective,

    versionSpecifier: common.versionSpecifier,

    quad: $ => seq(
      field("subject", $.subject),
      field("predicate", $.predicate),
      field("object", $.object),
      optional(field("graphLabel", $.graphLabel)),
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

    graphLabel: common.graphLabel,

    literal: common.literal_string12,

    tripleTerm: $ => seq(
      '<<(',
      field("subject", $.subject),
      field("predicate", $.predicate),
      field("object", $.object),
      ')>>'
    ),

    IRIREF: common.IRIREF,

    BLANK_NODE_LABEL: common.BLANK_NODE_LABEL,

    _LANG_DIR: common._LANG_DIR,

    LANGTAG: common.LANGTAG,

    BASE_DIRECTION: common.BASE_DIRECTION,

    STRING_LITERAL_QUOTE: common.STRING_LITERAL_QUOTE,
  }
})
