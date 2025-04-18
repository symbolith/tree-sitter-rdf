import XCTest
import SwiftTreeSitter
import TreeSitterRdf12Turtle

final class TreeSitterRdf12TurtleTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rdf12_turtle())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading RDF 1.2 Turtle grammar")
    }
}
