#!/usr/bin/env python3
"""Generate URL mapping from optimized images"""

import json
from pathlib import Path

optimized_dir = Path(__file__).parent.parent / "optimized-media"

# Get all jpg/png files (excluding videos and summaries)
files = [f.name for f in optimized_dir.iterdir() 
         if f.suffix in {".jpg", ".png"} and "summary" not in f.name]

# Create mapping: original -> optimized version
mapping = {}
for filename in files:
    # Skip if already has -optimized in name
    if "-optimized" not in filename:
        name_parts = filename.rsplit(".", 1)
        optimized_name = f"{name_parts[0]}-optimized.{name_parts[1]}"
        mapping[filename] = optimized_name

# Save mapping
mapping_file = optimized_dir / "url-mapping.json"
with open(mapping_file, "w") as f:
    json.dump(mapping, f, indent=2)

print(f"\n✓ Generated mapping for {len(mapping)} images")
print(f"📁 Saved to: {mapping_file}")
for orig, opt in sorted(mapping.items())[:5]:
    print(f"  {orig} → {opt}")
print(f"  ... and {len(mapping) - 5} more")
