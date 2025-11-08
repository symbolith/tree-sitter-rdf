build:
	$(MAKE) -C .. build

test: build
	# Exclude tests that require semanctic validation
	tree-sitter test --show-fields -r -e "turtle-eval-bad-0[1-3]|turtle-syntax-bad-numeric-escape-[1-10]|turtle-syntax-bad-prefix-0[1-2]|nt-ttl12-langdir-bad-[1-2]" $(TEST_FLAGS)

develop: build
	tree-sitter test --show-fields -D -i "TT"

clean:
	$(MAKE) -C .. clean

.PHONY: build test develop clean
