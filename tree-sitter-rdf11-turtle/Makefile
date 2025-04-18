build:
	$(MAKE) -C .. build

test: build
	# Exclude tests that require semanctic validation
	tree-sitter test --show-fields -r -e "turtle-eval-bad-0[1-3]|turtle-syntax-bad-prefix-0[1-2]"

develop: build
	tree-sitter test --show-fields -D

clean:
	$(MAKE) -C .. clean

.PHONY: build test develop clean
