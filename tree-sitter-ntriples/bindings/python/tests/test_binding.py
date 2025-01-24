from unittest import TestCase

import tree_sitter, tree_sitter_n_triples


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_n_triples.language())
        except Exception:
            self.fail("Error loading NTriples grammar")
