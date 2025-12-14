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
    $.subject,
    $.predicate,
    $.object
  ],

  rules: {

    nquadsDoc: $ => seq(
      optional($.statement),
      repeat(seq(EOL, $.statement)),
      optional(EOL)
    ),

    comment: common.comment,

    statement: $ => seq(
      field("subject", $.subject),
      field("predicate", $.predicate),
      field("object", $.object),
      optional(field("graphLabel", $.graphLabel)),
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
      $.literal,
    ),

    graphLabel: common.graphLabel,

    literal: common.literal_string11,

    LANGTAG: common.LANGTAG,

    IRIREF: common.IRIREF,

    STRING_LITERAL_QUOTE: common.STRING_LITERAL_QUOTE,

    BLANK_NODE_LABEL: common.BLANK_NODE_LABEL,
  }

})
