(comment) @comment

(base iri: (_) @constant)

(prefix
  prefix_label: (_) @module
  iri: (_) @property)

(BlankNode) @variable.builtin
(verb)@property

(NumericLiteral) @number
(DOUBLE) @number.float
(BooleanLiteral) @constant.builtin @boolean

(_ string: (_) @string)
(_ datatype_iri: (_) @type)
(_ language_tag: (_) @tag)

[
  "@base"
  "@prefix"
  "BASE"
  "PREFIX"
] @keyword.directive

[
  "@"
  "^^"
] @punctuation.special

[
  "["
  "]"
  "("
  ")"
] @punctuation.bracket

[
  "."
  ";"
] @punctuation.delimiter

[
  "a"
] @constant.builtin


