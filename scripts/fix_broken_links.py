#!/usr/bin/env python3
"""
Automated Broken Link Fixer
Implements progressive linking approach and fixes common broken link issues
"""

import os
import re
import sys
from pathlib import Path
from typing import List, Dict, Set, Tuple

class BrokenLinkFixer:
    def __init__(self, docs_root: str = "docs"):
        self.docs_root = Path(docs_root)
        self.fixes_applied = []
        self.placeholder_patterns = [
            r'path/to/document\.md',
            r'new-document\.md',
            r'new-rule\.md',
            r'new-spec\.md',
            r'component/new-spec\.md',
            r'domain/new-rule\.md',
            r'system/new-feature\.md'
        ]
        
    def fix_placeholder_links(self, content: str, file_path: Path) -> str:
        """Remove placeholder/template links"""
        original_content = content
        
        # Pattern to match markdown links with placeholder URLs
        for pattern in self.placeholder_patterns:
            # Find all instances of this placeholder pattern
            link_pattern = rf'\[([^\]]+)\]\({pattern}\)'
            matches = re.findall(link_pattern, content)
            
            for match in matches:
                link_text = match
                old_link = f'[{link_text}]({pattern})'
                
                # Replace with planned link format
                new_link = f'[{link_text}] 🔄 PLANNED'
                content = content.replace(old_link, new_link)
                
                self.fixes_applied.append({
                    'file': file_path,
                    'type': 'placeholder_removal',
                    'old': old_link,
                    'new': new_link
                })
        
        return content
    
    def fix_url_encoding(self, content: str, file_path: Path) -> str:
        """Fix URL encoding issues like %20"""
        original_content = content
        
        # Find all markdown links with URL encoding
        url_pattern = r'\[([^\]]+)\]\(([^)]*%20[^)]*)\)'
        matches = re.findall(url_pattern, content)
        
        for text, url in matches:
            # Decode the URL
            decoded_url = url.replace('%20', ' ')
            old_link = f'[{text}]({url})'
            new_link = f'[{text}]({decoded_url})'
            
            content = content.replace(old_link, new_link)
            
            self.fixes_applied.append({
                'file': file_path,
                'type': 'url_encoding',
                'old': old_link,
                'new': new_link
            })
        
        return content
    
    def convert_to_progressive_linking(self, content: str, file_path: Path) -> str:
        """Convert traditional linking sections to progressive linking format"""
        
        # Look for "Related Documentation" sections and improve them
        related_docs_pattern = r'## Related Documentation\n(.*?)(?=\n## |\n# |\Z)'
        
        def improve_related_section(match):
            section_content = match.group(1)
            
            # Extract existing links
            link_pattern = r'- \[([^\]]+)\]\(([^)]+)\)'
            links = re.findall(link_pattern, section_content)
            
            improved_links = []
            for text, url in links:
                # Check if the target file exists
                if url.endswith('.md'):
                    # Calculate absolute path
                    source_dir = file_path.parent
                    target_path = source_dir / url
                    
                    try:
                        target_path = target_path.resolve()
                        if target_path.exists():
                            improved_links.append(f'- [{text}]({url}) ✓ VERIFIED')
                        else:
                            improved_links.append(f'- [{text}]({url}) 🔄 PLANNED')
                    except:
                        improved_links.append(f'- [{text}]({url}) 🔄 PLANNED')
                else:
                    # External or other link
                    improved_links.append(f'- [{text}]({url}) 🔗 EXTERNAL')
            
            return f"## Related Documentation\n\n" + "\n".join(improved_links) + "\n"
        
        content = re.sub(related_docs_pattern, improve_related_section, content, flags=re.DOTALL)
        
        return content
    
    def add_quick_links_section(self, content: str, file_path: Path) -> str:
        """Add Quick Links section with only verified links"""
        
        # Find all links in the document
        all_links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)
        
        # Filter for verified internal links
        verified_links = []
        for text, url in all_links:
            if url.endswith('.md') and not url.startswith('http'):
                source_dir = file_path.parent
                target_path = source_dir / url
                
                try:
                    target_path = target_path.resolve()
                    if target_path.exists():
                        verified_links.append(f'- [{text}]({url})')
                except:
                    continue
        
        # Add Quick Links section if we have verified links
        if verified_links and len(verified_links) > 0:
            # Check if Quick Links section already exists
            if "## Quick Links" not in content:
                quick_links_section = f"\n## Quick Links\n\n" + "\n".join(verified_links[:5]) + "\n"
                
                # Add before the last section or at the end
                if content.strip().endswith(''):
                    content = content.rstrip() + quick_links_section
                else:
                    content = content + quick_links_section
        
        return content
    
    def fix_file(self, file_path: Path) -> bool:
        """Fix broken links in a single file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Apply fixes
            content = self.fix_placeholder_links(content, file_path)
            content = self.fix_url_encoding(content, file_path)
            content = self.convert_to_progressive_linking(content, file_path)
            content = self.add_quick_links_section(content, file_path)
            
            # Only write if content changed
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                return True
            
            return False
            
        except Exception as e:
            print(f"Error fixing {file_path}: {e}")
            return False
    
    def fix_all_files(self) -> Dict:
        """Fix broken links in all markdown files"""
        results = {
            'files_processed': 0,
            'files_modified': 0,
            'fixes_applied': 0
        }
        
        markdown_files = list(self.docs_root.rglob("*.md"))
        
        for file_path in markdown_files:
            results['files_processed'] += 1
            
            if self.fix_file(file_path):
                results['files_modified'] += 1
        
        results['fixes_applied'] = len(self.fixes_applied)
        return results
    
    def generate_fix_report(self, results: Dict) -> str:
        """Generate a report of fixes applied"""
        report = []
        report.append("# Broken Link Fix Report")
        report.append("")
        report.append(f"## Summary")
        report.append(f"- **Files Processed**: {results['files_processed']}")
        report.append(f"- **Files Modified**: {results['files_modified']}")
        report.append(f"- **Fixes Applied**: {results['fixes_applied']}")
        report.append("")
        
        if self.fixes_applied:
            report.append("## Fixes Applied")
            report.append("")
            
            # Group by fix type
            fix_types = {}
            for fix in self.fixes_applied:
                fix_type = fix['type']
                if fix_type not in fix_types:
                    fix_types[fix_type] = []
                fix_types[fix_type].append(fix)
            
            for fix_type, fixes in fix_types.items():
                report.append(f"### {fix_type.title().replace('_', ' ')}")
                report.append("")
                
                for fix in fixes[:10]:  # Show first 10
                    report.append(f"- **File**: `{fix['file']}`")
                    report.append(f"  - **Before**: `{fix['old']}`")
                    report.append(f"  - **After**: `{fix['new']}`")
                    report.append("")
                
                if len(fixes) > 10:
                    report.append(f"- ... and {len(fixes) - 10} more fixes of this type")
                    report.append("")
        
        return '\n'.join(report)

def main():
    """Main execution function"""
    if len(sys.argv) > 1:
        docs_root = sys.argv[1]
    else:
        docs_root = "docs"
    
    fixer = BrokenLinkFixer(docs_root)
    
    print("Starting broken link fixes...")
    results = fixer.fix_all_files()
    
    # Generate report
    report = fixer.generate_fix_report(results)
    
    # Save report
    with open("broken_link_fix_report.md", "w", encoding="utf-8") as f:
        f.write(report)
    
    print(f"Fix process complete!")
    print(f"Files processed: {results['files_processed']}")
    print(f"Files modified: {results['files_modified']}")
    print(f"Fixes applied: {results['fixes_applied']}")
    print(f"Report saved to: broken_link_fix_report.md")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())