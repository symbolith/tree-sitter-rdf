from unittest import TestCase

from tree_sitter import Language, Parser
import tree_sitter_rdf12_ntriples


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            Parser(Language(tree_sitter_rdf12_ntriples.language()))
        except Exception:
            self.fail("Error loading RDF 1.2 N-Triples grammar")
