#!/usr/bin/env python3
"""
Documentation Link Validation Script
Systematically validates all markdown links in the documentation
"""

import os
import re
import sys
from pathlib import Path
from typing import List, Dict, Set, Tuple

class LinkValidator:
    def __init__(self, docs_root: str = "docs"):
        self.docs_root = Path(docs_root)
        self.broken_links = []
        self.valid_links = []
        self.external_links = []
        self.planned_links = []
        
    def find_markdown_files(self) -> List[Path]:
        """Find all markdown files in the documentation directory"""
        markdown_files = []
        for path in self.docs_root.rglob("*.md"):
            markdown_files.append(path)
        return markdown_files
    
    def extract_links(self, file_path: Path) -> List[Dict]:
        """Extract all markdown links from a file"""
        links = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Find all markdown links [text](url)
            link_pattern = r'\[([^\]]+)\]\(([^)]+)\)'
            matches = re.findall(link_pattern, content)
            
            for text, url in matches:
                links.append({
                    'text': text,
                    'url': url,
                    'source_file': file_path,
                    'line_number': self._find_line_number(content, text, url)
                })
                
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            
        return links
    
    def _find_line_number(self, content: str, text: str, url: str) -> int:
        """Find the line number of a link in the content"""
        lines = content.split('\n')
        link_pattern = f'[{re.escape(text)}]({re.escape(url)})'
        
        for i, line in enumerate(lines, 1):
            if link_pattern in line:
                return i
        return 0
    
    def validate_link(self, link: Dict) -> str:
        """Validate a single link and return its status"""
        url = link['url']
        source_file = link['source_file']
        
        # Skip external links (http/https)
        if url.startswith(('http://', 'https://')):
            return 'external'
        
        # Skip anchors within the same document
        if url.startswith('#'):
            return 'anchor'
        
        # Skip mailto links
        if url.startswith('mailto:'):
            return 'mailto'
        
        # Check for planned link markers
        if '🔄 PLANNED' in link['text'] or 'PLANNED' in url:
            return 'planned'
        
        # Resolve relative path
        if url.endswith('.md'):
            # Calculate absolute path from source file
            source_dir = source_file.parent
            target_path = source_dir / url
            
            # Normalize the path
            try:
                target_path = target_path.resolve()
                
                # Check if file exists
                if target_path.exists():
                    return 'valid'
                else:
                    return 'broken'
                    
            except Exception as e:
                return 'broken'
        
        # Other link types (assume valid for now)
        return 'other'
    
    def validate_all_links(self) -> Dict:
        """Validate all links in all markdown files"""
        results = {
            'broken': [],
            'valid': [],
            'external': [],
            'planned': [],
            'other': [],
            'anchor': [],
            'mailto': []
        }
        
        markdown_files = self.find_markdown_files()
        
        print(f"Found {len(markdown_files)} markdown files")
        
        for file_path in markdown_files:
            links = self.extract_links(file_path)
            
            for link in links:
                status = self.validate_link(link)
                results[status].append(link)
        
        return results
    
    def generate_report(self, results: Dict) -> str:
        """Generate a detailed report of link validation results"""
        report = []
        report.append("# Documentation Link Validation Report")
        report.append("")
        
        # Summary
        total_links = sum(len(links) for links in results.values())
        report.append(f"## Summary")
        report.append(f"- **Total Links**: {total_links}")
        report.append(f"- **Broken Links**: {len(results['broken'])}")
        report.append(f"- **Valid Links**: {len(results['valid'])}")
        report.append(f"- **External Links**: {len(results['external'])}")
        report.append(f"- **Planned Links**: {len(results['planned'])}")
        report.append(f"- **Other Links**: {len(results['other'])}")
        report.append("")
        
        # Broken links detail
        if results['broken']:
            report.append("## Broken Links (High Priority)")
            report.append("")
            for link in results['broken']:
                report.append(f"- **File**: `{link['source_file']}`")
                report.append(f"  - **Line**: {link['line_number']}")
                report.append(f"  - **Text**: {link['text']}")
                report.append(f"  - **URL**: `{link['url']}`")
                report.append("")
        
        # Valid links
        if results['valid']:
            report.append("## Valid Links")
            report.append("")
            for link in results['valid'][:10]:  # Show first 10
                report.append(f"- `{link['source_file']}` → `{link['url']}`")
            if len(results['valid']) > 10:
                report.append(f"- ... and {len(results['valid']) - 10} more")
            report.append("")
        
        # External links
        if results['external']:
            report.append("## External Links")
            report.append("")
            external_urls = set(link['url'] for link in results['external'])
            for url in sorted(external_urls):
                count = sum(1 for link in results['external'] if link['url'] == url)
                report.append(f"- `{url}` (used {count} times)")
            report.append("")
        
        return '\n'.join(report)
    
    def generate_cleanup_script(self, results: Dict) -> str:
        """Generate a script to help clean up broken links"""
        script = []
        script.append("#!/bin/bash")
        script.append("# Generated link cleanup script")
        script.append("")
        
        if results['broken']:
            script.append("echo 'Broken links found in the following files:'")
            
            # Group by file
            files_with_broken_links = {}
            for link in results['broken']:
                file_path = str(link['source_file'])
                if file_path not in files_with_broken_links:
                    files_with_broken_links[file_path] = []
                files_with_broken_links[file_path].append(link)
            
            for file_path, links in files_with_broken_links.items():
                script.append(f"echo '  {file_path}:'")
                for link in links:
                    script.append(f"echo '    Line {link['line_number']}: [{link['text']}]({link['url']})'")
                script.append("")
        
        return '\n'.join(script)

def main():
    """Main execution function"""
    if len(sys.argv) > 1:
        docs_root = sys.argv[1]
    else:
        docs_root = "docs"
    
    validator = LinkValidator(docs_root)
    
    print("Starting link validation...")
    results = validator.validate_all_links()
    
    # Generate report
    report = validator.generate_report(results)
    
    # Save report
    with open("link_validation_report.md", "w", encoding="utf-8") as f:
        f.write(report)
    
    # Generate cleanup script
    cleanup_script = validator.generate_cleanup_script(results)
    
    with open("cleanup_broken_links.sh", "w", encoding="utf-8") as f:
        f.write(cleanup_script)
    
    print(f"Validation complete!")
    print(f"Report saved to: link_validation_report.md")
    print(f"Cleanup script saved to: cleanup_broken_links.sh")
    
    # Print summary
    total_links = sum(len(links) for links in results.values())
    broken_count = len(results['broken'])
    
    print(f"\nSummary:")
    print(f"  Total links: {total_links}")
    print(f"  Broken links: {broken_count}")
    print(f"  Valid links: {len(results['valid'])}")
    print(f"  External links: {len(results['external'])}")
    
    if broken_count > 0:
        print(f"\n⚠️  {broken_count} broken links found!")
        print("Review the report and cleanup script for details.")
        return 1
    else:
        print("\n✅ All links are valid!")
        return 0

if __name__ == "__main__":
    sys.exit(main())