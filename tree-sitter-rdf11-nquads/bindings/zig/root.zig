extern fn tree_sitter_rdf11_nquads() callconv(.c) *const anyopaque;

pub fn language() *const anyopaque {
    return tree_sitter_rdf11_nquads();
}
