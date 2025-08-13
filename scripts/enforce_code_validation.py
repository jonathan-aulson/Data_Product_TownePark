#!/usr/bin/env python3
"""
Code Validation Enforcement Script

This script enforces mandatory code validation by:
1. Scanning validation reports for actual source code references
2. Verifying that referenced code files exist
3. Checking that code snippets in reports match actual source code
4. Preventing fabricated validation reports

Usage:
    python scripts/enforce_code_validation.py --validate-report <report_path>
    python scripts/enforce_code_validation.py --scan-all-reports
"""

import os
import re
import sys
import argparse
import json
from pathlib import Path
from typing import List, Dict, Tuple, Optional
import hashlib

class CodeValidationEnforcer:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.source_code_dirs = [
            "Towne-Park-Billing-Source-Code",
            "Towne-Park-Billing-API-Functions", 
            "Towne-Park-Azure-Components",
            "Towne-Park-Billing-PA-Solution"
        ]
        self.validation_reports_dir = self.project_root / "docs" / "knowledge-corpus" / "validation-reports"
        
    def validate_report(self, report_path: str) -> Dict:
        """Validate a single code validation report"""
        report_file = Path(report_path)
        if not report_file.exists():
            return {"valid": False, "error": f"Report file not found: {report_path}"}
            
        try:
            with open(report_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            return self._analyze_report_content(content, report_file.name)
            
        except Exception as e:
            return {"valid": False, "error": f"Error reading report: {str(e)}"}
    
    def _analyze_report_content(self, content: str, filename: str) -> Dict:
        """Analyze report content for validation authenticity"""
        results = {
            "valid": True,
            "filename": filename,
            "issues": [],
            "warnings": [],
            "code_references": [],
            "verified_references": 0,
            "fabricated_references": 0
        }
        
        # Extract code file references
        file_references = self._extract_file_references(content)
        results["code_references"] = file_references
        
        # Extract code snippets
        code_snippets = self._extract_code_snippets(content)
        
        # Verify each file reference exists
        for ref in file_references:
            if self._verify_file_exists(ref):
                results["verified_references"] += 1
                # Verify code snippets if present
                if ref in code_snippets:
                    snippet_valid = self._verify_code_snippet(ref, code_snippets[ref])
                    if not snippet_valid:
                        results["issues"].append(f"Code snippet for {ref} does not match actual file content")
                        results["valid"] = False
            else:
                results["fabricated_references"] += 1
                results["issues"].append(f"Referenced file does not exist: {ref}")
                results["valid"] = False
        
        # Check for suspicious patterns indicating fabrication
        fabrication_indicators = self._check_fabrication_indicators(content)
        if fabrication_indicators:
            results["issues"].extend(fabrication_indicators)
            results["valid"] = False
            
        # Check for technology stack consistency
        tech_stack_issues = self._check_technology_stack(content)
        if tech_stack_issues:
            results["warnings"].extend(tech_stack_issues)
            
        return results
    
    def _extract_file_references(self, content: str) -> List[str]:
        """Extract source code file references from report content"""
        patterns = [
            r'`([^`]+\.(cs|js|ts|tsx|json|xml|bicep|yml|yaml))`',
            r'"([^"]+\.(cs|js|ts|tsx|json|xml|bicep|yml|yaml))"',
            r'Location[:\s]*["`]([^"`]+\.(cs|js|ts|tsx|json|xml|bicep|yml|yaml))["`]',
            r'Source Code Location[:\s]*["`]([^"`]+\.(cs|js|ts|tsx|json|xml|bicep|yml|yaml))["`]',
            r'Path[:\s]*["`]([^"`]+\.(cs|js|ts|tsx|json|xml|bicep|yml|yaml))["`]'
        ]
        
        references = []
        for pattern in patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            for match in matches:
                if isinstance(match, tuple):
                    references.append(match[0])
                else:
                    references.append(match)
                    
        return list(set(references))  # Remove duplicates
    
    def _extract_code_snippets(self, content: str) -> Dict[str, str]:
        """Extract code snippets associated with file references"""
        snippets = {}
        
        # Look for code blocks following file references
        lines = content.split('\n')
        current_file = None
        in_code_block = False
        current_snippet = []
        
        for line in lines:
            # Check if line contains a file reference
            file_refs = self._extract_file_references(line)
            if file_refs:
                current_file = file_refs[0]
                
            # Check for code block start
            if line.strip().startswith('```') and current_file:
                if in_code_block:
                    # End of code block
                    snippets[current_file] = '\n'.join(current_snippet)
                    current_snippet = []
                    in_code_block = False
                    current_file = None
                else:
                    # Start of code block
                    in_code_block = True
                    current_snippet = []
            elif in_code_block:
                current_snippet.append(line)
                
        return snippets
    
    def _verify_file_exists(self, file_path: str) -> bool:
        """Verify that a referenced source code file actually exists"""
        # Try different possible locations
        possible_paths = []
        
        for source_dir in self.source_code_dirs:
            # Direct path
            full_path = self.project_root / source_dir / file_path
            possible_paths.append(full_path)
            
            # Path without leading directory
            if '/' in file_path:
                relative_path = '/'.join(file_path.split('/')[1:])
                full_path = self.project_root / source_dir / relative_path
                possible_paths.append(full_path)
                
            # Search for filename in subdirectories
            filename = Path(file_path).name
            for root, dirs, files in os.walk(self.project_root / source_dir):
                if filename in files:
                    possible_paths.append(Path(root) / filename)
        
        return any(path.exists() for path in possible_paths)
    
    def _verify_code_snippet(self, file_path: str, snippet: str) -> bool:
        """Verify that a code snippet actually exists in the referenced file"""
        # Find the actual file
        actual_file = self._find_actual_file(file_path)
        if not actual_file:
            return False
            
        try:
            with open(actual_file, 'r', encoding='utf-8') as f:
                file_content = f.read()
                
            # Normalize whitespace for comparison
            normalized_snippet = re.sub(r'\s+', ' ', snippet.strip())
            normalized_content = re.sub(r'\s+', ' ', file_content)
            
            # Check if snippet exists in file (allowing for some formatting differences)
            return normalized_snippet in normalized_content
            
        except Exception:
            return False
    
    def _find_actual_file(self, file_path: str) -> Optional[Path]:
        """Find the actual file path for a referenced file"""
        for source_dir in self.source_code_dirs:
            # Try direct path
            full_path = self.project_root / source_dir / file_path
            if full_path.exists():
                return full_path
                
            # Try without leading directory
            if '/' in file_path:
                relative_path = '/'.join(file_path.split('/')[1:])
                full_path = self.project_root / source_dir / relative_path
                if full_path.exists():
                    return full_path
                    
            # Search for filename
            filename = Path(file_path).name
            for root, dirs, files in os.walk(self.project_root / source_dir):
                if filename in files:
                    return Path(root) / filename
                    
        return None
    
    def _check_fabrication_indicators(self, content: str) -> List[str]:
        """Check for patterns that indicate fabricated validation"""
        indicators = []
        
        # Check for suspiciously perfect validation rates
        if re.search(r'100%.*validated|validation.*100%', content, re.IGNORECASE):
            indicators.append("Suspiciously high validation rate (100%) - may indicate fabrication")
            
        # Check for generic/template-like content
        template_patterns = [
            r'✅.*Validated.*Properties',
            r'✅.*Validation Results',
            r'Implementation correctly',
            r'properly implemented',
            r'successfully validated'
        ]
        
        template_count = sum(1 for pattern in template_patterns if re.search(pattern, content, re.IGNORECASE))
        if template_count > 5:
            indicators.append("Content appears to use template language - may be fabricated")
            
        # Check for inconsistent technology references
        if 'Entity Framework' in content and 'React' in content:
            indicators.append("Mixed technology stack references may indicate fabrication")
            
        return indicators
    
    def _check_technology_stack(self, content: str) -> List[str]:
        """Check for technology stack consistency"""
        warnings = []
        
        # Our actual stack
        expected_tech = ['React', 'TypeScript', 'Azure Functions', 'Power Platform', 'Dataverse']
        unexpected_tech = ['Entity Framework', 'C# Entity', 'SQL Server', '.NET Core']
        
        for tech in unexpected_tech:
            if tech in content:
                warnings.append(f"Unexpected technology reference: {tech} (our stack uses React/TypeScript/Azure)")
                
        return warnings
    
    def scan_all_reports(self) -> Dict:
        """Scan all validation reports in the validation-reports directory"""
        results = {
            "total_reports": 0,
            "valid_reports": 0,
            "invalid_reports": 0,
            "reports": []
        }
        
        if not self.validation_reports_dir.exists():
            return {"error": "Validation reports directory not found"}
            
        for report_file in self.validation_reports_dir.glob("*.md"):
            if "validation" in report_file.name.lower():
                results["total_reports"] += 1
                report_result = self.validate_report(str(report_file))
                results["reports"].append(report_result)
                
                if report_result["valid"]:
                    results["valid_reports"] += 1
                else:
                    results["invalid_reports"] += 1
                    
        return results
    
    def generate_enforcement_report(self, output_file: str = None) -> str:
        """Generate a comprehensive enforcement report"""
        scan_results = self.scan_all_reports()
        
        report = f"""# Code Validation Enforcement Report
Generated: {self._get_timestamp()}

## Summary
- Total Reports Scanned: {scan_results.get('total_reports', 0)}
- Valid Reports: {scan_results.get('valid_reports', 0)}
- Invalid Reports: {scan_results.get('invalid_reports', 0)}
- Validation Rate: {(scan_results.get('valid_reports', 0) / max(scan_results.get('total_reports', 1), 1) * 100):.1f}%

## Detailed Results
"""
        
        for report_data in scan_results.get('reports', []):
            report_section = f"""
### {report_data['filename']}
- **Status**: {'✅ VALID' if report_data['valid'] else '❌ INVALID'}
- **Code References**: {len(report_data['code_references'])}
- **Verified References**: {report_data['verified_references']}
- **Fabricated References**: {report_data['fabricated_references']}

"""
            if report_data['issues']:
                report_section += "**Issues:**\n"
                for issue in report_data['issues']:
                    report_section += f"- {issue}\n"
                    
            if report_data['warnings']:
                report_section += "**Warnings:**\n"
                for warning in report_data['warnings']:
                    report_section += f"- {warning}\n"
                    
            report += report_section
        
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(report)
                
        return report
    
    def _get_timestamp(self) -> str:
        """Get current timestamp"""
        from datetime import datetime
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def main():
    parser = argparse.ArgumentParser(description="Enforce code validation authenticity")
    parser.add_argument("--validate-report", help="Validate a specific report file")
    parser.add_argument("--scan-all-reports", action="store_true", help="Scan all validation reports")
    parser.add_argument("--output", help="Output file for enforcement report")
    parser.add_argument("--project-root", default=".", help="Project root directory")
    
    args = parser.parse_args()
    
    enforcer = CodeValidationEnforcer(args.project_root)
    
    if args.validate_report:
        result = enforcer.validate_report(args.validate_report)
        print(json.dumps(result, indent=2))
        sys.exit(0 if result["valid"] else 1)
        
    elif args.scan_all_reports:
        results = enforcer.scan_all_reports()
        if args.output:
            report = enforcer.generate_enforcement_report(args.output)
            print(f"Enforcement report written to: {args.output}")
        else:
            print(json.dumps(results, indent=2))
        sys.exit(0 if results["invalid_reports"] == 0 else 1)
        
    else:
        parser.print_help()
        sys.exit(1)

if __name__ == "__main__":
    main()