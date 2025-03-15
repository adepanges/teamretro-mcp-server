#!/bin/bash

# Function to cleanup tags
cleanup_tags() {
  local tag_type=$1
  local keep_count=$2
  
  if [[ -z "$tag_type" ]]; then
    echo "Error: Tag type must be specified (alpha/beta)"
    exit 1
  fi

  if ! [[ "$tag_type" =~ ^(alpha|beta)$ ]]; then
    echo "Error: Invalid tag type. Must be 'alpha' or 'beta'"
    exit 1
  fi

  echo "Cleaning up old $tag_type tags (keeping latest $keep_count)"

  # Fetch all tags
  git fetch --tags
  
  # Get all tags of specified type sorted by creation date (newest first)
  TAGS=$(git for-each-ref --sort=-creatordate --format '%(refname:short)' refs/tags | grep -E ".*-$tag_type.*")
  
  # Count total tags
  TOTAL_TAGS=$(echo "$TAGS" | wc -l)
  
  # If more than keep_count tags, delete the oldest ones
  if [ $TOTAL_TAGS -gt $keep_count ]; then
    TAGS_TO_DELETE=$(echo "$TAGS" | tail -n +$(($keep_count + 1)))
    for tag in $TAGS_TO_DELETE; do
      echo "Deleting tag: $tag"
      git tag -d $tag
      git push origin --delete $tag
    done
  else
    echo "No $tag_type tags to cleanup (found $TOTAL_TAGS)"
  fi
}
