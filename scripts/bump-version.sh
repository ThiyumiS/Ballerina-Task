#!/usr/bin/env bash
set -euo pipefail

APP_PATH="${1:-}"
BUMP_TYPE="${2:-patch}"

if [[ -z "$APP_PATH" ]]; then
  echo "Usage: bump-version.sh <app-path> [patch|minor|major]"
  exit 1
fi

if [[ ! -f "$APP_PATH/package.json" ]]; then
  echo "package.json not found in $APP_PATH"
  exit 1
fi

if [[ "$BUMP_TYPE" != "patch" && "$BUMP_TYPE" != "minor" && "$BUMP_TYPE" != "major" ]]; then
  echo "Invalid bump type: $BUMP_TYPE (allowed: patch, minor, major)"
  exit 1
fi

pushd "$APP_PATH" >/dev/null

# Bump version locally only; CI should not create a commit/tag by default.
NEW_VERSION=$(npm version "$BUMP_TYPE" --no-git-tag-version)
NEW_VERSION="${NEW_VERSION#v}"

popd >/dev/null

echo "version=$NEW_VERSION" >> "$GITHUB_OUTPUT"
echo "new_version=$NEW_VERSION"