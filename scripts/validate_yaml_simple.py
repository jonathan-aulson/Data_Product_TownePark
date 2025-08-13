#!/usr/bin/env python3
"""
Simple YAML Front-matter Validation Script (No External Dependencies)

This is a simplified version that uses only Python standard library
for basic validation testing.
"""

import os
import re
import json
from datetime import datetime
from pathlib import Path

def extract_frontmatter_simple(content):
    """Extract YAML frontmatter using simple parsing."""
    lines = content.split('\n')
    
    if not lines or lines[0].strip() != '---':
        return None, ["No YAML frontmatter found"]
    
    yaml_lines = []
    end_found = False
    
    for i, line in enumerate(lines[1:], 2):
        if line.strip() == '---':
            end_found = True
            break
        yaml_lines.append(line)
    
    if not end_found:
        return None, ["No closing --- found"]
    
    # Simple YAML parsing for basic fields
    frontmatter = {}
    current_key = None
    
    for line in yaml_lines:
        line = line.strip()
        if not line or line.startswith('#'):
            continue
            
        if ':' in line and not line.startswith(' '):
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip().strip('"\'')
            if value:
                frontmatter[key] = value
            current_key = key
        elif current_key and line.startswith('  '):
            # Handle multi-line values (simplified)
            if current_key not in frontmatter:
                frontmatter[current_key] = []
            if isinstance(frontmatter[current_key], list):
                frontmatter[current_key].append(line.strip('- ').strip('"\''))
    
    return frontmatter, []

def validate_date_format(date_str):
    """Validate YYYY-MM-DD format."""
    if not isinstance(date_str, str):
        return False
    
    pattern = r'^\d{4}-\d{2}-\d{2}$'
    if not re.match(pattern, date_str):
        return False
    
    try:
        datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False

def validate_version_format(version_str):
    """Validate X.Y or X.Y.Z format."""
    if not isinstance(version_str, str):
        return False
    
    pattern = r'^\d+\.\d+(\.\d+)?$'
    return bool(re.match(pattern, version_str))

def validate_file_simple(file_path):
    """Simple validation of a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return {
            'file': file_path,
            'status': 'error',
            'issues': [f"Error reading file: {str(e)}"]
        }
    
    frontmatter, errors = extract_frontmatter_simple(content)
    
    if frontmatter is None:
        return {
            'file': file_path,
            'status': 'error',
            'issues': errors
        }
    
    issues = []
    required_fields = ['title', 'description', 'created_date', 'last_updated_date', 'version', 'status', 'owner']
    
    # Check required fields
    for field in required_fields:
        if field not in frontmatter:
            issues.append(f"Missing required field: {field}")
    
    # Validate date fields
    for date_field in ['created_date', 'last_updated_date']:
        if date_field in frontmatter:
            if not validate_date_format(frontmatter[date_field]):
                issues.append(f"Invalid date format in {date_field}: {frontmatter[date_field]} (expected YYYY-MM-DD)")
    
    # Validate version
    if 'version' in frontmatter:
        if not validate_version_format(frontmatter['version']):
            issues.append(f"Invalid version format: {frontmatter['version']} (expected X.Y or X.Y.Z)")
    
    # Check for advanced sections
    advanced_sections = ['fibo_classification', 'governance', 'discovery_metadata', 'systems', 'business_domains']
    missing_advanced = []
    for section in advanced_sections:
        if section not in frontmatter:
            missing_advanced.append(section)
    
    if missing_advanced:
        issues.append(f"Missing recommended sections: {', '.join(missing_advanced)}")
    
    status = 'compliant' if not any('Missing required field' in issue for issue in issues) else 'non-compliant'
    
    return {
        'file': file_path,
        'status': status,
        'issues': issues,
        'frontmatter_keys': list(frontmatter.keys())
    }

def main():
    """Main function for simple validation."""
    docs_path = 'docs/'
    
    if not os.path.exists(docs_path):
        print(f"Error: Path '{docs_path}' does not exist")
        return
    
    results = []
    
    # Find all markdown files
    for root, dirs, files in os.walk(docs_path):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                result = validate_file_simple(file_path)
                results.append(result)
    
    # Generate report
    print("=" * 80)
    print("YAML FRONT-MATTER VALIDATION REPORT (SIMPLE)")
    print("=" * 80)
    print(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    total_files = len(results)
    compliant_files = sum(1 for r in results if r['status'] == 'compliant')
    non_compliant_files = total_files - compliant_files
    
    print("SUMMARY")
    print("-" * 40)
    print(f"Total files processed: {total_files}")
    print(f"Compliant files: {compliant_files}")
    print(f"Non-compliant files: {non_compliant_files}")
    print(f"Compliance rate: {(compliant_files/total_files*100):.1f}%" if total_files > 0 else "Compliance rate: N/A")
    print()
    
    # Show compliant files
    if compliant_files > 0:
        print("COMPLIANT FILES")
        print("-" * 40)
        for result in results:
            if result['status'] == 'compliant':
                print(f"✅ {result['file']}")
                if result['issues']:
                    for issue in result['issues']:
                        print(f"   ⚠️  {issue}")
        print()
    
    # Show non-compliant files
    if non_compliant_files > 0:
        print("NON-COMPLIANT FILES")
        print("-" * 40)
        for result in results:
            if result['status'] != 'compliant':
                print(f"❌ {result['file']}")
                for issue in result['issues']:
                    print(f"   🔴 {issue}")
                print()

if __name__ == '__main__':
    main()