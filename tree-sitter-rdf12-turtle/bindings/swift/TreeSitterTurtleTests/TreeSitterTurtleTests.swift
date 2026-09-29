import XCTest
import SwiftTreeSitter
import TreeSitterTurtle

final class TreeSitterTurtleTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_turtle())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Turtle grammar")
    }
}
