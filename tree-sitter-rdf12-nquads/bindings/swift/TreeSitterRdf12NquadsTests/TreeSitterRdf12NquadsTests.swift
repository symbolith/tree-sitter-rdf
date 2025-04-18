import XCTest
import SwiftTreeSitter
import TreeSitterRdf12Nquads

final class TreeSitterRdf12NquadsTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rdf12_nquads())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading RDF 1.2 N-Quads grammar")
    }
}
