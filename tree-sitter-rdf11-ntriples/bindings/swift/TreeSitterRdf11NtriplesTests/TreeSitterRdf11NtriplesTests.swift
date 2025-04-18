import XCTest
import SwiftTreeSitter
import TreeSitterRdf11Ntriples

final class TreeSitterRdf11NtriplesTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rdf11_ntriples())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading RDF 1.1 N-Triples grammar")
    }
}
