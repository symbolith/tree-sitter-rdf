// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterRdf12Nquads",
    products: [
        .library(name: "TreeSitterRdf12Nquads", targets: ["TreeSitterRdf12Nquads"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterRdf12Nquads",
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
            name: "TreeSitterRdf12NquadsTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterRdf12Nquads",
            ],
            path: "bindings/swift/TreeSitterRdf12NquadsTests"
        )
    ],
    cLanguageStandard: .c11
)
