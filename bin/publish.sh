#!/usr/bin/env bash

set -e

PROJECT_PATH=$(dirname $(cd $(dirname $0) && pwd))

cp ${PROJECT_PATH}/package.json ${PROJECT_PATH}/lib/package.json
cp ${PROJECT_PATH}/README.md ${PROJECT_PATH}/lib/README.md
cp ${PROJECT_PATH}/LICENSE ${PROJECT_PATH}/lib/LICENSE
cd ${PROJECT_PATH}/lib
npm publish --access public
rm -rf ${PROJECT_PATH}/lib/package.json
rm -rf ${PROJECT_PATH}/lib/README.md
rm -rf ${PROJECT_PATH}/lib/LICENSE