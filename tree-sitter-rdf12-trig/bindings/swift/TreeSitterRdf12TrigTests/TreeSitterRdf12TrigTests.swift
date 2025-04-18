import XCTest
import SwiftTreeSitter
import TreeSitterRdf12Trig

final class TreeSitterRdf12TrigTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rdf12_trig())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading RDF 1.2 TriG grammar")
    }
}
