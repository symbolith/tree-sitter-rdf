import XCTest
import SwiftTreeSitter
import TreeSitterRdf11Sparql

final class TreeSitterRdf11SparqlTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rdf11_sparql())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading RDF 1.1 SPARQL grammar")
    }
}
