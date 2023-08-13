#!/bin/bash

declare -a folders=( "node_modules" ".next" "build" "dist" ".turbo" ".docusaurus" ".svelte-kit" ".swc")

for i in "${folders[@]}"
do
  find . -name "$i" -type d -prune -exec rm -rf '{}' +
done


# declare -a files=( "yarn.lock" "package-lock.json" "yarn-error.log")

# for i in "${files[@]}"
# do
#   find . -name "$i" -type f -delete
# done
