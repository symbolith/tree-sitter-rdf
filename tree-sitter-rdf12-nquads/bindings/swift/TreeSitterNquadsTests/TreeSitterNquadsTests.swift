import XCTest
import SwiftTreeSitter
import TreeSitterNquads

final class TreeSitterNquadsTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_nquads())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading N-Quads grammar")
    }
}
