build:
	$(MAKE) -C .. build

test: build
	# Exclude tests that require semanctic validation
	tree-sitter test --show-fields -e "nt-syntax-bad-uri-0[6-9]|nquads-langdir-bad-[12]|nq-syntax-bad-uri-01"

develop: build
	tree-sitter test --show-fields -D

clean:
	$(MAKE) -C .. clean

.PHONY: build test develop clean
