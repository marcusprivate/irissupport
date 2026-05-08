#!/usr/bin/env bash

set -euo pipefail

message="${1:-Reset history}"
remote="${2:-origin}"
branch="main"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Run this script inside a Git repository." >&2
  exit 1
fi

current_branch="$(git branch --show-current)"

if [[ -z "$current_branch" ]]; then
  echo "Detached HEAD is not supported. Check out ${branch} first." >&2
  exit 1
fi

if [[ "$current_branch" != "$branch" ]]; then
  echo "Expected branch ${branch}, found ${current_branch}. Switch to ${branch} and retry." >&2
  exit 1
fi

if ! git remote get-url "$remote" >/dev/null 2>&1; then
  echo "Remote ${remote} does not exist." >&2
  exit 1
fi

git add -A

new_commit="$(git commit-tree "$(git write-tree)" -m "$message")"
git reset --mixed "$new_commit" >/dev/null

git push --force "$remote" "HEAD:${branch}"

echo "Reset ${branch} to a single commit and force-pushed to ${remote}."