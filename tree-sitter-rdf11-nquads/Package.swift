// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterRdf11Nquads",
    products: [
        .library(name: "TreeSitterRdf11Nquads", targets: ["TreeSitterRdf11Nquads"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterRdf11Nquads",
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
            name: "TreeSitterRdf11NquadsTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterRdf11Nquads",
            ],
            path: "bindings/swift/TreeSitterRdf11NquadsTests"
        )
    ],
    cLanguageStandard: .c11
)
