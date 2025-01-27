#!/bin/bash

echo "Cleaning old build files..."
rm -rf ./build
rm -rf ./generated
rm -f ./schema.graphql
rm -f ./subgraph.yaml
rm -rf abis/