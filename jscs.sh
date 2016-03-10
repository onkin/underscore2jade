#!/bin/bash
    # Travis-CI

    echo jscs
    git diff --name-only --diff-filter=ACMRTUXB  origin/master \
        | grep '.*\.js$' \
        | xargs ./node_modules/jscs/bin/jscs 

