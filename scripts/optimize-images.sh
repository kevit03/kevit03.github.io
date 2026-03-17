#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p images/web images/thumbs

for file in images/*(.N); do
  case "${file:e:l}" in
    jpg|jpeg|png)
      stem="${file:t:r}"
      echo "Optimizing ${file:t}..."
      sips -s format jpeg -Z 1800 --setProperty formatOptions 72 "$file" --out "images/web/${stem}.jpg" >/dev/null
      sips -s format jpeg -Z 800 --setProperty formatOptions 68 "$file" --out "images/thumbs/${stem}.jpg" >/dev/null
      ;;
  esac
done

echo "Finished generating web and thumbnail images."
