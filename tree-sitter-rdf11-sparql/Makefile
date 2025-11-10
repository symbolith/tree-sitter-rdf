build:
	$(MAKE) -C .. build

test: build
	# Exclude tests that require semanctic validation
	tree-sitter test --show-fields --exclude "syn-bad-0[1-3]|syn-bad-values-too-(few|many)|syn-invalid-codepoint-escaped-bad-01|syntax-BINDscope[6-8]|syntax-SELECTscope2|syntax-update-bad-(03|04|10|11|12)" $(TEST_FLAGS)

develop:
	tree-sitter generate
	tree-sitter test --show-fields -D

clean:
	$(MAKE) -C .. clean

.PHONY: build test develop clean
