// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterRdf11Trig",
    products: [
        .library(name: "TreeSitterRdf11Trig", targets: ["TreeSitterRdf11Trig"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterRdf11Trig",
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
            name: "TreeSitterRdf11TrigTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterRdf11Trig",
            ],
            path: "bindings/swift/TreeSitterRdf11TrigTests"
        )
    ],
    cLanguageStandard: .c11
)
