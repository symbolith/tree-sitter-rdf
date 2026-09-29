import XCTest
import SwiftTreeSitter
import TreeSitterNtriples

final class TreeSitterNtriplesTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_ntriples())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading N-Triples grammar")
    }
}
