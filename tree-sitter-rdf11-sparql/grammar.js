const common = require('../common/rules');

const WS = common.WS
const EXPONENT = common.EXPONENT
const ECHAR = common.ECHAR
const PN_CHARS_U = common.PN_CHARS_U


const VARNAME = token.immediate(seq(
  choice(
    ...PN_CHARS_U,
    /[0-9]/
  ),
  repeat(choice(
    ...PN_CHARS_U,
    /[0-9]/,
    /[\u00B7]/,
    /[\u0300-\u036F]/,
    /[\u203F-\u2040]/
  ))
))

const VAR1 = token(seq(
  '?',
  VARNAME
))

const VAR2 = token(seq(
  '$',
  VARNAME
))

String.prototype.toCaseInsensitiv = function() {
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

module.exports = grammar({
  name: 'sparql',

  extras: $ => [
    $.comment,
    ...WS
  ],

  supertypes: $ => [
    $.SourceSelector,
    $.PrimaryExpression,
    $.DataBlock,
    $.Expression,
    $.GraphPatternNotTriples,
    $.NumericLiteral,
    $.Constraint,
    $.VarOrTerm,
    $.GraphNodePath,
    $.GraphRefAll,
    $.GraphNode,
    $.Update1,
    $.VarOrIri,
    $.BinaryPath,
    $.Path,
    $.TriplesNodePath,
    $.String,
    $.GraphTerm,
    $.Verb,
    $.iri
  ],
  //
  // inline: $ => [
  //   $._Query
  // ],
  //
  // word: $ => $.pn_prefix,

  rules: {
    Unit: $ => optional(choice(
      $.Query,
      $.Update
    )),

    comment: common.comment,

    Query: $ => seq(
      field('prologue', optional($.Prologue)),
      field('form', choice(
        $.SelectQuery,
        $.ConstructQuery,
        $.DescribeQuery,
        $.AskQuery,
      )),
      field('values', optional($.ValuesClause))
    ),

    Update: $ => choice(
      // Tree-sitter does not allow empty rules
      field('prologue', $.Prologue),
      seq(
        field('prologue', optional($.Prologue)),
        field('operation', $.Update1),
        repeat(seq(
          ';',
          field('operation', $.Update1),
        )),
        optional(';')
      )
    ),

    Update1: $ => choice(
      $.Load,
      $.Clear,
      $.Drop,
      $.Add,
      $.Move,
      $.Copy,
      $.Create,
      $.InsertData,
      $.DeleteData,
      $.DeleteWhere,
      $.Modify
    ),

    Prologue: $ => repeat1(choice(
      $.BaseDecl,
      $.PrefixDecl
    )),

    BaseDecl: common._sparqlBase,

    PrefixDecl: common._sparqlPrefix,

    SelectQuery: $ => seq(
      $.SelectClause,
      repeat($._DatasetClause),
      $.WhereClause,
      optional($._SolutionModifier)
    ),

    SubSelect: $ => seq(
      $.SelectClause,
      $.WhereClause,
      optional($._SolutionModifier),
      optional($.ValuesClause)
    ),

    SelectClause: $ => seq(
      'SELECT'.toCaseInsensitiv(),
      optional(choice(
        'DISTINCT'.toCaseInsensitiv(),
        'REDUCED'.toCaseInsensitiv()
      )),
      choice(
        repeat1(choice(
          $.Var,
          $.SelectExpression,
          '*'
        )
        ),
      )
    ),

    SelectExpression: $ => seq(
      '(',
      field('expression', $.Expression),
      'AS'.toCaseInsensitiv(),
      field('binding', $.Var),
      ')'
    ),

    ConstructQuery: $ => seq(
      'CONSTRUCT'.toCaseInsensitiv(),
      choice(
        seq(
          $.ConstructTemplate,
          repeat($._DatasetClause),
          $.WhereClause,
          optional($._SolutionModifier)
        ),
        seq(
          repeat($._DatasetClause),
          'WHERE'.toCaseInsensitiv(),
          '{',
          optional($.TriplesTemplate),
          '}',
          optional($._SolutionModifier)
        )
      )
    ),

    DescribeQuery: $ => seq(
      'DESCRIBE'.toCaseInsensitiv(),
      choice(
        repeat1($.VarOrIri),
        '*'
      ),
      repeat($._DatasetClause),
      optional($.WhereClause),
      optional($._SolutionModifier)
    ),

    AskQuery: $ => seq(
      'ASK'.toCaseInsensitiv(),
      repeat($._DatasetClause),
      $.WhereClause,
      optional($._SolutionModifier)
    ),

    _DatasetClause: $ => seq(
      'FROM'.toCaseInsensitiv(),
      choice(
        $.DefaultGraphClause,
        $.NamedGraphClause
      )
    ),

    DefaultGraphClause: $ => field('source_selector', $.SourceSelector),

    NamedGraphClause: $ => seq(
      'NAMED'.toCaseInsensitiv(),
      field('source_selector', $.SourceSelector)
    ),

    SourceSelector: $ => $.iri,

    WhereClause: $ => seq(
      optional('WHERE'.toCaseInsensitiv()),
      $.GroupGraphPattern
    ),

    _SolutionModifier: $ => choice(
      // Tree-sitter does not support syntactic rules that match the empty string
      seq(
        $.GroupClause,
        optional($.HavingClause),
        optional($.OrderClause),
        optional($.LimitOffsetClauses)
      ),
      seq(
        optional($.GroupClause),
        $.HavingClause,
        optional($.OrderClause),
        optional($.LimitOffsetClauses)
      ),
      seq(
        optional($.GroupClause),
        optional($.HavingClause),
        $.OrderClause,
        optional($.LimitOffsetClauses)
      ),
      seq(
        optional($.GroupClause),
        optional($.HavingClause),
        optional($.OrderClause),
        $.LimitOffsetClauses
      ),
    ),

    GroupClause: $ => seq(
      'GROUP'.toCaseInsensitiv(),
      'BY'.toCaseInsensitiv(),
      field('condition', repeat1($._GroupCondition))
    ),

    _GroupCondition: $ => choice(
      $.BuiltInCall,
      $.FunctionCall,
      seq(
        '(',
        $.Expression,
        optional(seq(
          'AS'.toCaseInsensitiv(),
          $.Var
        )),
        ')'
      ),
      $.Var
    ),

    HavingClause: $ => seq(
      'HAVING'.toCaseInsensitiv(),
      field('condition', repeat1($._HavingCondition))
    ),

    _HavingCondition: $ => $.Constraint,

    OrderClause: $ => seq(
      'ORDER'.toCaseInsensitiv(),
      'BY'.toCaseInsensitiv(),
      field('condition', repeat1($._OrderCondition))
    ),

    _OrderCondition: $ => choice(
      seq(
        choice('ASC'.toCaseInsensitiv(), 'DESC'.toCaseInsensitiv()),
        $.BrackettedExpression
      ),
      choice(
        $.Constraint,
        $.Var
      )
    ),

    LimitOffsetClauses: $ => choice(
      seq(
        $._LimitClause,
        optional($._OffsetClause)
      ),
      seq(
        $._OffsetClause,
        optional($._LimitClause)
      )
    ),

    _LimitClause: $ => seq(
      'LIMIT'.toCaseInsensitiv(),
      field('limit', $.INTEGER)
    ),

    _OffsetClause: $ => seq(
      'OFFSET'.toCaseInsensitiv(),
      field('offset', $.INTEGER)
    ),

    ValuesClause: $ => seq(
      'VALUES'.toCaseInsensitiv(),
      $.DataBlock
    ),

    Load: $ => seq(
      'LOAD'.toCaseInsensitiv(),
      optional('SILENT'.toCaseInsensitiv()),
      $.iri,
      optional(seq(
        'INTO'.toCaseInsensitiv(),
        $.GraphRef
      ))
    ),

    Clear: $ => seq(
      'CLEAR'.toCaseInsensitiv(),
      optional('SILENT'.toCaseInsensitiv()),
      $.GraphRefAll
    ),

    Drop: $ => seq(
      'DROP'.toCaseInsensitiv(),
      optional('SILENT'.toCaseInsensitiv()),
      $.GraphRefAll
    ),

    Create: $ => seq(
      'CREATE'.toCaseInsensitiv(),
      optional('SILENT'.toCaseInsensitiv()),
      $.GraphRef
    ),

    Add: $ => seq(
      'ADD'.toCaseInsensitiv(),
      optional('SILENT'.toCaseInsensitiv()),
      $.GraphOrDefault,
      'TO'.toCaseInsensitiv(),
      $.GraphOrDefault
    ),

    Move: $ => seq(
      'MOVE'.toCaseInsensitiv(),
      optional('SILENT'.toCaseInsensitiv()),
      $.GraphOrDefault,
      'TO'.toCaseInsensitiv(),
      $.GraphOrDefault
    ),

    Copy: $ => seq(
      'COPY'.toCaseInsensitiv(),
      optional('SILENT'.toCaseInsensitiv()),
      $.GraphOrDefault,
      'TO'.toCaseInsensitiv(),
      $.GraphOrDefault
    ),

    InsertData: $ => seq(
      'INSERT'.toCaseInsensitiv(),
      'DATA'.toCaseInsensitiv(),
      field('data', $.Quads)
    ),

    DeleteData: $ => seq(
      'DELETE'.toCaseInsensitiv(),
      'DATA'.toCaseInsensitiv(),
      field('data', $.Quads)
    ),

    DeleteWhere: $ => seq(
      'DELETE'.toCaseInsensitiv(),
      'WHERE'.toCaseInsensitiv(),
      field('pattern', $.Quads)
    ),

    Modify: $ => seq(
      optional(seq(
        'WITH'.toCaseInsensitiv(),
        $.iri)
      ),
      choice(
        seq(
          $.DeleteClause,
          optional($.InsertClause)
        ),
        $.InsertClause
      ),
      repeat($.UsingClause),
      'WHERE'.toCaseInsensitiv(),
      $.GroupGraphPattern
    ),

    DeleteClause: $ => seq(
      'DELETE'.toCaseInsensitiv(),
      field('pattern', $.Quads)
    ),

    InsertClause: $ => seq(
      'INSERT'.toCaseInsensitiv(),
      field('pattern', $.Quads)
    ),

    UsingClause: $ => seq(
      'USING'.toCaseInsensitiv(),
      choice(
        $.iri,
        seq('NAMED'.toCaseInsensitiv(), $.iri)
      )
    ),

    GraphOrDefault: $ => choice(
      'DEFAULT'.toCaseInsensitiv(),
      seq(
        optional('GRAPH'.toCaseInsensitiv()),
        $.iri)
    ),

    GraphRef: $ => seq(
      'GRAPH'.toCaseInsensitiv(),
      $.iri
    ),

    GraphRefAll: $ => choice(
      $.GraphRef,
      'DEFAULT'.toCaseInsensitiv(),
      'NAMED'.toCaseInsensitiv(),
      'ALL'.toCaseInsensitiv()
    ),

    Quads: $ => seq(
      '{',
      seq(
        optional($.TriplesTemplate),
        repeat(seq(
          $.QuadsNotTriples,
          optional('.'),
          optional($.TriplesTemplate),
        ))
      ),
      '}'
    ),

    QuadsNotTriples: $ => seq(
      'GRAPH'.toCaseInsensitiv(),
      $.VarOrIri,
      '{',
      optional($.TriplesTemplate),
      '}'
    ),

    TriplesTemplate: $ => seq(
      $.TriplesSameSubject,
      repeat(seq(
        '.',
        $.TriplesSameSubject
      )),
      optional('.')
    ),

    GroupGraphPattern: $ => seq(
      '{',
      choice(
        $.SubSelect,
        seq(
          optional($.TriplesBlock),
          repeat(seq(
            $.GraphPatternNotTriples,
            optional('.'),
            optional($.TriplesBlock)
          ))
        )
      ),
      '}'
    ),

    TriplesBlock: $ => seq(
      $.TriplesSameSubjectPath,
      repeat(seq(
        '.',
        $.TriplesSameSubjectPath
      )),
      optional('.')
    ),

    GraphPatternNotTriples: $ => choice(
      $.GroupGraphPattern,
      $.UnionGraphPattern,
      $.OptionalGraphPattern,
      $.MinusGraphPattern,
      $.GraphGraphPattern,
      $.ServiceGraphPattern,
      $.Filter,
      $.Bind,
      $.InlineData
    ),

    OptionalGraphPattern: $ => seq(
      'OPTIONAL'.toCaseInsensitiv(),
      $.GroupGraphPattern
    ),

    GraphGraphPattern: $ => seq(
      'GRAPH'.toCaseInsensitiv(),
      $.VarOrIri,
      $.GroupGraphPattern
    ),

    ServiceGraphPattern: $ => seq(
      'SERVICE'.toCaseInsensitiv(),
      optional('SILENT'.toCaseInsensitiv()),
      $.VarOrIri,
      $.GroupGraphPattern
    ),

    Bind: $ => seq(
      'BIND'.toCaseInsensitiv(),
      '(',
      $.Expression,
      'AS'.toCaseInsensitiv(),
      field('bound_variable', $.Var),
      ')'
    ),

    InlineData: $ => seq(
      'VALUES'.toCaseInsensitiv(),
      $.DataBlock
    ),

    DataBlock: $ => choice(
      $.InlineDataOneVar,
      $.InlineDataFull
    ),

    InlineDataOneVar: $ => seq(
      $.Var,
      '{',
      repeat($.DataBlockValue),
      '}'
    ),

    InlineDataFull: $ => seq(
      choice(
        $.NIL,
        seq(
          '(',
          repeat($.Var),
          ')'
        )
      ),
      '{',
      repeat(choice(
        seq(
          '(',
          repeat($.DataBlockValue),
          ')'),
        $.NIL
      )),
      '}'
    ),

    DataBlockValue: $ => choice(
      $.iri,
      $.RDFLiteral,
      $.NumericLiteral,
      $.BooleanLiteral,
      alias('UNDEF'.toCaseInsensitiv(), $.UNDEF)
    ),

    MinusGraphPattern: $ => seq(
      'MINUS'.toCaseInsensitiv(),
      $.GroupGraphPattern
    ),

    UnionGraphPattern: $ => seq(
      $.GroupGraphPattern,
      repeat1(seq(
        'UNION'.toCaseInsensitiv(),
        $.GroupGraphPattern
      ))
    ),

    Filter: $ => seq(
      'FILTER'.toCaseInsensitiv(),
      $.Constraint
    ),

    Constraint: $ => choice(
      $.BrackettedExpression,
      $.BuiltInCall,
      $.FunctionCall
    ),

    FunctionCall: $ => seq(
      field('identifier', $.iri),
      field('arguments', $.ArgList)
    ),

    ArgList: $ => choice(
      $.NIL,
      seq(
        '(',
        optional('DISTINCT'.toCaseInsensitiv()),
        $.Expression,
        repeat(seq(',', $.Expression)),
        ')'
      )
    ),

    ExpressionList: $ => choice(
      $.NIL,
      seq(
        '(',
        $.Expression,
        repeat(seq(',', $.Expression)),
        ')'
      )
    ),

    ConstructTemplate: $ => seq(
      '{',
      optional($.ConstructTriples),
      '}'
    ),

    ConstructTriples: $ => seq(
      $.TriplesSameSubject,
      repeat(seq(
        '.',
        $.TriplesSameSubject
      )),
      optional('.')
    ),

    TriplesSameSubject: $ => choice(
      seq(
        field('predicate', $.VarOrTerm),
        $.PropertyList
      ),
      seq(
        $.TriplesNode,
        optional($.PropertyList)
      )
    ),

    PropertyList: $ => seq(
      field('predicate', $.Verb),
      $.ObjectList,
      repeat(seq(
        ';',
        optional(seq(
          field('predicate', $.Verb),
          $.ObjectList
        ))
      ))
    ),

    Verb: $ => choice(
      $.VarOrIri,
      'a'
    ),

    ObjectList: $ => seq(
      field('object', $._Object),
      repeat(
        seq(
          ',',
          field('object', $._Object),
        ))
    ),

    _Object: $ => $.GraphNode,

    TriplesSameSubjectPath: $ => choice(
      seq(
        field('subject', $.VarOrTerm),
        $.PropertyListPath
      ),
      seq(
        $.TriplesNodePath,
        optional($.PropertyListPath)
      )
    ),

    PropertyListPath: $ => seq(
      field('predicate', choice(
        $._VerbPath,
        $._VerbSimple
      )),
      $.ObjectListPath,
      repeat(seq(
        ';',
        optional(seq(
          field('predicate', choice(
            $._VerbPath,
            $._VerbSimple
          )),
          $.ObjectList
        ))
      ))
    ),

    _VerbPath: $ => $.Path,

    _VerbSimple: $ => $.Var,

    ObjectListPath: $ => seq(
      field('object', $._ObjectPath),
      repeat(seq(
        ',',
        field('object', $._ObjectPath)
      ))
    ),

    _ObjectPath: $ => $.GraphNodePath,

    // [88 - 92]
    Path: $ => choice(
      $.PathElement,
      $.BinaryPath
    ),

    BinaryPath: $ => choice(
      $.AlternativePath,
      $.SequencePath,
    ),

    AlternativePath: $ => prec.left(seq($.Path, '|', $.Path)),

    SequencePath: $ => prec.left(1, seq($.Path, '/', $.Path)),

    PathElement: $ => seq(
      optional($.PathInverse),
      $._PathPrimary,
      optional($.PathMod)
    ),

    PathInverse: $ => '^',

    PathMod: $ => token(choice(
      '?',
      '*',
      '+'
    )),

    _PathPrimary: $ => choice(
      $.iri,
      'a',
      seq('!', $.PathNegatedPropertySet),
      seq('(', $.Path, ')')
    ),

    PathNegatedPropertySet: $ => choice(
      $.PathOneInPropertySet,
      seq(
        '(',
        optional(seq(
          $.PathOneInPropertySet,
          repeat(seq('|', $.PathOneInPropertySet)),
        )),
        ')'
      )
    ),

    PathOneInPropertySet: $ => choice(
      $.iri,
      'a',
      seq(
        '^',
        choice(
          $.iri,
          'a'
        )
      )
    ),

    Integer: $ => $.INTEGER,

    TriplesNode: $ => choice(
      $.Collection,
      $.BlankNodePropertyList
    ),

    BlankNodePropertyList: $ => seq(
      '[',
      $.PropertyList,
      ']'
    ),

    TriplesNodePath: $ => choice(
      $.CollectionPath,
      $.BlankNodePropertyListPath
    ),

    BlankNodePropertyListPath: $ => seq(
      '[',
      $.PropertyListPath,
      ']'
    ),

    Collection: $ => seq(
      '(',
      repeat1($.GraphNode),
      ')'
    ),

    CollectionPath: $ => seq(
      '(',
      repeat1($.GraphNodePath),
      ')'
    ),

    GraphNode: $ => choice(
      $.VarOrTerm,
      $.TriplesNode
    ),

    GraphNodePath: $ => choice(
      $.VarOrTerm,
      $.TriplesNodePath
    ),

    VarOrTerm: $ => choice(
      $.Var,
      $.GraphTerm
    ),

    VarOrIri: $ => choice(
      $.Var,
      $.iri,
    ),

    Var: _ => choice(
      VAR1,
      VAR2
    ),

    GraphTerm: $ => choice(
      $.iri,
      $.RDFLiteral,
      $.NumericLiteral,
      $.BooleanLiteral,
      $.BlankNode,
      $.NIL
    ),

    Expression: $ => choice(
      $.PrimaryExpression,
      $.UnaryExpression,
      $.BinaryExpression,
    ),

    // [118]
    UnaryExpression: $ => seq(
      choice(
        '!',
        '+',
        '-'
      ),
      $.PrimaryExpression,
    ),

    // [110 - 117]
    BinaryExpression: $ => choice(
      // conditional
      prec.left(seq($.Expression, '||', $.Expression)),
      prec.left(1, seq($.Expression, '&&', $.Expression)),
      // relational      E
      prec.left(2, seq($.Expression, '=', $.Expression)),
      prec.left(2, seq($.Expression, '!=', $.Expression)),
      prec.left(2, seq($.Expression, '<', $.Expression)),
      prec.left(2, seq($.Expression, '>', $.Expression)),
      prec.left(2, seq($.Expression, '<=', $.Expression)),
      prec.left(2, seq($.Expression, '>=', $.Expression)),
      prec.left(2, seq($.Expression, 'IN'.toCaseInsensitiv(), $.ExpressionList)),
      prec.left(2, seq($.Expression, 'NOT'.toCaseInsensitiv(), 'IN'.toCaseInsensitiv(), $.ExpressionList)),
      // numeric         E
      prec.left(3, seq($.Expression, '+', $.Expression)),
      prec.left(3, seq($.Expression, '-', $.Expression)),
      prec.left(4, seq($.Expression, '*', $.Expression)),
      prec.left(4, seq($.Expression, '/', $.Expression)),
    ),

    PrimaryExpression: $ => choice(
      $.BrackettedExpression,
      $.BuiltInCall,
      $.iri,
      $.FunctionCall,
      $.RDFLiteral,
      $.NumericLiteral,
      $.BooleanLiteral,
      $.Var
    ),

    BrackettedExpression: $ => seq(
      '(',
      $.Expression,
      ')'
    ),

    BuiltInCall: $ => choice(
      $.Aggregate,
      $.RegexExpression,
      $.SubstringExpression,
      $.StrReplaceExpression,
      $.ExistsFunc,
      $.NotExistsFunc,
      seq('STR'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('LANG'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('LANGMATCHES'.toCaseInsensitiv(), '(', $.Expression, ',', $.Expression, ')'),
      seq('DATATYPE'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('BOUND'.toCaseInsensitiv(), '(', $.Var, ')'),
      seq('IRI'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('URI'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('BNODE'.toCaseInsensitiv(), choice(seq('(', $.Expression, ')'), $.NIL)),
      seq('RAND'.toCaseInsensitiv(), $.NIL),
      seq('ABS'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('CEIL'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('FLOOR'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('ROUND'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('CONCAT'.toCaseInsensitiv(), $.ExpressionList),
      seq('STRLEN'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('UCASE'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('LCASE'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('ENCODE_FOR_URI'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('CONTAINS'.toCaseInsensitiv(), '(', $.Expression, ',', $.Expression, ')'),
      seq('STRSTARTS'.toCaseInsensitiv(), '(', $.Expression, ',', $.Expression, ')'),
      seq('STRENDS'.toCaseInsensitiv(), '(', $.Expression, ',', $.Expression, ')'),
      seq('STRBEFORE'.toCaseInsensitiv(), '(', $.Expression, ',', $.Expression, ')'),
      seq('STRAFTER'.toCaseInsensitiv(), '(', $.Expression, ',', $.Expression, ')'),
      seq('YEAR'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('MONTH'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('DAY'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('HOURS'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('MINUTES'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('SECONDS'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('TIMEZONE'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('TZ'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('NOW'.toCaseInsensitiv(), $.NIL),
      seq('UUID'.toCaseInsensitiv(), $.NIL),
      seq('STRUUID'.toCaseInsensitiv(), $.NIL),
      seq('MD5'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('SHA1'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('SHA256'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('SHA384'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('SHA512'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('COALESCE'.toCaseInsensitiv(), $.ExpressionList),
      seq('IF'.toCaseInsensitiv(), '(', $.Expression, ',', $.Expression, ',', $.Expression, ')'),
      seq('STRLANG'.toCaseInsensitiv(), '(', $.Expression, ',', $.Expression, ')'),
      seq('STRDT'.toCaseInsensitiv(), '(', $.Expression, ',', $.Expression, ')'),
      seq('sameTerm'.toCaseInsensitiv(), '(', $.Expression, ',', $.Expression, ')'),
      seq('isIRI'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('isURI'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('isBLANK'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('isLITERAL'.toCaseInsensitiv(), '(', $.Expression, ')'),
      seq('isNUMERIC'.toCaseInsensitiv(), '(', $.Expression, ')')
    ),

    RegexExpression: $ => seq(
      'REGEX'.toCaseInsensitiv(),
      seq('(',
        field('text', $.Expression),
        ',',
        field('pattern', $.Expression),
        optional(seq(
          ',',
          field('flag', $.Expression))
        ),
        ')'
      )
    ),

    SubstringExpression: $ => seq(
      'SUBSTR'.toCaseInsensitiv(),
      '(',
      $.Expression,
      ',',
      $.Expression,
      optional(seq(',', $.Expression)),
      ')'
    ),

    StrReplaceExpression: $ => seq(
      'REPLACE'.toCaseInsensitiv(),
      '(',
      $.Expression,
      ',',
      $.Expression,
      ',',
      $.Expression,
      optional(seq(',', $.Expression)),
      ')'
    ),

    ExistsFunc: $ => seq(
      'EXISTS'.toCaseInsensitiv(),
      $.GroupGraphPattern
    ),

    NotExistsFunc: $ => seq(
      'NOT'.toCaseInsensitiv(),
      'EXISTS'.toCaseInsensitiv(),
      $.GroupGraphPattern
    ),

    Aggregate: $ => choice(
      seq(
        'COUNT'.toCaseInsensitiv(),
        '(',
        optional('DISTINCT'.toCaseInsensitiv()),
        choice(
          '*',
          $.Expression
        ),
        ')'
      ),
      seq('SUM'.toCaseInsensitiv(), '(', optional('DISTINCT'.toCaseInsensitiv()), $.Expression, ')'),
      seq('MIN'.toCaseInsensitiv(), '(', optional('DISTINCT'.toCaseInsensitiv()), $.Expression, ')'),
      seq('MAX'.toCaseInsensitiv(), '(', optional('DISTINCT'.toCaseInsensitiv()), $.Expression, ')'),
      seq('AVG'.toCaseInsensitiv(), '(', optional('DISTINCT'.toCaseInsensitiv()), $.Expression, ')'),
      seq('SAMPLE'.toCaseInsensitiv(), '(', optional('DISTINCT'.toCaseInsensitiv()), $.Expression, ')'),
      seq(
        'GROUP_CONCAT'.toCaseInsensitiv(),
        '(',
        optional('DISTINCT'.toCaseInsensitiv()),
        $.Expression,
        optional(seq(';', 'SEPARATOR'.toCaseInsensitiv(), '=', $.String)),
        ')'
      ),
    ),

    iriOrFunction: $ => seq(
      $.iri,
      optional($.ArgList)
    ),

    RDFLiteral: common.RDFLiteral_11,

    NumericLiteral: $ => choice(
      $.NumericLiteralUnsigned,
      $.NumericLiteralPositive,
      $.NumericLiteralNegative
    ),

    NumericLiteralUnsigned: $ => choice(
      $.INTEGER,
      $.DECIMAL,
      $.DOUBLE
    ),

    NumericLiteralPositive: $ => choice(
      $.INTEGER_POSITIVE,
      $.DECIMAL_POSITIVE,
      $.DOUBLE_POSITIVE
    ),

    NumericLiteralNegative: $ => choice(
      $.INTEGER_NEGATIVE,
      $.DECIMAL_NEGATIVE,
      $.DOUBLE_NEGATIVE
    ),

    BooleanLiteral: common.BooleanLiteral,

    String: common.String,

    iri: common.iri,

    PrefixedName: common.PrefixedName,

    BlankNode: common.BlankNode,

    IRIREF: common.IRIREF,

    _PNAME_LN: common._PNAME_LN,

    BLANK_NODE_LABEL: common.BLANK_NODE_LABEL,

    LANGTAG: common.LANGTAG,



    LANGTAG: common.LANGTAG,

    INTEGER: _ => /[0-9]+/,

    DECIMAL: _ => token(seq(/[0-9]*/, '.', /[0-9]+/)),

    DOUBLE: _ => token(choice(
      seq(/[0-9]+/, '.', /[0-9]*/, seq(...EXPONENT)),
      seq('.', /[0-9]+/, seq(...EXPONENT)),
      seq(/[0-9]+/, seq(...EXPONENT))
    )),

    INTEGER_POSITIVE: _ => token(seq('+', /[0-9]+/)),

    DECIMAL_POSITIVE: _ => token(seq('+', /[0-9]*/, '.', /[0-9]+/)),

    DOUBLE_POSITIVE: _ => token(seq(
      '+',
      choice(
        seq(/[0-9]+/, '.', /[0-9]*/, seq(...EXPONENT)),
        seq('.', /[0-9]+/, seq(...EXPONENT)),
        seq(/[0-9]+/, seq(...EXPONENT))
      )
    )),

    INTEGER_NEGATIVE: _ => token(seq('-', /[0-9]+/)),

    DECIMAL_NEGATIVE: _ => token(seq('-', /[0-9]*/, '.', /[0-9]+/)),

    DOUBLE_NEGATIVE: _ => token(seq(
      '-',
      choice(
        seq(/[0-9]+/, '.', /[0-9]*/, seq(...EXPONENT)),
        seq('.', /[0-9]+/, seq(...EXPONENT)),
        seq(/[0-9]+/, seq(...EXPONENT))
      )
    )),

    // STRING_LITERAL1: _ => token(seq(
    //   "'",
    //   repeat(choice(
    //     /[^\x27\x5C\x0A\x0D]/,
    //     ECHAR
    //   )),
    //   "'"
    // )),
    //
    // STRING_LITERAL2: _ => token(seq(
    //   '"',
    //   repeat(choice(
    //     /[^\x22\x5C\x0A\x0D]/,
    //     ECHAR
    //   )),
    //   '"',
    // )),
    //
    // STRING_LITERAL_LONG1: _ => token(seq(
    //   "'''",
    //   repeat(seq(
    //     optional(choice(
    //       "'",
    //       "''",
    //     )),
    //     choice(
    //       /[^'\\]/,
    //       ECHAR
    //     )
    //   )),
    //   "'''",
    // )),
    //
    // STRING_LITERAL_LONG2: _ => token(seq(
    //   '"""',
    //   repeat(seq(
    //     optional(choice(
    //       '"',
    //       '""',
    //     )),
    //     choice(
    //       /[^"\\]/,
    //       ECHAR
    //     )
    //   )),
    //   '"""',
    // )),

    STRING_LITERAL_QUOTE: common.STRING_LITERAL_QUOTE,

    STRING_LITERAL_SINGLE_QUOTE: common.STRING_LITERAL_SINGLE_QUOTE,

    STRING_LITERAL_LONG_SINGLE_QUOTE: common.STRING_LITERAL_LONG_SINGLE_QUOTE,

    STRING_LITERAL_LONG_QUOTE: common.STRING_LITERAL_LONG_QUOTE,

    NIL: _ => token(seq(
      '(',
      repeat(choice(...WS)),
      ')'
    )),

    ANON: common.ANON,
  }
});
