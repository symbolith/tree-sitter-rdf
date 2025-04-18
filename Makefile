SUBDIRS := tree-sitter-rdf11-ntriples \
	   tree-sitter-rdf12-ntriples \
           tree-sitter-rdf11-nquads \
           tree-sitter-rdf12-nquads \
           tree-sitter-rdf11-turtle \
           tree-sitter-rdf12-turtle \
           tree-sitter-rdf11-trig \
           tree-sitter-rdf12-trig

test: build
	@for dir in $(SUBDIRS); do \
		(cd $$dir && $(MAKE) test) \
	done

build: clean
	@for dir in $(SUBDIRS); do \
		(cd $$dir && \
		 tree-sitter init && \
		 tree-sitter generate && \
		 tree-sitter build --wasm) \
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
		       ./setup.py) \
	done

.PHONY: build test clean
