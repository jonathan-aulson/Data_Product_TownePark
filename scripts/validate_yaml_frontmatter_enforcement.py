#!/usr/bin/env python3
"""
Minimal enforcement wrapper for validate_yaml_frontmatter.py

Runs the existing validator over a target path and exits non-zero when
validation errors are present (suitable for CI enforcement step).
"""
import sys
import argparse
import os
from pathlib import Path
import importlib.util
import subprocess

def run_validator_as_module(path, output='text'):
    # Prefer to import validator module directly when possible
    try:
        # When executed from repo root, scripts is on sys.path; try direct import
        from validate_yaml_frontmatter import YAMLFrontmatterValidator
        validator = YAMLFrontmatterValidator()
        results = validator.validate_directory(path)
        print(validator.generate_report(output))
        # error count
        error_count = sum(len([i for i in r.issues if i.level.value == 'ERROR']) for r in results)
        return error_count
    except Exception:
        # Fallback: run script as subprocess
        script_path = os.path.join(os.path.dirname(__file__), 'validate_yaml_frontmatter.py')
        proc = subprocess.run([sys.executable, script_path, '--path', path, '--output', output], capture_output=False)
        return proc.returncode

def main():
    parser = argparse.ArgumentParser(description='Enforcement wrapper for YAML frontmatter validation')
    parser.add_argument('--path', default='docs/', help='Path to validate (default: docs/)')
    parser.add_argument('--output', choices=['text','json','csv'], default='text', help='Report format')
    args = parser.parse_args()

    if not Path(args.path).exists():
        print(f"Error: path '{args.path}' does not exist", file=sys.stderr)
        sys.exit(2)

    rc = run_validator_as_module(args.path, output=args.output)
    if isinstance(rc, int) and rc > 0:
        print(f"Validation found {rc} errors; failing enforcement step.")
        sys.exit(1)
    elif rc == 0:
        print("Validation completed with no errors.")
        sys.exit(0)
    else:
        # rc may be subprocess return code
        if rc != 0:
            print(f"Validator exited with code {rc}; treating as failure.")
            sys.exit(1)
        print("Validation completed.")
        sys.exit(0)



if __name__ == '__main__':
    main()