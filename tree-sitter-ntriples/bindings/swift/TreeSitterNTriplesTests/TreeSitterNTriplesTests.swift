import XCTest
import SwiftTreeSitter
import TreeSitterNTriples

final class TreeSitterNTriplesTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_n_triples())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading NTriples grammar")
    }
}
