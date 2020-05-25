#!/bin/sh
protoc --plugin="protoc-gen-ts=./node_modules/.bin/protoc-gen-ts" \
    --js_out="import_style=commonjs,binary:./src" \
    --ts_out="./src" \
    --proto_path=../orchestra/services/common ../orchestra/services/common/messages/*

for f in ./src/messages/*.js; do
    printf '/* eslint-disable */\n//@ts-nocheck\n' | cat - "${f}" > temp && mv temp "${f}"
done