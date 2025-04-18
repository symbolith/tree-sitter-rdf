import XCTest
import SwiftTreeSitter
import TreeSitterRdf11Nquads

final class TreeSitterRdf11NquadsTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rdf11_nquads())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading RDF 1.1 N-Quads grammar")
    }
}
