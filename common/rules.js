const EOL = /[\x0D\x0A]+/

const EXPONENT = [
  /[eE]/,
  /[+-]?/,
  /\d+/
]

const UCHAR = /(\\u[0-9A-Fa-f]{4}|\\U[0-9A-Fa-f]{8})/

const ECHAR = /\\[tbnrf\\"']/

const WS_horizontal = /[\x20\x09]/

const WS = [
  /\x20/,
  /\x09/,
  /\x0D/,
  /\x0A/
]

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

const PN_CHARS_U = PN_CHARS_BASE.concat('_')

const PN_CHARS = PN_CHARS_U.concat([
  '-',
  /\d/,
  /[\u00B7]/,
  /[\u0300-\u036F]/,
  /[\u203F-\u2040]/
])



const PN_PREFIX = token(seq(
  choice(...PN_CHARS_BASE),
  optional(seq(
    repeat(choice(
      ...PN_CHARS,
      '.'
    )),
    choice(...PN_CHARS)
  ))
))

const PNAME_NS = token(seq(
  optional(PN_PREFIX),
  ':'
))

const HEX = [
  /\d/,
  /[A-F]/,
  /[a-f]/
]

const PERCENT = token(seq(
  '%',
  choice(...HEX),
  choice(...HEX)
))

const PN_LOCAL_ESC = [
  '_',
  '~',
  '.',
  '-',
  '!',
  '$',
  '&',
  "'",
  '(',
  ')',
  '*',
  '+',
  ',',
  ';',
  '=',
  '/',
  '?',
  '#',
  '@',
  '%'
].map(char => '\\' + char)

const PLX = token(choice(
  PERCENT,
  ...PN_LOCAL_ESC)
)

const PN_LOCAL = token(seq(
  choice(
    ...PN_CHARS_U,
    ':',
    /\d/,
    PLX
  ),
  optional(seq(
    repeat(choice(
      ...PN_CHARS,
      '.',
      ':',
      PLX
    )),
    choice(
      ...PN_CHARS,
      ':',
      PLX
    )
  ))
))



String.prototype.toCaseInsensitive = function() {
  return alias(
    token(new RegExp(
      this
        .split('')
        .map(letter => `[${letter}${letter.toLowerCase()}]`)
        .join('')
    )),
    this
  )
}


const rules = {

  comment: _ => /#[^\r\n]*/,

  directive_11: $ => choice(
    $.base,
    $.prefix
  ),

  directive_12: $ => choice(
    $.base,
    $.prefix,
    $.version
  ),

  base: $ => choice(
    $._base,
    $._sparqlBase
  ),

  _base: $ => seq(
    '@base',
    field('iri', $.IRIREF),
    '.'
  ),

  _sparqlBase: $ => seq(
    'BASE'.toCaseInsensitive(),
    field('iri', $.IRIREF),
  ),

  prefix: $ => choice(
    $._prefixID,
    $._sparqlPrefix
  ),

  _prefixID: $ => seq(
    '@prefix',
    field('prefix_label', alias(PNAME_NS, $.PNAME_NS)),
    field('iri', $.IRIREF),
    '.'
  ),

  _sparqlPrefix: $ => seq(
    'PREFIX'.toCaseInsensitive(),
    field('prefix_label', alias(PNAME_NS, $.PNAME_NS)),
    field('iri', $.IRIREF),
  ),

  version: $ => choice(
    $._version,
    $._sparqlVersion
  ),

  _version: $ => seq(
    '@version',
    field('versionSpecifier', $.VersionSpecifier),
    '.'
  ),

  _sparqlVersion: $ => seq(
    'VERSION'.toCaseInsensitive(),
    field('versionSpecifier', $.VersionSpecifier)
  ),

  versionDirective: $ => seq(
    'VERSION',
    field('versionSpecifier', $.versionSpecifier)
  ),

  versionSpecifier: $ => $.STRING_LITERAL_QUOTE,

  VersionSpecifier: $ => choice(
    $.STRING_LITERAL_QUOTE,
    $.STRING_LITERAL_SINGLE_QUOTE
  ),

  triples_11: $ => choice(
    seq(
      field("subject", $.subject),
      $.predicateObjectList
    ),
    seq(
      $.blankNodePropertyList,
      optional($.predicateObjectList)
    )
  ),

  triples_12: $ => choice(
    seq(
      field("subject", $.subject),
      $.predicateObjectList
    ),
    seq(
      $.blankNodePropertyList,
      optional($.predicateObjectList)
    ),
    seq(
      $.reifiedTriple,
      optional($.predicateObjectList)
    )
  ),

  predicateObjectList: $ => seq(
    field("predicate", $.verb),
    $.objectList,
    repeat(seq(
      ';',
      optional(seq(
        field("predicate", $.verb),
        $.objectList
      ))
    ))
  ),

  objectList_11: $ => seq(
    field("object", $.object),
    repeat(seq(
      ',',
      field("object", $.object),
    ))
  ),

  objectList_12: $ => seq(
    field("object", $.object),
    optional(field("annotation", repeat1(choice(
      $.reifier,
      $.annotationBlock
    )))),
    repeat(seq(
      ',',
      field("object", $.object),
      optional(field("annotation", repeat1(choice(
        $.reifier,
        $.annotationBlock
      )))),
    ))
  ),

  graphLabel: $ => choice(
    $.IRIREF,
    $.BLANK_NODE_LABEL
  ),

  literal: $ => choice(
    $.RDFLiteral,
    $.NumericLiteral,
    $.BooleanLiteral
  ),

  blankNodePropertyList: $ => seq(
    '[',
    $.predicateObjectList,
    ']'
  ),

  collection: $ => seq(
    '(',
    repeat($.object),
    ')'
  ),

  verb: $ => choice(
    $.predicate,
    "a",
  ),

  NumericLiteral: $ => choice(
    $.INTEGER,
    $.DECIMAL,
    $.DOUBLE
  ),

  literal_string11: $ => seq(
    field("string", $.STRING_LITERAL_QUOTE),
    optional(choice(
      seq('^^', field('datatype_iri', $.IRIREF)),
      seq('@', field("language_tag", $.LANGTAG))
    ))
  ),

  literal_string12: $ => seq(
    field("string", $.STRING_LITERAL_QUOTE),
    optional(choice(
      seq('^^', field('datatype_iri', $.IRIREF)),
      $._LANG_DIR,
    ))
  ),

  RDFLiteral_11: $ => seq(
    field('string', $.String),
    optional(choice(
      seq('^^', field('datatype_iri', $.iri)),
      seq('@', field("language_tag", $.LANGTAG)),
    ))
  ),

  RDFLiteral_12: $ => seq(
    field('string', $.String),
    optional(choice(
      seq('^^', field('datatype_iri', $.iri)),
      $._LANG_DIR
    ))
  ),

  BooleanLiteral: _ => choice(
    'true',
    'false'
  ),

  String: $ => choice(
    $.STRING_LITERAL_QUOTE,
    $.STRING_LITERAL_SINGLE_QUOTE,
    $.STRING_LITERAL_LONG_SINGLE_QUOTE,
    $.STRING_LITERAL_LONG_QUOTE,
  ),

  iri: $ => choice(
    $.IRIREF,
    $.PrefixedName
  ),

  PrefixedName: $ => choice(
    $._PNAME_LN,
    PNAME_NS
  ),

  BlankNode: $ => choice(
    $.BLANK_NODE_LABEL,
    $.ANON
  ),

  reifier: $ => seq(
    '~',
    optional(choice(
      $.iri,
      $.BlankNode
    ))
  ),

  reifiedTriple: $ => seq(
    '<<',
    field("subject", $.rtSubject),
    field("predicate", $.verb),
    field("object", $.rtObject),
    optional($.reifier),
    '>>'
  ),

  rtSubject: $ => choice(
    $.iri,
    $.BlankNode,
    $.reifiedTriple
  ),

  rtObject: $ => choice(
    $.iri,
    $.BlankNode,
    $.literal,
    $.tripleTerm,
    $.reifiedTriple
  ),

  tripleTerm: $ => seq(
    '<<(',
    field("subject", $.ttSubject),
    field("predicate", $.verb),
    field("object", $.ttObject),
    ')>>'
  ),

  ttSubject: $ => choice(
    $.iri,
    $.BlankNode
  ),

  ttObject: $ => choice(
    $.iri,
    $.BlankNode,
    $.literal,
    $.tripleTerm
  ),

  annotationBlock: $ => seq(
    '{|',
    $.predicateObjectList,
    '|}'
  ),

  IRIREF: _ => token(seq(
    '<',
    repeat(choice(
      /[^\x00-\x20<>"{}|^`\\]/,
      UCHAR
    )),
    '>'
  )),

  _PNAME_LN: _ => token(seq(
    PNAME_NS,
    PN_LOCAL
  )),

  BLANK_NODE_LABEL: _ => token(seq(
    '_:',
    choice(
      ...PN_CHARS_U,
      /\d/
    ),
    optional(seq(
      repeat(choice(
        ...PN_CHARS,
        '.'
      )),
      choice(...PN_CHARS)
    ))
  )),

  _LANG_DIR: $ => seq(
    '@',
    field("language_tag", $.LANGTAG),
    optional(seq(
      '--',
      field("base_direction", $.BASE_DIRECTION)
    ))
  ),

  BASE_DIRECTION: _ => /[a-zA-Z]+/,

  LANGTAG: _ => token.immediate(seq(
    /[a-zA-Z]+/,
    repeat(seq('-', /[a-zA-Z0-9]+/))
  )),

  INTEGER: _ => token(/[+-]?\d+/),

  DECIMAL: _ => token(seq(/[+-]?/, /\d*/, '.', /\d+/)),

  DOUBLE: _ => token(seq(
    /[+-]?/,
    choice(
      seq(/\d+/, '.', /\d*/, ...EXPONENT),
      seq('.', /\d+/, ...EXPONENT),
      seq(/\d+/, ...EXPONENT)
    ))
  ),

  STRING_LITERAL_QUOTE: _ => token(seq(
    '"',
    repeat(choice(
      /[^\x22\x5C\x0A\x0D]/,
      ECHAR,
      UCHAR
    )),
    '"'
  )),

  STRING_LITERAL_SINGLE_QUOTE: _ => token(seq(
    "'",
    repeat(choice(
      /[^\x27\x5C\x0A\x0D]/,
      ECHAR,
      UCHAR
    )),
    "'",
  )),

  STRING_LITERAL_LONG_SINGLE_QUOTE: _ => token(seq(
    "'''",
    repeat(seq(
      optional(choice(
        "'",
        "''",
      )),
      choice(
        /[^'\\]/,
        ECHAR,
        UCHAR
      )
    )),
    "'''",
  )),

  STRING_LITERAL_LONG_QUOTE: _ => token(seq(
    '"""',
    repeat(seq(
      optional(choice(
        '"',
        '""',
      )),
      choice(
        /[^"\\]/,
        ECHAR,
        UCHAR
      )
    )),
    '"""',
  )),

  ANON: _ => token(seq(
    '[',
    repeat(choice(...WS)),
    ']'
  )),

}

module.exports = { ...rules, WS, WS_horizontal, EOL, EXPONENT, ECHAR, PN_CHARS_U }
