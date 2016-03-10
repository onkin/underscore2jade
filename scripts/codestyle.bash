#!/bin/bash

echo 'make codestyle [jscs]: started'
git diff --name-only --diff-filter=ACMRTUXB  origin/master \
    | grep '.*\.js$' \
    | xargs "./node_modules/jscs/bin/jscs"
echo 'make codestyle [jscs]: done'
