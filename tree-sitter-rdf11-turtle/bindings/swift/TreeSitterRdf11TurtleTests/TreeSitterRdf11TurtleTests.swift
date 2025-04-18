import XCTest
import SwiftTreeSitter
import TreeSitterRdf11Turtle

final class TreeSitterRdf11TurtleTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rdf11_turtle())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading RDF 1.1 Turtle grammar")
    }
}
