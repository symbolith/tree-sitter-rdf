[
  (PathMod)
  "^"
  "||"
  "&&"
  "="
  "<"
  ">"
  "<="
  ">="
  "!="
  "+"
  "-"
  "*"
  "/"
  "!"
  "|"
] @operator

[
  "ADD"
  "ALL"
  "AS"
  "ASC"
  "ASK"
  "BIND"
  "BY"
  "CLEAR"
  "CONSTRUCT"
  "COPY"
  "CREATE"
  "DEFAULT"
  "DELETE"
  "DATA"
  "WHERE"
  "DESC"
  "DESCRIBE"
  "DISTINCT"
  "DROP"
  "FILTER"
  "FROM"
  "GRAPH"
  "GROUP"
  "HAVING"
  "INSERT"
  "DATA"
  "INTO"
  "LIMIT"
  "LOAD"
  "MINUS"
  "MOVE"
  "NAMED"
  "OFFSET"
  "OPTIONAL"
  "ORDER"
  "PREFIX"
  "REDUCED"
  "SELECT"
  "SERVICE"
  "SILENT"
  "USING"
  "VALUES"
  "WHERE"
  "WITH"
] @keyword

[
  "BASE"
  "PREFIX"
] @keyword.directive

[
  "ABS"
  "AVG"
  "BNODE"
  "BOUND"
  "CEIL"
  "CONCAT"
  "COALESCE"
  "CONTAINS"
  "DATATYPE"
  "DAY"
  "ENCODE_FOR_URI"
  "FLOOR"
  "HOURS"
  "IF"
  "IRI"
  "LANG"
  "LANGMATCHES"
  "LCASE"
  "MD5"
  "MINUTES"
  "MONTH"
  "NOW"
  "RAND"
  "REGEX"
  "ROUND"
  "SECONDS"
  "SHA1"
  "SHA256"
  "SHA384"
  "SHA512"
  "STR"
  "SUM"
  "MAX"
  "MIN"
  "SAMPLE"
  "GROUP_CONCAT"
  "SEPARATOR"
  "COUNT"
  "STRAFTER"
  "STRBEFORE"
  "STRDT"
  "STRENDS"
  "STRLANG"
  "STRLEN"
  "STRSTARTS"
  "STRUUID"
  "TIMEZONE"
  "TZ"
  "UCASE"
  "URI"
  "UUID"
  "YEAR"
  "isBLANK"
  "isIRI"
  "isLITERAL"
  "isNUMERIC"
  "isURI"
  "sameTerm"
] @function.builtin
;
[
  "."
  ","
  ";"
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
  (NIL)
  (ANON)
] @punctuation.bracket

[
  "@"
  "^^"
] @punctuation.special

[
  "NOT"
  "UNION"
  "MINUS"
  "EXISTS"
  "IN"
  ("NOT"
   "IN")
] @keyword.operator

[
  (UNDEF)
  "a"
] @constant.builtin

(comment) @comment

(BaseDecl iri: (_) @constant)

(PrefixDecl
  prefix_label: (_) @module
  iri: (_) @constant)

[
  (Var)
  (BlankNode)
  (iri)
  (PrefixedName)
] @variable

(FunctionCall
  identifier: (_) @function
  arguments: (_) @variable.parameter
)

(_ string: (_) @string)
(_ datatype_iri: (_) @type)
(_ language_tag: (_) @tag)



[
  (INTEGER)
  (INTEGER_NEGATIVE)
  (INTEGER_POSITIVE)
] @number

[
  (DECIMAL)
  (DOUBLE)
  (DECIMAL_NEGATIVE)
  (DOUBLE_NEGATIVE)
  (DECIMAL_POSITIVE)
  (DOUBLE_POSITIVE)
] @number.float

(BooleanLiteral) @constant.builtin @boolean
