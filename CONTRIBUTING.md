# Contributing to tree-sitter-rdf

This guide covers the layout, build flow, and conventions for contributors working on the grammars in this repository.

## Repository Layout

Monorepo of nine tree-sitter grammars for the RDF language family, one per subdirectory:

- `tree-sitter-rdf11-ntriples`, `tree-sitter-rdf12-ntriples`
- `tree-sitter-rdf11-nquads`, `tree-sitter-rdf12-nquads`
- `tree-sitter-rdf11-turtle`, `tree-sitter-rdf12-turtle`
- `tree-sitter-rdf11-trig`, `tree-sitter-rdf12-trig`
- `tree-sitter-rdf11-sparql`

All generated artifacts (`src/`, `bindings/`, `binding.gyp`, `Cargo.toml`, `go.mod`, `package.json`, `Package.swift`, `pyproject.toml`, `setup.py`, `CMakeLists.txt`, `*.wasm`, `*.so`) are produced by `tree-sitter init` + `tree-sitter generate` + `tree-sitter build` and are not hand-edited. The root `.gitignore` and the `clean` target in `Makefile` list what gets wiped.

## Shared Grammar Rules

`common/rules.js` exports a single rule dictionary plus constants (`WS`, `EOL`, `EXPONENT`, `ECHAR`, `PN_CHARS_U`). Each per-language `grammar.js` imports this module and wires named rules to the appropriate variant. Look for paired `_11` / `_12` rule names when changing behavior that differs between RDF 1.1 and 1.2:

- `directive_11` vs `directive_12` (version directive only in 1.2)
- `triples_11` vs `triples_12` (1.2 adds `reifiedTriple`)
- `objectList_11` vs `objectList_12` (1.2 adds annotation blocks / reifiers)
- `RDFLiteral_11` vs `RDFLiteral_12` (1.2 replaces `@LANGTAG` with `_LANG_DIR` including base direction)

RDF 1.2 adds `reifiedTriple`, `tripleTerm`, `annotationBlock`, `reifier`, `rtSubject`/`rtObject`, `ttSubject`/`ttObject`, `VersionSpecifier`, `BASE_DIRECTION`. When adding a new cross-cutting rule, add it once in `common/rules.js` and reference it from every relevant `grammar.js`.

`String.prototype.toCaseInsensitive` in `common/rules.js` is used for SPARQL-style case-insensitive keywords like `BASE`, `PREFIX`, `VERSION`. `tree-sitter-rdf11-sparql/grammar.js` defines its own local `toCaseInsensitiv` variant.

## Build and Test

From the repo root:

```
make build        # clean, init, generate, build native + wasm for every grammar
make test         # build then run tree-sitter test in every grammar
make update-test  # rerun tests with TEST_FLAGS=--update to refresh expected output
make clean        # remove generated artifacts from every subdir
```

Each grammar subdir has its own Makefile exposing `build`, `test`, `develop`, `clean` that delegates back to the root for build/clean but runs `tree-sitter test --show-fields` locally. `develop` runs `tree-sitter test -D` for debug output. Tests known to require semantic validation are excluded via `-e` / `--exclude` regexes in the per-grammar Makefiles (see `tree-sitter-rdf11-turtle/Makefile` and `tree-sitter-rdf11-sparql/Makefile`).

To run a single corpus file or filter by test name, cd into the grammar subdir and invoke tree-sitter directly:

```
cd tree-sitter-rdf11-turtle
tree-sitter test --show-fields -f "some test name"
```

Pass `TEST_FLAGS=--update` to any `make test` invocation to accept new output as the expected value.

## W3C Test Suites

`generate-tests.sh` clones `w3c/rdf-tests`, walks the format-specific subdirectories, and emits a single tree-sitter corpus file per test set into `tree-sitter-<format>/test/corpus/w3c-test-suite-<suffix>.txt`. Files whose name contains `bad` or that appear in the hardcoded `negative_tests` list are marked `:error`. Most `process_tests` calls are commented out; uncomment the lines you want to regenerate.

## Queries

Each grammar ships `queries/highlights.scm` and (where present) `queries/tags.scm`. Highlight fixtures live in `tree-sitter-<format>/test/highlight/` and root `test/*.ttl` for manual inspection.

## Releasing

Versions are tracked in each grammar's `tree-sitter.json` under `metadata.version`. `tree-sitter init` regenerates `Cargo.toml` from that field, so bumping the manifest is the only version edit needed. To cut a release for a single grammar:

1. Bump `metadata.version` in `tree-sitter-<name>/tree-sitter.json`.
2. Run `make build` so the regenerated `Cargo.toml` picks up the new version.
3. Commit the updated `tree-sitter.json` (and any grammar changes).
4. Push tag `<name>-v<version>` (e.g. `rdf12-turtle-v0.2.1`). The `Publish` workflow verifies the tag matches the manifest, regenerates artifacts, and publishes to crates.io.

The first release ships all nine grammars at `0.2.0` in one batch; after that each grammar drifts independently.

## Conventions

- The top-level `Makefile` is the single source of truth for the list of grammars (`SUBDIRS`). Add new grammars there.
- Grammar identity is set by `name:` in `grammar.js` and must match `tree-sitter.json`. Note the naming split: rdf11 grammars use `rdf11_turtle` etc., while `tree-sitter-rdf12-turtle/grammar.js` uses the bare name `turtle`.
- Never edit generated code under `src/` or `bindings/`. Change the grammar or the shared rules, then run `make build`.
