const common = require('../common/rules');

const WS = common.WS

module.exports = grammar({
  name: 'trig',

  extras: $ => [
    $.comment,
    ...WS
  ],

  supertypes: $ => [
    $.BlankNode,
    $.NumericLiteral,
    $.directive,
    $.String,
    $.iri,
    $.literal,
    $.object,
    $.rtObject,
    $.ttObject,
    $.predicate,
    $.subject,
    $.rtSubject,
    $.ttSubject,
    $.verb,
    $.VersionSpecifier,
  ],

  rules: {

    trigDoc: $ => repeat(choice(
      $.directive,
      $._block
    )),

    comment: common.comment,

    _block: $ => choice(
      $.graph,
      seq(
        $.triples,
        "."
      )
    ),

    graph: $ => choice(
      $._wrappedGraph,
      seq(
        optional('GRAPH'.toCaseInsensitive()),
        field("label", $.label),
        $._wrappedGraph
      )
    ),

    _wrappedGraph: $ => seq(
      '{',
      optional($.triplesBlock),
      '}'
    ),

    triplesBlock: $ => seq(
      $.triples,
      repeat(seq(
        '.',
        $.triples
      )),
      optional('.')
    ),

    label: $ => choice(
      $.iri,
      $.BlankNode
    ),

    directive: common.directive_12,

    prefix: common.prefix,

    base: common.base,

    version: common.version,

    _prefixID: common._prefixID,

    _base: common._base,

    _version: common._version,

    _sparqlPrefix: common._sparqlPrefix,

    _sparqlBase: common._sparqlBase,

    _sparqlVersion: common._sparqlVersion,

    VersionSpecifier: common.VersionSpecifier,

    triples: common.triples_12,

    predicateObjectList: common.predicateObjectList,

    objectList: common.objectList_12,

    verb: common.verb,

    subject: $ => choice(
      $.iri,
      $.BlankNode,
      $.collection,
    ),

    predicate: $ => $.iri,

    object: $ => choice(
      $.iri,
      $.BlankNode,
      $.collection,
      $.blankNodePropertyList,
      $.literal,
      $.tripleTerm,
      $.reifiedTriple
    ),

    literal: common.literal,

    blankNodePropertyList: common.blankNodePropertyList,

    collection: common.collection,

    NumericLiteral: common.NumericLiteral,

    RDFLiteral: common.RDFLiteral_12,

    BooleanLiteral: common.BooleanLiteral,

    String: common.String,

    iri: common.iri,

    PrefixedName: common.PrefixedName,

    BlankNode: common.BlankNode,

    reifier: common.reifier,

    reifiedTriple: common.reifiedTriple,

    rtSubject: common.rtSubject,

    rtObject: common.rtObject,

    tripleTerm: common.tripleTerm,

    ttSubject: common.ttSubject,

    ttObject: common.ttObject,

    annotationBlock: common.annotationBlock,

    IRIREF: common.IRIREF,

    _PNAME_LN: common._PNAME_LN,

    BLANK_NODE_LABEL: common.BLANK_NODE_LABEL,

    _LANG_DIR: common._LANG_DIR,

    BASE_DIRECTION: common.BASE_DIRECTION,

    LANGTAG: common.LANGTAG,

    INTEGER: common.INTEGER,

    DECIMAL: common.DECIMAL,

    DOUBLE: common.DOUBLE,

    STRING_LITERAL_QUOTE: common.STRING_LITERAL_QUOTE,

    STRING_LITERAL_SINGLE_QUOTE: common.STRING_LITERAL_SINGLE_QUOTE,

    STRING_LITERAL_LONG_SINGLE_QUOTE: common.STRING_LITERAL_LONG_SINGLE_QUOTE,

    STRING_LITERAL_LONG_QUOTE: common.STRING_LITERAL_LONG_QUOTE,

    ANON: common.ANON,
  }
})
