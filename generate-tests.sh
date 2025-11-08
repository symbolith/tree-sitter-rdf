#!/bin/bash

process_tests() {
    local format=$1
    local ext=$2
    local repo_path=$3
    local suffix=${4:-$format}
    local output_dir="tree-sitter-${format}/test/corpus"

    # Hardcoded list of negative test filenames (with extension)
    local negative_tests=(
        "syntax-BINDscope6.rq"
        "syntax-BINDscope7.rq"
        "syntax-BINDscope8.rq"
        "syntax-SELECTscope2.rq"
        "syntax-bindings-09.rq"
    )

    tmp_dir=$(mktemp -d)
    dir -p "$tmp_dir"
    # trap 'rm -rf "$tmp_dir"' EXIT # Add cleanup trap
    mkdir -p "$output_dir" || {
        echo "Error: Cannot create output directory" >&2
        return 1
    }

    git clone --depth 1 --quiet https://github.com/w3c/rdf-tests.git "$tmp_dir" || {
        echo "Error: Failed to clone repository" >&2
        return 1
    }

    pushd "$tmp_dir/${repo_path}" >/dev/null || {
        echo "Error: Path not found in repository" >&2
        return 1
    }

    for file in *."$ext"; do
        [[ $file == *"manifest"* ]] && continue

        printf '===============\n%s\n' "$(basename "$file" ."$ext")"

        local is_negative=false
        if [[ $file == *"bad"* ]]; then
            is_negative=true
        else
            for neg_test in "${negative_tests[@]}"; do
                if [[ "$file" == "$neg_test" ]]; then
                    is_negative=true
                    break
                fi
            done
        fi

        if [[ "$is_negative" == true ]]; then
            printf ':error\n'
        fi
        printf '===============\n%s\n---\n\n' \
            "$(tr -d '\0' <"$file")"
    done >"$OLDPWD/$output_dir/w3c-test-suite-${suffix}.txt"

    popd >/dev/null || exit
}

# process_tests "rdf11-ntriples" "nt" "rdf/rdf11/rdf-n-triples"
# process_tests "rdf12-ntriples" "nt" "rdf/rdf11/rdf-n-triples" "rdf11-ntriples"
# process_tests "rdf12-ntriples" "nt" "rdf/rdf12/rdf-n-triples/syntax"
#
# process_tests "rdf11-nquads" "nq" "rdf/rdf11/rdf-n-quads"
# process_tests "rdf12-nquads" "nq" "rdf/rdf11/rdf-n-quads" "rdf11-nquads"
# process_tests "rdf12-nquads" "nq" "rdf/rdf12/rdf-n-quads/syntax"
#
# process_tests "rdf11-turtle" "ttl" "rdf/rdf11/rdf-turtle"
# process_tests "rdf12-turtle" "ttl" "rdf/rdf11/rdf-turtle" "rdf11-turtle"
# process_tests "rdf12-turtle" "ttl" "rdf/rdf12/rdf-turtle/syntax"
#
# process_tests "rdf11-trig" "trig" "rdf/rdf11/rdf-trig"
# process_tests "rdf12-trig" "trig" "rdf/rdf11/rdf-trig" "rdf11-trig"
# process_tests "rdf12-trig" "trig" "rdf/rdf12/rdf-trig/syntax"

process_tests "rdf11-sparql" "rq" "sparql/sparql11/syntax-fed" "rdf11-sparql-fed"
process_tests "rdf11-sparql" "rq" "sparql/sparql11/syntax-query" "rdf11-sparql-query"
process_tests "rdf11-sparql" "ru" "sparql/sparql11/syntax-update-1" "rdf11-sparql-update-1"
process_tests "rdf11-sparql" "ru" "sparql/sparql11/syntax-update-2" "rdf11-sparql-update-2"
