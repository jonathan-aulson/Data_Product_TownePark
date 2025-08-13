#!/usr/bin/env python3
"""
Convenience wrapper for YAML front-matter validation.
Can be run from project root.
"""

import sys
import os

# Add scripts directory to path
script_dir = os.path.join(os.path.dirname(__file__), 'scripts')
sys.path.insert(0, script_dir)

try:
    # Try to use the full-featured script
    from validate_yaml_frontmatter import main
    if __name__ == '__main__':
        main()
except ImportError:
    # Fall back to simple script if PyYAML is not available
    print("PyYAML not found, using simple validation script...")
    from validate_yaml_simple import main
    if __name__ == '__main__':
        main()