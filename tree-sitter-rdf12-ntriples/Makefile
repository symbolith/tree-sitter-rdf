build:
	$(MAKE) -C .. build

test: build
	# Exclude tests that require semanctic validation
	tree-sitter test --show-fields -e "nt-syntax-bad-uri-0[6-9]|ntriples12-bad-iri-1|ntriples-langdir-bad-[1-6]"

develop: build
	tree-sitter test --show-fields -D -i "directive"

clean:
	$(MAKE) -C .. clean

.PHONY: build test develop clean
