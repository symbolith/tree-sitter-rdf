package tree_sitter_trig_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_trig "git+github.com/gordiandziwis/tree-sitter-rdf.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_trig.Language())
	if language == nil {
		t.Errorf("Error loading TriG grammar")
	}
}
