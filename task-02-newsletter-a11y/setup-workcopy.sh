#!/bin/bash
# Creates a fresh working copy of the newsletter sign-up page (input 1.zip) for recording or rehearsal:
# unzips it, installs dependencies, and makes a baseline git commit so VS Code's Source Control
# view shows only the changes you make while recording.
#
# Usage: bash setup-workcopy.sh [destination]    (default: ~/Developer/newsletter-signup)
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
dest="${1:-$HOME/Developer/newsletter-signup}"

if [ -e "$dest" ]; then
  echo "$dest already exists. Delete it first or pass a different destination." >&2
  exit 1
fi

tmp="$(mktemp -d)"
unzip -q "$here/inputs/input 1.zip" -d "$tmp"
mv "$tmp/newsletter-signup" "$dest"
rmdir "$tmp"

cd "$dest"
npm install --no-audit --no-fund
git init -q
git add -A
git commit -q -m "Newsletter sign-up page: starting point"

echo
echo "Ready: $dest"
echo "Open it in VS Code with File > Open Folder."
