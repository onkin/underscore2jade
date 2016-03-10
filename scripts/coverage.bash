#!/bin/bash

echo 'make coverage: started'
istanbul cover "./node_modules/.bin/jasmine" && cat "./coverage/lcov.info" | "./node_modules/coveralls/bin/coveralls.js" && rm -rf "./coverage"
echo 'make coverage: done'
