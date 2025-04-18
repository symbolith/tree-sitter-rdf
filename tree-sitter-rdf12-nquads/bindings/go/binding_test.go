package tree_sitter_rdf12_nquads_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_rdf12_nquads "git+github.com/gordiandziwis/tree-sitter-rdf.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_rdf12_nquads.Language())
	if language == nil {
		t.Errorf("Error loading RDF 1.2 N-Quads grammar")
	}
}
