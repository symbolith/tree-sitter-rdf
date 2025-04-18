from unittest import TestCase

from tree_sitter import Language, Parser
import tree_sitter_rdf11_nquads


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            Parser(Language(tree_sitter_rdf11_nquads.language()))
        except Exception:
            self.fail("Error loading RDF 1.1 N-Quads grammar")
