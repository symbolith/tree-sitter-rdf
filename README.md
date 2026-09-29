# tree-sitter-rdf

Monorepo of nine [tree-sitter](https://github.com/tree-sitter/tree-sitter) grammars for the RDF language family, covering both RDF 1.1 and the new RDF 1.2 revision.

| Grammar | Crate | File types |
|---|---|---|
| tree-sitter-rdf11-ntriples | [`tree-sitter-rdf11-ntriples`](https://crates.io/crates/tree-sitter-rdf11-ntriples) | `.nt` |
| tree-sitter-rdf12-ntriples | [`tree-sitter-rdf12-ntriples`](https://crates.io/crates/tree-sitter-rdf12-ntriples) | `.nt` |
| tree-sitter-rdf11-nquads | [`tree-sitter-rdf11-nquads`](https://crates.io/crates/tree-sitter-rdf11-nquads) | `.nq` |
| tree-sitter-rdf12-nquads | [`tree-sitter-rdf12-nquads`](https://crates.io/crates/tree-sitter-rdf12-nquads) | `.nq` |
| tree-sitter-rdf11-turtle | [`tree-sitter-rdf11-turtle`](https://crates.io/crates/tree-sitter-rdf11-turtle) | `.ttl` |
| tree-sitter-rdf12-turtle | [`tree-sitter-rdf12-turtle`](https://crates.io/crates/tree-sitter-rdf12-turtle) | `.ttl` |
| tree-sitter-rdf11-trig | [`tree-sitter-rdf11-trig`](https://crates.io/crates/tree-sitter-rdf11-trig) | `.trig` |
| tree-sitter-rdf12-trig | [`tree-sitter-rdf12-trig`](https://crates.io/crates/tree-sitter-rdf12-trig) | `.trig` |
| tree-sitter-rdf11-sparql | [`tree-sitter-rdf11-sparql`](https://crates.io/crates/tree-sitter-rdf11-sparql) | `.rq`, `.sparql` |

Only Rust crates are published. Every other ecosystem can consume the grammars straight from this repository; snippets below.

## Install

Replace `tree-sitter-rdf11-turtle` in the snippets with any grammar from the table.

### Rust (Cargo)

```toml
[dependencies]
tree-sitter-rdf11-turtle = "0.2"
```

### Python (pip)

pip natively supports subdirectory installs from git:

```bash
pip install "git+https://github.com/GordianDziwis/tree-sitter-rdf.git#subdirectory=tree-sitter-rdf11-turtle"
```

### Go

Go modules need a directory-prefixed tag (`tree-sitter-rdf11-turtle/v0.2.0`). The tags published by this repo use the format `rdf11-turtle-v0.2.0` for the release workflow, so `go get` by tag does not resolve directly. Pin to a commit until companion Go tags are published:

```bash
go get github.com/GordianDziwis/tree-sitter-rdf/tree-sitter-rdf11-turtle@<commit-sha>
```

### C / C++ (CMake)

Each grammar ships a generated `CMakeLists.txt`. Use `FetchContent` with `SOURCE_SUBDIR`:

```cmake
include(FetchContent)
FetchContent_Declare(tree_sitter_rdf11_turtle
  GIT_REPOSITORY https://github.com/GordianDziwis/tree-sitter-rdf.git
  GIT_TAG rdf11-turtle-v0.2.0
  SOURCE_SUBDIR tree-sitter-rdf11-turtle
)
FetchContent_MakeAvailable(tree_sitter_rdf11_turtle)
```

### Node.js (npm)

npm does not support subdirectory installs. Two options:

1. **pnpm** with its path syntax:
   ```bash
   pnpm add "github:GordianDziwis/tree-sitter-rdf#path:tree-sitter-rdf11-turtle"
   ```
2. Clone the repo and `npm link` the subdirectory.

### Neovim

The grammars are upstreamed to [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter); install with `:TSInstall rdf11_turtle` (and the equivalent identifier for each other grammar). No manual parser config required.

### Helix

In `languages.toml`:

```toml
[[grammar]]
name = "rdf11_turtle"
source = { git = "https://github.com/GordianDziwis/tree-sitter-rdf.git", rev = "rdf11-turtle-v0.2.0", subpath = "tree-sitter-rdf11-turtle" }
```

### Emacs (`treesit`)

```elisp
(add-to-list 'treesit-language-source-alist
             '(rdf11-turtle
               "https://github.com/GordianDziwis/tree-sitter-rdf.git"
               "main"
               "tree-sitter-rdf11-turtle/src"))
```

### Zed

In an extension's `extension.toml`:

```toml
[[grammars.rdf11_turtle]]
repository = "https://github.com/GordianDziwis/tree-sitter-rdf"
commit = "<sha>"
path = "tree-sitter-rdf11-turtle"
```

## Build from source

Generated artifacts (`src/`, `bindings/`, `Cargo.toml`, `package.json`, etc.) are not hand-edited. Regenerate with:

```bash
make build   # clean, init, generate, build wasm + native for every grammar
make test    # run the tree-sitter test corpus for every grammar
```

See `Makefile` for the list of grammars and per-grammar targets.

## License

MIT.
