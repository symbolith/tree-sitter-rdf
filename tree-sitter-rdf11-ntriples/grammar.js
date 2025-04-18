const common = require('../common/rules');

const EOL = common.EOL
const WS = common.WS_horizontal

module.exports = grammar({
  name: 'ntriples',

  extras: $ => [
    $.comment,
    EOL,
    WS
  ],

  supertypes: $ => [
    $.subject,
    $.predicate,
    $.object,
  ],

  rules: {

    ntriplesDoc: $ => seq(
      optional($.triple),
      repeat(seq(EOL, $.triple)),
      optional(EOL)
    ),

    comment: common.comment,

    triple: $ => seq(
      field("subject", $.subject),
      field("predicate", $.predicate),
      field("object", $.object),
      '.'
    ),

    subject: $ => choice(
      $.IRIREF,
      $.BLANK_NODE_LABEL
    ),

    predicate: $ => $.IRIREF,

    object: $ => choice(
      $.IRIREF,
      $.BLANK_NODE_LABEL,
      $.literal
    ),

    literal: common.literal_string11,

    LANGTAG: common.LANGTAG,

    IRIREF: common.IRIREF,

    STRING_LITERAL_QUOTE: common.STRING_LITERAL_QUOTE,

    BLANK_NODE_LABEL: common.BLANK_NODE_LABEL,

  }

})
