// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterRdf12Turtle",
    products: [
        .library(name: "TreeSitterRdf12Turtle", targets: ["TreeSitterRdf12Turtle"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterRdf12Turtle",
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
            name: "TreeSitterRdf12TurtleTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterRdf12Turtle",
            ],
            path: "bindings/swift/TreeSitterRdf12TurtleTests"
        )
    ],
    cLanguageStandard: .c11
)
