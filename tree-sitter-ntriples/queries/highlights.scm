[
 "<"
 ">"
 "\""
 "_:"
 "."
] @punctuation.delimiter

[
 "<<("
 ")>>"
] @punctuation.bracket

[
 "@"
 "--"
 "^^"
] @operator


[
 (ECHAR)
 (UCHAR)
] @string.escape

(comment) @comment

(lexical_form) @string

[
 (language_tag)
 (base_direction)
] @attribute

datatype_IRI: (_) @type

(blank_node) @property
