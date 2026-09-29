import XCTest
import SwiftTreeSitter
import TreeSitterTrig

final class TreeSitterTrigTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_trig())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading TriG grammar")
    }
}
