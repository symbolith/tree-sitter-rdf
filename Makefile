SUBDIRS := tree-sitter-rdf11-ntriples \
	   tree-sitter-rdf12-ntriples \
           tree-sitter-rdf11-nquads \
           tree-sitter-rdf12-nquads \
           tree-sitter-rdf11-turtle \
           tree-sitter-rdf12-turtle \
           tree-sitter-rdf11-trig \
           tree-sitter-rdf12-trig \
           tree-sitter-rdf11-sparql

test: build
	@for dir in $(SUBDIRS); do \
		(cd $$dir && $(MAKE) test) || exit 1; \
	done

build: clean
	@for dir in $(SUBDIRS); do \
		(cd $$dir && \
		 tree-sitter init && \
		 tree-sitter generate && \
		 tree-sitter build --wasm && \
		 tree-sitter build) || exit 1; \
	done

clean:
	@for dir in $(SUBDIRS); do \
		(cd $$dir && \
		 rm -fr ./bindings ./src && \
		 rm -f ./binding.gyp \
		       ./Cargo.toml \
		       ./Cargo.lock \
		       ./CMakeLists.txt \
		       ./go.mod \
		       ./package.json \
		       ./Package.swift \
		       ./pyproject.toml \
		       ./log.html \
		       ./*.wasm \
		       ./*.so \
		       ./setup.py) \
	done

update-test: build
	@for dir in $(SUBDIRS); do \
		(cd $$dir && $(MAKE) test TEST_FLAGS=--update) \
	done

test-highlight: build
	@for file in */test/highlight/highlights.* */test/highlight.*; do \
		[ -f "$$file" ] || continue; \
		printf '\n\033[1;34m=== %s ===\033[0m\n' "$$file"; \
		dir=$${file%%/*}; \
		rest=$${file#*/}; \
		(cd $$dir && tree-sitter highlight $$rest) || exit 1; \
	done

release-%:
	@version=$$(jq -r '.metadata.version' tree-sitter-$*/tree-sitter.json) && \
	git tag "$*-v$$version" && \
	git push origin "$*-v$$version"

.PHONY: build test clean update-test test-highlight
