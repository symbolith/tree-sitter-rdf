// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterRdf11Turtle",
    products: [
        .library(name: "TreeSitterRdf11Turtle", targets: ["TreeSitterRdf11Turtle"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterRdf11Turtle",
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
            name: "TreeSitterRdf11TurtleTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterRdf11Turtle",
            ],
            path: "bindings/swift/TreeSitterRdf11TurtleTests"
        )
    ],
    cLanguageStandard: .c11
)
