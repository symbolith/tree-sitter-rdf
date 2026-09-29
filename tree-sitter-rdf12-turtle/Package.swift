// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterTurtle",
    products: [
        .library(name: "TreeSitterTurtle", targets: ["TreeSitterTurtle"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterTurtle",
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
            name: "TreeSitterTurtleTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterTurtle",
            ],
            path: "bindings/swift/TreeSitterTurtleTests"
        )
    ],
    cLanguageStandard: .c11
)
