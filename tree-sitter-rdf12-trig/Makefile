build:
	$(MAKE) -C .. build

test: build
	# Exclude tests that require semanctic validation
	tree-sitter test --show-fields --exclude "trig-eval-bad-0[1-3]|trig-syntax-bad-prefix-0[1-2]|trig-syntax-bad-numeric-escape-[1-10]|trig12-base-bad-[1-2]"

develop: build
	tree-sitter test --show-fields -D

clean:
	$(MAKE) -C .. clean

.PHONY: build test develop clean
