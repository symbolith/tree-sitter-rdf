import common from '../common/rules.js';

const WS = common.WS

export default grammar({
  name: 'turtle',

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
    $.predicate,
    $.subject,
    $.verb,
  ],

  rules: {

    turtleDoc: $ => repeat($.statement),

    comment: common.comment,

    statement: $ => choice(
      $.directive,
      seq(
        $.triples,
        '.'
      ),
    ),

    directive: common.directive_11,

    _prefixID: common._prefixID,

    base: common.base,

    _base: common._base,

    prefix: common.prefix,

    _sparqlPrefix: common._sparqlPrefix,

    _sparqlBase: common._sparqlBase,

    triples: common.triples_11,

    predicateObjectList: common.predicateObjectList,

    objectList: common.objectList_11,

    verb: $ => choice(
      $.predicate,
      "a",
    ),

    subject: $ => choice(
      $.iri,
      $.BlankNode,
      $.collection
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
