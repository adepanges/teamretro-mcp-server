#!/bin/bash

# Function to cleanup version branches
cleanup_branches() {
  local keep_count=$1
  
  echo "Cleaning up old version branches (keeping latest $keep_count per major version)"

  # Get all version branches, sorted by commit date (newest first)
  branches=$(git branch -r --list 'origin/version/v*' | \
    xargs -I{} git log -1 --format="%ct {}" {} | \
    sort -nr | \
    cut -d' ' -f2-)
  
  # Group branches by major version
  declare -A branch_groups
  for branch in $branches; do
    version=$(echo $branch | grep -oP 'v\d+')
    branch_groups[$version]+="$branch "
  done
  
  # Process each major version group
  for version in "${!branch_groups[@]}"; do
    count=0
    echo "Processing version group: $version"
    for branch in ${branch_groups[$version]}; do
      count=$((count+1))
      if [ $count -gt $keep_count ]; then
        echo "Deleting old branch: $branch"
        git push origin --delete ${branch#origin/}
      fi
    done
  done
}
