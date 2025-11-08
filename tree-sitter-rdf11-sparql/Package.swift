// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterRdf11Sparql",
    products: [
        .library(name: "TreeSitterRdf11Sparql", targets: ["TreeSitterRdf11Sparql"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterRdf11Sparql",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterRdf11SparqlTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterRdf11Sparql",
            ],
            path: "bindings/swift/TreeSitterRdf11SparqlTests"
        )
    ],
    cLanguageStandard: .c11
)
