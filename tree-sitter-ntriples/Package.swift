// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterNTriples",
    products: [
        .library(name: "TreeSitterNTriples", targets: ["TreeSitterNTriples"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterNTriples",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterNTriplesTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterNTriples",
            ],
            path: "bindings/swift/TreeSitterNTriplesTests"
        )
    ],
    cLanguageStandard: .c11
)
