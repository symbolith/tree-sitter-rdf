generate:
	tree-sitter generate

test: generate
	tree-sitter test

update-tests:
	cd ./test/corpus/rdf11-testcases && ./script.sh

develop: generate
	tree-sitter test --show-fields

clean:
	rm -fr ./bindings
	rm -fr ./target
	rm -fr ./trig/src
	rm -fr ./turtle/src
	rm -f ./binding.gyp
	rm -f ./Cargo.toml
	rm -f ./Cargo.lock
	rm -f ./CMakeLists.txt
	rm -f ./go.mod
	rm -f ./package.json
	rm -f ./Package.swift
	rm -f ./pyproject.toml
	rm -f ./setup.py
	rm -f ./turtle.so

.PHONY: generate develop clean
