#!/bin/bash

process_tests() {
    local format=$1
    local ext=$2
    local url=$3
    local output_dir="tree-sitter-${format}/test"

    tmp_dir=$(mktemp -d)
    mkdir -p "$tmp_dir"
    trap 'rm -rf "$tmp_dir"' EXIT  # Add cleanup trap
    mkdir -p "$output_dir" || {
        echo "Error: Cannot create output directory" >&2
        return 1
    }

    pushd "$tmp_dir" >/dev/null || exit

    wget -q "$url"
    tar xzf TESTS.tar.gz --strip-components=1

    for file in *."$ext"; do
        [[ $file == *"manifest"* ]] && continue

        printf '===============\n%s\n' "$(basename "$file" ."$ext")"
        if [[ $file == *"bad"* ]]; then
            printf ':error\n'
        fi
        printf '===============\n\n%s\n\n---\n\n' \
            "$(tr -d '\0' <"$file")"
    done >"$OLDPWD/$output_dir/w3c-test-suite-${format}.txt"

    popd >/dev/null || exit
}

process_tests "ntriples" "nt" "https://www.w3.org/2013/N-TriplesTests/TESTS.tar.gz"
# process_tests "trig" "trig" "https://www.w3.org/2013/TrigTests/TESTS.tar.gz"
# process_tests "turtle" "ttl" "https://www.w3.org/2013/TurtleTests/TESTS.tar.gz"
