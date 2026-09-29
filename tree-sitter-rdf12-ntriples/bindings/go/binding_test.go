package tree_sitter_ntriples_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_ntriples "git+github.com/gordiandziwis/tree-sitter-rdf.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_ntriples.Language())
	if language == nil {
		t.Errorf("Error loading N-Triples grammar")
	}
}
