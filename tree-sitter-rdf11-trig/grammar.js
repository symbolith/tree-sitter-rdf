import common from '../common/rules.js';

const WS = common.WS

export default grammar({
  name: 'rdf11_trig',

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
    $.label,
    $.predicate,
    $.subject,
    $.verb,
  ],

  rules: {

    trigDoc: $ => repeat(choice(
      $.directive,
      $.block
    )),

    comment: common.comment,

    block: $ => choice(
      seq(
        $.triples,
        "."
      ),
      $.graph
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

    directive: common.directive_11,

    _prefixID: common._prefixID,

    base: common.base,

    _base: common._base,

    prefix: common.prefix,

    _sparqlBase: common._sparqlBase,

    _sparqlPrefix: common._sparqlPrefix,

    triples: common.triples_11,

    predicateObjectList: common.predicateObjectList,

    objectList: common.objectList_11,

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
      $.literal
    ),

    literal: common.literal,

    blankNodePropertyList: common.blankNodePropertyList,

    collection: common.collection,

    NumericLiteral: common.NumericLiteral,

    RDFLiteral: common.RDFLiteral_11,

    BooleanLiteral: common.BooleanLiteral,

    String: common.String,

    iri: common.iri,

    PrefixedName: common.PrefixedName,

    BlankNode: common.BlankNode,

    IRIREF: common.IRIREF,

    _PNAME_LN: common._PNAME_LN,

    BLANK_NODE_LABEL: common.BLANK_NODE_LABEL,

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
