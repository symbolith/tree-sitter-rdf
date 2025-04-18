import XCTest
import SwiftTreeSitter
import TreeSitterRdf12Ntriples

final class TreeSitterRdf12NtriplesTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rdf12_ntriples())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading RDF 1.2 N-Triples grammar")
    }
}
