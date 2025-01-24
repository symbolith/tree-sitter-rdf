#include "tree_sitter/parser.h"

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 45
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 34
#define ALIAS_COUNT 2
#define TOKEN_COUNT 21
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 4
#define MAX_ALIAS_SEQUENCE_LENGTH 4
#define PRODUCTION_ID_COUNT 5

enum ts_symbol_identifiers {
  sym_comment = 1,
  anon_sym_DOT = 2,
  anon_sym_CARET_CARET = 3,
  anon_sym_LT_LT_LPAREN = 4,
  anon_sym_RPAREN_GT_GT = 5,
  sym__EOL = 6,
  anon_sym_LT = 7,
  aux_sym__IRIREF_token1 = 8,
  aux_sym__IRIREF_token2 = 9,
  anon_sym_GT = 10,
  anon_sym_AT = 11,
  sym_language_tag = 12,
  anon_sym_DASH_DASH = 13,
  aux_sym_base_direction_token1 = 14,
  anon_sym_DQUOTE = 15,
  aux_sym__STRING_LITERAL_QUOTE_token1 = 16,
  aux_sym__STRING_LITERAL_QUOTE_token2 = 17,
  anon_sym__COLON = 18,
  aux_sym__BLANK_NODE_LABEL_token1 = 19,
  sym_ECHAR = 20,
  sym_ntriplesDoc = 21,
  sym_triple = 22,
  sym_literal = 23,
  sym_tripleTerm = 24,
  sym_triple_term = 25,
  sym__IRIREF = 26,
  sym__LANG_DIR = 27,
  sym_base_direction = 28,
  sym__STRING_LITERAL_QUOTE = 29,
  sym__BLANK_NODE_LABEL = 30,
  aux_sym_ntriplesDoc_repeat1 = 31,
  aux_sym__IRIREF_repeat1 = 32,
  aux_sym__STRING_LITERAL_QUOTE_repeat1 = 33,
  alias_sym_IRI = 34,
  alias_sym_lexical_form = 35,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [sym_comment] = "comment",
  [anon_sym_DOT] = ".",
  [anon_sym_CARET_CARET] = "^^",
  [anon_sym_LT_LT_LPAREN] = "<<(",
  [anon_sym_RPAREN_GT_GT] = ")>>",
  [sym__EOL] = "_EOL",
  [anon_sym_LT] = "<",
  [aux_sym__IRIREF_token1] = "_IRIREF_token1",
  [aux_sym__IRIREF_token2] = "UCHAR",
  [anon_sym_GT] = ">",
  [anon_sym_AT] = "@",
  [sym_language_tag] = "language_tag",
  [anon_sym_DASH_DASH] = "--",
  [aux_sym_base_direction_token1] = "base_direction_token1",
  [anon_sym_DQUOTE] = "\"",
  [aux_sym__STRING_LITERAL_QUOTE_token1] = "_STRING_LITERAL_QUOTE_token1",
  [aux_sym__STRING_LITERAL_QUOTE_token2] = "UCHAR",
  [anon_sym__COLON] = "_:",
  [aux_sym__BLANK_NODE_LABEL_token1] = "blank_node",
  [sym_ECHAR] = "ECHAR",
  [sym_ntriplesDoc] = "ntriplesDoc",
  [sym_triple] = "triple",
  [sym_literal] = "literal",
  [sym_tripleTerm] = "tripleTerm",
  [sym_triple_term] = "triple_term",
  [sym__IRIREF] = "_IRIREF",
  [sym__LANG_DIR] = "_LANG_DIR",
  [sym_base_direction] = "base_direction",
  [sym__STRING_LITERAL_QUOTE] = "_STRING_LITERAL_QUOTE",
  [sym__BLANK_NODE_LABEL] = "_BLANK_NODE_LABEL",
  [aux_sym_ntriplesDoc_repeat1] = "ntriplesDoc_repeat1",
  [aux_sym__IRIREF_repeat1] = "_IRIREF_repeat1",
  [aux_sym__STRING_LITERAL_QUOTE_repeat1] = "_STRING_LITERAL_QUOTE_repeat1",
  [alias_sym_IRI] = "IRI",
  [alias_sym_lexical_form] = "lexical_form",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [sym_comment] = sym_comment,
  [anon_sym_DOT] = anon_sym_DOT,
  [anon_sym_CARET_CARET] = anon_sym_CARET_CARET,
  [anon_sym_LT_LT_LPAREN] = anon_sym_LT_LT_LPAREN,
  [anon_sym_RPAREN_GT_GT] = anon_sym_RPAREN_GT_GT,
  [sym__EOL] = sym__EOL,
  [anon_sym_LT] = anon_sym_LT,
  [aux_sym__IRIREF_token1] = aux_sym__IRIREF_token1,
  [aux_sym__IRIREF_token2] = aux_sym__IRIREF_token2,
  [anon_sym_GT] = anon_sym_GT,
  [anon_sym_AT] = anon_sym_AT,
  [sym_language_tag] = sym_language_tag,
  [anon_sym_DASH_DASH] = anon_sym_DASH_DASH,
  [aux_sym_base_direction_token1] = aux_sym_base_direction_token1,
  [anon_sym_DQUOTE] = anon_sym_DQUOTE,
  [aux_sym__STRING_LITERAL_QUOTE_token1] = aux_sym__STRING_LITERAL_QUOTE_token1,
  [aux_sym__STRING_LITERAL_QUOTE_token2] = aux_sym__IRIREF_token2,
  [anon_sym__COLON] = anon_sym__COLON,
  [aux_sym__BLANK_NODE_LABEL_token1] = aux_sym__BLANK_NODE_LABEL_token1,
  [sym_ECHAR] = sym_ECHAR,
  [sym_ntriplesDoc] = sym_ntriplesDoc,
  [sym_triple] = sym_triple,
  [sym_literal] = sym_literal,
  [sym_tripleTerm] = sym_tripleTerm,
  [sym_triple_term] = sym_triple_term,
  [sym__IRIREF] = sym__IRIREF,
  [sym__LANG_DIR] = sym__LANG_DIR,
  [sym_base_direction] = sym_base_direction,
  [sym__STRING_LITERAL_QUOTE] = sym__STRING_LITERAL_QUOTE,
  [sym__BLANK_NODE_LABEL] = sym__BLANK_NODE_LABEL,
  [aux_sym_ntriplesDoc_repeat1] = aux_sym_ntriplesDoc_repeat1,
  [aux_sym__IRIREF_repeat1] = aux_sym__IRIREF_repeat1,
  [aux_sym__STRING_LITERAL_QUOTE_repeat1] = aux_sym__STRING_LITERAL_QUOTE_repeat1,
  [alias_sym_IRI] = alias_sym_IRI,
  [alias_sym_lexical_form] = alias_sym_lexical_form,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [sym_comment] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_DOT] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_CARET_CARET] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LT_LT_LPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RPAREN_GT_GT] = {
    .visible = true,
    .named = false,
  },
  [sym__EOL] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_LT] = {
    .visible = true,
    .named = false,
  },
  [aux_sym__IRIREF_token1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym__IRIREF_token2] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_GT] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_AT] = {
    .visible = true,
    .named = false,
  },
  [sym_language_tag] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_DASH_DASH] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_base_direction_token1] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_DQUOTE] = {
    .visible = true,
    .named = false,
  },
  [aux_sym__STRING_LITERAL_QUOTE_token1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym__STRING_LITERAL_QUOTE_token2] = {
    .visible = true,
    .named = true,
  },
  [anon_sym__COLON] = {
    .visible = true,
    .named = false,
  },
  [aux_sym__BLANK_NODE_LABEL_token1] = {
    .visible = true,
    .named = true,
  },
  [sym_ECHAR] = {
    .visible = true,
    .named = true,
  },
  [sym_ntriplesDoc] = {
    .visible = true,
    .named = true,
  },
  [sym_triple] = {
    .visible = true,
    .named = true,
  },
  [sym_literal] = {
    .visible = true,
    .named = true,
  },
  [sym_tripleTerm] = {
    .visible = true,
    .named = true,
  },
  [sym_triple_term] = {
    .visible = true,
    .named = true,
  },
  [sym__IRIREF] = {
    .visible = false,
    .named = true,
  },
  [sym__LANG_DIR] = {
    .visible = false,
    .named = true,
  },
  [sym_base_direction] = {
    .visible = true,
    .named = true,
  },
  [sym__STRING_LITERAL_QUOTE] = {
    .visible = false,
    .named = true,
  },
  [sym__BLANK_NODE_LABEL] = {
    .visible = false,
    .named = true,
  },
  [aux_sym_ntriplesDoc_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym__IRIREF_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym__STRING_LITERAL_QUOTE_repeat1] = {
    .visible = false,
    .named = false,
  },
  [alias_sym_IRI] = {
    .visible = true,
    .named = true,
  },
  [alias_sym_lexical_form] = {
    .visible = true,
    .named = true,
  },
};

enum ts_field_identifiers {
  field_datatype_IRI = 1,
  field_object = 2,
  field_predicate = 3,
  field_subject = 4,
};

static const char * const ts_field_names[] = {
  [0] = NULL,
  [field_datatype_IRI] = "datatype_IRI",
  [field_object] = "object",
  [field_predicate] = "predicate",
  [field_subject] = "subject",
};

static const TSFieldMapSlice ts_field_map_slices[PRODUCTION_ID_COUNT] = {
  [2] = {.index = 0, .length = 3},
  [4] = {.index = 3, .length = 1},
};

static const TSFieldMapEntry ts_field_map_entries[] = {
  [0] =
    {field_object, 2},
    {field_predicate, 1},
    {field_subject, 0},
  [3] =
    {field_datatype_IRI, 2},
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
  [1] = {
    [1] = alias_sym_IRI,
  },
  [3] = {
    [1] = alias_sym_lexical_form,
  },
};

static const uint16_t ts_non_terminal_alias_map[] = {
  aux_sym__IRIREF_repeat1, 2,
    aux_sym__IRIREF_repeat1,
    alias_sym_IRI,
  aux_sym__STRING_LITERAL_QUOTE_repeat1, 2,
    aux_sym__STRING_LITERAL_QUOTE_repeat1,
    alias_sym_lexical_form,
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
  [5] = 5,
  [6] = 6,
  [7] = 7,
  [8] = 8,
  [9] = 9,
  [10] = 10,
  [11] = 11,
  [12] = 12,
  [13] = 13,
  [14] = 14,
  [15] = 15,
  [16] = 16,
  [17] = 17,
  [18] = 18,
  [19] = 19,
  [20] = 20,
  [21] = 21,
  [22] = 22,
  [23] = 23,
  [24] = 24,
  [25] = 25,
  [26] = 26,
  [27] = 27,
  [28] = 28,
  [29] = 29,
  [30] = 30,
  [31] = 31,
  [32] = 32,
  [33] = 33,
  [34] = 34,
  [35] = 35,
  [36] = 36,
  [37] = 37,
  [38] = 38,
  [39] = 39,
  [40] = 40,
  [41] = 41,
  [42] = 42,
  [43] = 43,
  [44] = 44,
};

static TSCharacterRange aux_sym__BLANK_NODE_LABEL_token1_character_set_1[] = {
  {'0', '9'}, {'A', 'Z'}, {'_', '_'}, {'a', 'z'}, {0xc0, 0xd6}, {0xd8, 0xf6}, {0xf8, 0x2ff}, {0x370, 0x37d},
  {0x37f, 0x1fff}, {0x200c, 0x200d}, {0x2070, 0x218f}, {0x2c00, 0x2fef}, {0x3001, 0xd7ff}, {0xf900, 0xfdcf}, {0xfdf0, 0xfffd}, {0x10000, 0xeffff},
};

static TSCharacterRange aux_sym__BLANK_NODE_LABEL_token1_character_set_2[] = {
  {'-', '.'}, {'0', '9'}, {'A', 'Z'}, {'_', '_'}, {'a', 'z'}, {0xb7, 0xb7}, {0xc0, 0xd6}, {0xd8, 0xf6},
  {0xf8, 0x37d}, {0x37f, 0x1fff}, {0x200c, 0x200d}, {0x203f, 0x2040}, {0x2070, 0x218f}, {0x2c00, 0x2fef}, {0x3001, 0xd7ff}, {0xf900, 0xfdcf},
  {0xfdf0, 0xfffd}, {0x10000, 0xeffff},
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(37);
      ADVANCE_MAP(
        '"', 54,
        '#', 46,
        '.', 39,
        '<', 45,
        '>', 48,
        '@', 49,
        '\\', 13,
        '^', 15,
      );
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(35);
      if (lookahead > ' ' &&
          lookahead != '`' &&
          (lookahead < '{' || '}' < lookahead)) ADVANCE(46);
      END_STATE();
    case 1:
      if (lookahead == '"') ADVANCE(54);
      if (lookahead == '#') ADVANCE(55);
      if (lookahead == '\\') ADVANCE(14);
      if (lookahead == '\n' ||
          lookahead == '\r') SKIP(1);
      if (('\t' <= lookahead && lookahead <= '\f') ||
          lookahead == ' ') ADVANCE(56);
      if (lookahead != 0) ADVANCE(55);
      END_STATE();
    case 2:
      if (lookahead == '#') ADVANCE(46);
      if (lookahead == '>') ADVANCE(48);
      if (lookahead == '\\') ADVANCE(12);
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(3);
      if (lookahead > ' ' &&
          lookahead != '"' &&
          lookahead != '#' &&
          lookahead != '<' &&
          lookahead != '^' &&
          lookahead != '`' &&
          (lookahead < '{' || '}' < lookahead)) ADVANCE(46);
      END_STATE();
    case 3:
      if (lookahead == '#') ADVANCE(38);
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(3);
      END_STATE();
    case 4:
      if (lookahead == '#') ADVANCE(38);
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(3);
      if (set_contains(aux_sym__BLANK_NODE_LABEL_token1_character_set_1, 16, lookahead)) ADVANCE(59);
      END_STATE();
    case 5:
      if (lookahead == '#') ADVANCE(38);
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(5);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(53);
      END_STATE();
    case 6:
      if (lookahead == '(') ADVANCE(41);
      END_STATE();
    case 7:
      if (lookahead == '-') ADVANCE(52);
      END_STATE();
    case 8:
      if (lookahead == '.') ADVANCE(8);
      if (set_contains(aux_sym__BLANK_NODE_LABEL_token1_character_set_2, 18, lookahead)) ADVANCE(59);
      END_STATE();
    case 9:
      if (lookahead == ':') ADVANCE(58);
      END_STATE();
    case 10:
      if (lookahead == '>') ADVANCE(42);
      END_STATE();
    case 11:
      if (lookahead == '>') ADVANCE(10);
      END_STATE();
    case 12:
      if (lookahead == 'U') ADVANCE(30);
      if (lookahead == 'u') ADVANCE(22);
      END_STATE();
    case 13:
      ADVANCE_MAP(
        'U', 30,
        'u', 22,
        '"', 60,
        '\'', 60,
        '\\', 60,
        'b', 60,
        'f', 60,
        'n', 60,
        'r', 60,
        't', 60,
      );
      END_STATE();
    case 14:
      ADVANCE_MAP(
        'U', 31,
        'u', 23,
        '"', 60,
        '\'', 60,
        '\\', 60,
        'b', 60,
        'f', 60,
        'n', 60,
        'r', 60,
        't', 60,
      );
      END_STATE();
    case 15:
      if (lookahead == '^') ADVANCE(40);
      END_STATE();
    case 16:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(47);
      END_STATE();
    case 17:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(57);
      END_STATE();
    case 18:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(16);
      END_STATE();
    case 19:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(17);
      END_STATE();
    case 20:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(18);
      END_STATE();
    case 21:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(19);
      END_STATE();
    case 22:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(20);
      END_STATE();
    case 23:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(21);
      END_STATE();
    case 24:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(22);
      END_STATE();
    case 25:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(23);
      END_STATE();
    case 26:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(24);
      END_STATE();
    case 27:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(25);
      END_STATE();
    case 28:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(26);
      END_STATE();
    case 29:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(27);
      END_STATE();
    case 30:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(28);
      END_STATE();
    case 31:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'F') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(29);
      END_STATE();
    case 32:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(51);
      END_STATE();
    case 33:
      if (eof) ADVANCE(37);
      ADVANCE_MAP(
        '"', 54,
        '#', 38,
        ')', 11,
        '-', 7,
        '.', 39,
        '<', 45,
        '@', 49,
        '^', 15,
        '_', 9,
      );
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(33);
      END_STATE();
    case 34:
      if (eof) ADVANCE(37);
      ADVANCE_MAP(
        '"', 54,
        '#', 38,
        ')', 11,
        '-', 7,
        '.', 39,
        '<', 45,
        '@', 49,
        '^', 15,
        '_', 9,
      );
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(33);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 35:
      if (eof) ADVANCE(37);
      if (lookahead == '"') ADVANCE(54);
      if (lookahead == '#') ADVANCE(38);
      if (lookahead == '.') ADVANCE(39);
      if (lookahead == '<') ADVANCE(45);
      if (lookahead == '@') ADVANCE(49);
      if (lookahead == '\\') ADVANCE(14);
      if (lookahead == '^') ADVANCE(15);
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(35);
      END_STATE();
    case 36:
      if (eof) ADVANCE(37);
      if (lookahead == '#') ADVANCE(38);
      if (lookahead == '<') ADVANCE(44);
      if (lookahead == '_') ADVANCE(9);
      if (lookahead == '\n' ||
          lookahead == '\r') ADVANCE(43);
      if (('\t' <= lookahead && lookahead <= '\f') ||
          lookahead == ' ') SKIP(36);
      END_STATE();
    case 37:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 38:
      ACCEPT_TOKEN(sym_comment);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(38);
      END_STATE();
    case 39:
      ACCEPT_TOKEN(anon_sym_DOT);
      END_STATE();
    case 40:
      ACCEPT_TOKEN(anon_sym_CARET_CARET);
      END_STATE();
    case 41:
      ACCEPT_TOKEN(anon_sym_LT_LT_LPAREN);
      END_STATE();
    case 42:
      ACCEPT_TOKEN(anon_sym_RPAREN_GT_GT);
      END_STATE();
    case 43:
      ACCEPT_TOKEN(sym__EOL);
      if (lookahead == '\n' ||
          lookahead == '\r') ADVANCE(43);
      END_STATE();
    case 44:
      ACCEPT_TOKEN(anon_sym_LT);
      END_STATE();
    case 45:
      ACCEPT_TOKEN(anon_sym_LT);
      if (lookahead == '<') ADVANCE(6);
      END_STATE();
    case 46:
      ACCEPT_TOKEN(aux_sym__IRIREF_token1);
      END_STATE();
    case 47:
      ACCEPT_TOKEN(aux_sym__IRIREF_token2);
      END_STATE();
    case 48:
      ACCEPT_TOKEN(anon_sym_GT);
      END_STATE();
    case 49:
      ACCEPT_TOKEN(anon_sym_AT);
      END_STATE();
    case 50:
      ACCEPT_TOKEN(sym_language_tag);
      if (lookahead == '-') ADVANCE(32);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(50);
      END_STATE();
    case 51:
      ACCEPT_TOKEN(sym_language_tag);
      if (lookahead == '-') ADVANCE(32);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(51);
      END_STATE();
    case 52:
      ACCEPT_TOKEN(anon_sym_DASH_DASH);
      END_STATE();
    case 53:
      ACCEPT_TOKEN(aux_sym_base_direction_token1);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(53);
      END_STATE();
    case 54:
      ACCEPT_TOKEN(anon_sym_DQUOTE);
      END_STATE();
    case 55:
      ACCEPT_TOKEN(aux_sym__STRING_LITERAL_QUOTE_token1);
      END_STATE();
    case 56:
      ACCEPT_TOKEN(aux_sym__STRING_LITERAL_QUOTE_token1);
      if (lookahead == '#') ADVANCE(55);
      if (lookahead == '\t' ||
          lookahead == 0x0b ||
          lookahead == '\f' ||
          lookahead == ' ') ADVANCE(56);
      if (lookahead != 0 &&
          (lookahead < '\t' || '\r' < lookahead) &&
          lookahead != '"' &&
          lookahead != '#' &&
          lookahead != '\\') ADVANCE(55);
      END_STATE();
    case 57:
      ACCEPT_TOKEN(aux_sym__STRING_LITERAL_QUOTE_token2);
      END_STATE();
    case 58:
      ACCEPT_TOKEN(anon_sym__COLON);
      END_STATE();
    case 59:
      ACCEPT_TOKEN(aux_sym__BLANK_NODE_LABEL_token1);
      if (lookahead == '.') ADVANCE(8);
      if (set_contains(aux_sym__BLANK_NODE_LABEL_token1_character_set_2, 18, lookahead)) ADVANCE(59);
      END_STATE();
    case 60:
      ACCEPT_TOKEN(sym_ECHAR);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 36},
  [2] = {.lex_state = 34},
  [3] = {.lex_state = 34},
  [4] = {.lex_state = 34},
  [5] = {.lex_state = 34},
  [6] = {.lex_state = 34},
  [7] = {.lex_state = 34},
  [8] = {.lex_state = 34},
  [9] = {.lex_state = 1},
  [10] = {.lex_state = 34},
  [11] = {.lex_state = 1},
  [12] = {.lex_state = 34},
  [13] = {.lex_state = 34},
  [14] = {.lex_state = 1},
  [15] = {.lex_state = 34},
  [16] = {.lex_state = 34},
  [17] = {.lex_state = 2},
  [18] = {.lex_state = 2},
  [19] = {.lex_state = 2},
  [20] = {.lex_state = 1},
  [21] = {.lex_state = 34},
  [22] = {.lex_state = 2},
  [23] = {.lex_state = 36},
  [24] = {.lex_state = 34},
  [25] = {.lex_state = 36},
  [26] = {.lex_state = 36},
  [27] = {.lex_state = 36},
  [28] = {.lex_state = 34},
  [29] = {.lex_state = 34},
  [30] = {.lex_state = 36},
  [31] = {.lex_state = 34},
  [32] = {.lex_state = 34},
  [33] = {.lex_state = 34},
  [34] = {.lex_state = 36},
  [35] = {.lex_state = 34},
  [36] = {.lex_state = 34},
  [37] = {.lex_state = 34},
  [38] = {.lex_state = 34},
  [39] = {.lex_state = 34},
  [40] = {.lex_state = 4},
  [41] = {.lex_state = 34},
  [42] = {.lex_state = 34},
  [43] = {.lex_state = 34},
  [44] = {.lex_state = 5},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [sym_comment] = ACTIONS(3),
    [anon_sym_DOT] = ACTIONS(1),
    [anon_sym_CARET_CARET] = ACTIONS(1),
    [anon_sym_LT_LT_LPAREN] = ACTIONS(1),
    [anon_sym_LT] = ACTIONS(1),
    [aux_sym__IRIREF_token1] = ACTIONS(1),
    [aux_sym__IRIREF_token2] = ACTIONS(1),
    [anon_sym_GT] = ACTIONS(1),
    [anon_sym_AT] = ACTIONS(1),
    [anon_sym_DQUOTE] = ACTIONS(1),
    [aux_sym__STRING_LITERAL_QUOTE_token2] = ACTIONS(1),
    [sym_ECHAR] = ACTIONS(1),
  },
  [1] = {
    [sym_ntriplesDoc] = STATE(42),
    [sym_triple] = STATE(26),
    [sym__IRIREF] = STATE(28),
    [sym__BLANK_NODE_LABEL] = STATE(28),
    [aux_sym_ntriplesDoc_repeat1] = STATE(25),
    [ts_builtin_sym_end] = ACTIONS(5),
    [sym_comment] = ACTIONS(3),
    [sym__EOL] = ACTIONS(7),
    [anon_sym_LT] = ACTIONS(9),
    [anon_sym__COLON] = ACTIONS(11),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 7,
    ACTIONS(9), 1,
      anon_sym_LT,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(15), 1,
      anon_sym_LT_LT_LPAREN,
    ACTIONS(17), 1,
      anon_sym_DQUOTE,
    ACTIONS(19), 1,
      anon_sym__COLON,
    STATE(12), 1,
      sym__STRING_LITERAL_QUOTE,
    STATE(38), 4,
      sym_literal,
      sym_tripleTerm,
      sym__IRIREF,
      sym__BLANK_NODE_LABEL,
  [25] = 7,
    ACTIONS(9), 1,
      anon_sym_LT,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(15), 1,
      anon_sym_LT_LT_LPAREN,
    ACTIONS(17), 1,
      anon_sym_DQUOTE,
    ACTIONS(19), 1,
      anon_sym__COLON,
    STATE(12), 1,
      sym__STRING_LITERAL_QUOTE,
    STATE(43), 4,
      sym_literal,
      sym_tripleTerm,
      sym__IRIREF,
      sym__BLANK_NODE_LABEL,
  [50] = 6,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(19), 1,
      anon_sym__COLON,
    ACTIONS(21), 1,
      ts_builtin_sym_end,
    ACTIONS(23), 1,
      anon_sym_LT,
    STATE(34), 1,
      sym_triple,
    STATE(28), 2,
      sym__IRIREF,
      sym__BLANK_NODE_LABEL,
  [70] = 6,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(19), 1,
      anon_sym__COLON,
    ACTIONS(23), 1,
      anon_sym_LT,
    ACTIONS(25), 1,
      ts_builtin_sym_end,
    STATE(34), 1,
      sym_triple,
    STATE(28), 2,
      sym__IRIREF,
      sym__BLANK_NODE_LABEL,
  [90] = 3,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(29), 1,
      anon_sym_LT,
    ACTIONS(27), 5,
      anon_sym_DOT,
      anon_sym_LT_LT_LPAREN,
      anon_sym_RPAREN_GT_GT,
      anon_sym_DQUOTE,
      anon_sym__COLON,
  [104] = 6,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(19), 1,
      anon_sym__COLON,
    ACTIONS(23), 1,
      anon_sym_LT,
    ACTIONS(31), 1,
      ts_builtin_sym_end,
    STATE(34), 1,
      sym_triple,
    STATE(28), 2,
      sym__IRIREF,
      sym__BLANK_NODE_LABEL,
  [124] = 3,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(35), 1,
      anon_sym_LT,
    ACTIONS(33), 5,
      anon_sym_DOT,
      anon_sym_LT_LT_LPAREN,
      anon_sym_RPAREN_GT_GT,
      anon_sym_DQUOTE,
      anon_sym__COLON,
  [138] = 5,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(37), 1,
      anon_sym_DQUOTE,
    ACTIONS(39), 1,
      aux_sym__STRING_LITERAL_QUOTE_token1,
    STATE(9), 1,
      aux_sym__STRING_LITERAL_QUOTE_repeat1,
    ACTIONS(42), 2,
      aux_sym__STRING_LITERAL_QUOTE_token2,
      sym_ECHAR,
  [155] = 5,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(19), 1,
      anon_sym__COLON,
    ACTIONS(23), 1,
      anon_sym_LT,
    STATE(39), 1,
      sym_triple_term,
    STATE(29), 2,
      sym__IRIREF,
      sym__BLANK_NODE_LABEL,
  [172] = 5,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(45), 1,
      anon_sym_DQUOTE,
    ACTIONS(47), 1,
      aux_sym__STRING_LITERAL_QUOTE_token1,
    STATE(14), 1,
      aux_sym__STRING_LITERAL_QUOTE_repeat1,
    ACTIONS(49), 2,
      aux_sym__STRING_LITERAL_QUOTE_token2,
      sym_ECHAR,
  [189] = 5,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(53), 1,
      anon_sym_CARET_CARET,
    ACTIONS(55), 1,
      anon_sym_AT,
    STATE(32), 1,
      sym__LANG_DIR,
    ACTIONS(51), 2,
      anon_sym_DOT,
      anon_sym_RPAREN_GT_GT,
  [206] = 5,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(19), 1,
      anon_sym__COLON,
    ACTIONS(23), 1,
      anon_sym_LT,
    STATE(34), 1,
      sym_triple,
    STATE(28), 2,
      sym__IRIREF,
      sym__BLANK_NODE_LABEL,
  [223] = 5,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(47), 1,
      aux_sym__STRING_LITERAL_QUOTE_token1,
    ACTIONS(57), 1,
      anon_sym_DQUOTE,
    STATE(9), 1,
      aux_sym__STRING_LITERAL_QUOTE_repeat1,
    ACTIONS(49), 2,
      aux_sym__STRING_LITERAL_QUOTE_token2,
      sym_ECHAR,
  [240] = 4,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(61), 1,
      anon_sym_DASH_DASH,
    STATE(36), 1,
      sym_base_direction,
    ACTIONS(59), 2,
      anon_sym_DOT,
      anon_sym_RPAREN_GT_GT,
  [254] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(63), 4,
      anon_sym_DOT,
      anon_sym_CARET_CARET,
      anon_sym_RPAREN_GT_GT,
      anon_sym_AT,
  [264] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(67), 1,
      anon_sym_GT,
    STATE(18), 1,
      aux_sym__IRIREF_repeat1,
    ACTIONS(65), 2,
      aux_sym__IRIREF_token1,
      aux_sym__IRIREF_token2,
  [278] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(72), 1,
      anon_sym_GT,
    STATE(18), 1,
      aux_sym__IRIREF_repeat1,
    ACTIONS(69), 2,
      aux_sym__IRIREF_token1,
      aux_sym__IRIREF_token2,
  [292] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(74), 1,
      anon_sym_GT,
    STATE(17), 1,
      aux_sym__IRIREF_repeat1,
    ACTIONS(65), 2,
      aux_sym__IRIREF_token1,
      aux_sym__IRIREF_token2,
  [306] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(78), 1,
      aux_sym__STRING_LITERAL_QUOTE_token1,
    ACTIONS(76), 3,
      anon_sym_DQUOTE,
      aux_sym__STRING_LITERAL_QUOTE_token2,
      sym_ECHAR,
  [318] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(80), 4,
      anon_sym_DOT,
      anon_sym_CARET_CARET,
      anon_sym_RPAREN_GT_GT,
      anon_sym_AT,
  [328] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(82), 3,
      aux_sym__IRIREF_token1,
      aux_sym__IRIREF_token2,
      anon_sym_GT,
  [337] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(84), 1,
      ts_builtin_sym_end,
    ACTIONS(86), 1,
      sym__EOL,
    STATE(23), 1,
      aux_sym_ntriplesDoc_repeat1,
  [350] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(89), 3,
      anon_sym_DOT,
      anon_sym_RPAREN_GT_GT,
      anon_sym_LT,
  [359] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(25), 1,
      ts_builtin_sym_end,
    ACTIONS(91), 1,
      sym__EOL,
    STATE(23), 1,
      aux_sym_ntriplesDoc_repeat1,
  [372] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(25), 1,
      ts_builtin_sym_end,
    ACTIONS(91), 1,
      sym__EOL,
    STATE(27), 1,
      aux_sym_ntriplesDoc_repeat1,
  [385] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(31), 1,
      ts_builtin_sym_end,
    ACTIONS(93), 1,
      sym__EOL,
    STATE(23), 1,
      aux_sym_ntriplesDoc_repeat1,
  [398] = 3,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(23), 1,
      anon_sym_LT,
    STATE(2), 1,
      sym__IRIREF,
  [408] = 3,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(23), 1,
      anon_sym_LT,
    STATE(3), 1,
      sym__IRIREF,
  [418] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(95), 2,
      ts_builtin_sym_end,
      sym__EOL,
  [426] = 3,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(23), 1,
      anon_sym_LT,
    STATE(35), 1,
      sym__IRIREF,
  [436] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(97), 2,
      anon_sym_DOT,
      anon_sym_RPAREN_GT_GT,
  [444] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(99), 2,
      anon_sym_DOT,
      anon_sym_RPAREN_GT_GT,
  [452] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(84), 2,
      ts_builtin_sym_end,
      sym__EOL,
  [460] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(101), 2,
      anon_sym_DOT,
      anon_sym_RPAREN_GT_GT,
  [468] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(103), 2,
      anon_sym_DOT,
      anon_sym_RPAREN_GT_GT,
  [476] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(105), 2,
      anon_sym_DOT,
      anon_sym_RPAREN_GT_GT,
  [484] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(107), 1,
      anon_sym_DOT,
  [491] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(109), 1,
      anon_sym_RPAREN_GT_GT,
  [498] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(111), 1,
      aux_sym__BLANK_NODE_LABEL_token1,
  [505] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(113), 1,
      sym_language_tag,
  [512] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(115), 1,
      ts_builtin_sym_end,
  [519] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(117), 1,
      anon_sym_RPAREN_GT_GT,
  [526] = 2,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(119), 1,
      aux_sym_base_direction_token1,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 25,
  [SMALL_STATE(4)] = 50,
  [SMALL_STATE(5)] = 70,
  [SMALL_STATE(6)] = 90,
  [SMALL_STATE(7)] = 104,
  [SMALL_STATE(8)] = 124,
  [SMALL_STATE(9)] = 138,
  [SMALL_STATE(10)] = 155,
  [SMALL_STATE(11)] = 172,
  [SMALL_STATE(12)] = 189,
  [SMALL_STATE(13)] = 206,
  [SMALL_STATE(14)] = 223,
  [SMALL_STATE(15)] = 240,
  [SMALL_STATE(16)] = 254,
  [SMALL_STATE(17)] = 264,
  [SMALL_STATE(18)] = 278,
  [SMALL_STATE(19)] = 292,
  [SMALL_STATE(20)] = 306,
  [SMALL_STATE(21)] = 318,
  [SMALL_STATE(22)] = 328,
  [SMALL_STATE(23)] = 337,
  [SMALL_STATE(24)] = 350,
  [SMALL_STATE(25)] = 359,
  [SMALL_STATE(26)] = 372,
  [SMALL_STATE(27)] = 385,
  [SMALL_STATE(28)] = 398,
  [SMALL_STATE(29)] = 408,
  [SMALL_STATE(30)] = 418,
  [SMALL_STATE(31)] = 426,
  [SMALL_STATE(32)] = 436,
  [SMALL_STATE(33)] = 444,
  [SMALL_STATE(34)] = 452,
  [SMALL_STATE(35)] = 460,
  [SMALL_STATE(36)] = 468,
  [SMALL_STATE(37)] = 476,
  [SMALL_STATE(38)] = 484,
  [SMALL_STATE(39)] = 491,
  [SMALL_STATE(40)] = 498,
  [SMALL_STATE(41)] = 505,
  [SMALL_STATE(42)] = 512,
  [SMALL_STATE(43)] = 519,
  [SMALL_STATE(44)] = 526,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = false}}, SHIFT_EXTRA(),
  [5] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_ntriplesDoc, 0, 0, 0),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [9] = {.entry = {.count = 1, .reusable = false}}, SHIFT(19),
  [11] = {.entry = {.count = 1, .reusable = false}}, SHIFT(40),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT_EXTRA(),
  [15] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [17] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [19] = {.entry = {.count = 1, .reusable = true}}, SHIFT(40),
  [21] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_ntriplesDoc, 3, 0, 0),
  [23] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [25] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_ntriplesDoc, 1, 0, 0),
  [27] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__IRIREF, 2, 0, 0),
  [29] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__IRIREF, 2, 0, 0),
  [31] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_ntriplesDoc, 2, 0, 0),
  [33] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__IRIREF, 3, 0, 1),
  [35] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__IRIREF, 3, 0, 1),
  [37] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym__STRING_LITERAL_QUOTE_repeat1, 2, 0, 0),
  [39] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__STRING_LITERAL_QUOTE_repeat1, 2, 0, 0), SHIFT_REPEAT(20),
  [42] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym__STRING_LITERAL_QUOTE_repeat1, 2, 0, 0), SHIFT_REPEAT(20),
  [45] = {.entry = {.count = 1, .reusable = false}}, SHIFT(16),
  [47] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [49] = {.entry = {.count = 1, .reusable = false}}, SHIFT(20),
  [51] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_literal, 1, 0, 0),
  [53] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
  [55] = {.entry = {.count = 1, .reusable = true}}, SHIFT(41),
  [57] = {.entry = {.count = 1, .reusable = false}}, SHIFT(21),
  [59] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__LANG_DIR, 2, 0, 0),
  [61] = {.entry = {.count = 1, .reusable = true}}, SHIFT(44),
  [63] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__STRING_LITERAL_QUOTE, 2, 0, 0),
  [65] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [67] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [69] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__IRIREF_repeat1, 2, 0, 0), SHIFT_REPEAT(22),
  [72] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__IRIREF_repeat1, 2, 0, 0),
  [74] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [76] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym__STRING_LITERAL_QUOTE_repeat1, 1, 0, 0),
  [78] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__STRING_LITERAL_QUOTE_repeat1, 1, 0, 0),
  [80] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__STRING_LITERAL_QUOTE, 3, 0, 3),
  [82] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__IRIREF_repeat1, 1, 0, 0),
  [84] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_ntriplesDoc_repeat1, 2, 0, 0),
  [86] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_ntriplesDoc_repeat1, 2, 0, 0), SHIFT_REPEAT(13),
  [89] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__BLANK_NODE_LABEL, 2, 0, 0),
  [91] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [93] = {.entry = {.count = 1, .reusable = true}}, SHIFT(4),
  [95] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_triple, 4, 0, 2),
  [97] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_literal, 2, 0, 0),
  [99] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tripleTerm, 3, 0, 0),
  [101] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_literal, 3, 0, 4),
  [103] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__LANG_DIR, 3, 0, 0),
  [105] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_base_direction, 2, 0, 0),
  [107] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [109] = {.entry = {.count = 1, .reusable = true}}, SHIFT(33),
  [111] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [113] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [115] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [117] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_triple_term, 3, 0, 2),
  [119] = {.entry = {.count = 1, .reusable = true}}, SHIFT(37),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef TREE_SITTER_HIDE_SYMBOLS
#define TS_PUBLIC
#elif defined(_WIN32)
#define TS_PUBLIC __declspec(dllexport)
#else
#define TS_PUBLIC __attribute__((visibility("default")))
#endif

TS_PUBLIC const TSLanguage *tree_sitter_ntriples(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .field_names = ts_field_names,
    .field_map_slices = ts_field_map_slices,
    .field_map_entries = ts_field_map_entries,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
