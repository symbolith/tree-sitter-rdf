build:
	$(MAKE) -C .. build

test: build
	# Exclude tests that require semanctic validation
	tree-sitter test --show-fields -r -e "nt-syntax-bad-uri-0[6-9]"

develop: build
	tree-sitter test --show-fields -D

clean:
	$(MAKE) -C .. clean

.PHONY: build test develop clean
