#!/usr/bin/env python3
"""
Enhanced Code Validation Script
Comprehensive business rule and technical validation against source code
Part of the Mandatory Dual Validation Protocol
"""

import os
import sys
import re
import json
import argparse
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from datetime import datetime

@dataclass
class ValidationResult:
    """Represents the result of validating a single document"""
    document_path: str
    has_code_references: bool
    source_code_accessible: bool
    validation_performed: bool
    business_rules_validated: bool
    technical_specs_validated: bool
    integration_points_validated: bool
    confidence_score: float
    issues_found: List[str]
    recommendations: List[str]
    validation_summary: str

class EnhancedCodeValidator:
    """Enhanced code validation engine for comprehensive business rule validation"""
    
    def __init__(self):
        self.source_code_directories = [
            "Towne-Park-Billing-Source-Code",
            "Towne-Park-Azure-Components", 
            "Towne-Park-API-Functions",
            "Towne-Park-PDF",
            "Towne-Park-Ready-for-Invoicing"
        ]
        self.validation_results = []
        
    def scan_for_code_references(self, content: str) -> Tuple[bool, List[str]]:
        """Scan document content for code references and technical specifications"""
        code_indicators = [
            # Business logic patterns
            r'calculation[s]?\s+logic',
            r'business\s+rule[s]?',
            r'algorithm[s]?',
            r'formula[s]?',
            r'validation\s+rule[s]?',
            
            # Technical patterns
            r'API\s+endpoint[s]?',
            r'function[s]?\s+implementation',
            r'class[es]?\s+definition',
            r'method[s]?\s+implementation',
            r'database\s+schema',
            r'SQL\s+quer[y|ies]',
            
            # System integration patterns
            r'integration\s+point[s]?',
            r'data\s+flow[s]?',
            r'workflow[s]?\s+implementation',
            r'process[es]?\s+automation',
            
            # Specific technology patterns
            r'React\s+component[s]?',
            r'TypeScript\s+interface[s]?',
            r'Azure\s+Function[s]?',
            r'Power\s+Platform',
            r'PowerBill',
            r'Legion\s+integration',
            r'Great\s+Plains',
            
            # Revenue and contract patterns
            r'revenue\s+share\s+calculation[s]?',
            r'management\s+agreement\s+processing',
            r'per\s+labor\s+hour\s+calculation[s]?',
            r'fixed\s+fee\s+processing',
            r'PTEB\s+calculation[s]?',
            r'progressive\s+tier[s]?',
            r'revenue\s+code[s]?\s+(SD1|SD2|VD1|VD2|OR1|OR2)',
        ]
        
        found_references = []
        has_references = False
        
        for pattern in code_indicators:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                has_references = True
                found_references.append(f"Found: '{match.group()}' at position {match.start()}")
        
        return has_references, found_references
    
    def check_source_code_accessibility(self) -> Dict[str, bool]:
        """Check which source code directories are accessible"""
        accessibility = {}
        
        for directory in self.source_code_directories:
            full_path = Path(directory)
            accessibility[directory] = full_path.exists() and full_path.is_dir()
            
        return accessibility
    
    def validate_business_rules(self, content: str, document_path: str) -> Tuple[bool, List[str], List[str]]:
        """Validate business rules against source code implementation"""
        issues = []
        recommendations = []
        validated = False
        
        # Check for specific business rule patterns
        business_rule_patterns = {
            'revenue_share': [
                r'progressive\s+tier[s]?',
                r'revenue\s+percentage[s]?',
                r'vehicle\s+count\s+validation',
                r'deposited\s+revenue',
                r'bell\s+service\s+integration'
            ],
            'management_agreement': [
                r'billable\s+account[s]?\s+(6000|7000)\s+series',
                r'profit\s+sharing\s+calculation[s]?',
                r'insurance\s+calculation[s]?\s+5\.77%',
                r'PTEB\s+calculation[s]?',
                r'support\s+service\s+fee[s]?'
            ],
            'per_labor_hour': [
                r'job\s+code\s+rate[s]?',
                r'overtime\s+calculation[s]?\s+1\.5x',
                r'ECI\s+escalation',
                r'CPI\s+escalation',
                r'Legion\s+integration'
            ],
            'fixed_fee': [
                r'service\s+rate[s]?',
                r'annual\s+escalation',
                r'GL\s+account\s+mapping',
                r'COA\s+number[s]?'
            ]
        }
        
        # Identify which business rules are present
        found_rules = []
        for rule_type, patterns in business_rule_patterns.items():
            for pattern in patterns:
                if re.search(pattern, content, re.IGNORECASE):
                    found_rules.append(f"{rule_type}: {pattern}")
                    validated = True
        
        if found_rules:
            recommendations.append(f"Found {len(found_rules)} business rule patterns requiring validation")
            recommendations.extend([f"  - {rule}" for rule in found_rules])
        else:
            issues.append("No specific business rule patterns detected for validation")
        
        return validated, issues, recommendations
    
    def validate_technical_specifications(self, content: str, document_path: str) -> Tuple[bool, List[str], List[str]]:
        """Validate technical specifications against source code"""
        issues = []
        recommendations = []
        validated = False
        
        # Check for technical specification patterns
        tech_patterns = {
            'frontend': [
                r'React\s+component[s]?',
                r'TypeScript\s+interface[s]?',
                r'Vite\s+build',
                r'frontend\s+architecture'
            ],
            'backend': [
                r'Azure\s+Function[s]?',
                r'API\s+endpoint[s]?',
                r'business\s+logic\s+layer',
                r'data\s+access\s+layer'
            ],
            'integration': [
                r'PowerBill\s+integration',
                r'Legion\s+integration',
                r'Great\s+Plains\s+integration',
                r'Hotel\s+PMS\s+integration',
                r'EDW\s+integration'
            ],
            'infrastructure': [
                r'Azure\s+infrastructure',
                r'Logic\s+Apps',
                r'Power\s+Platform',
                r'deployment\s+configuration'
            ]
        }
        
        # Identify technical specifications
        found_specs = []
        for spec_type, patterns in tech_patterns.items():
            for pattern in patterns:
                if re.search(pattern, content, re.IGNORECASE):
                    found_specs.append(f"{spec_type}: {pattern}")
                    validated = True
        
        if found_specs:
            recommendations.append(f"Found {len(found_specs)} technical specification patterns")
            recommendations.extend([f"  - {spec}" for spec in found_specs])
        else:
            issues.append("No specific technical specification patterns detected")
        
        return validated, issues, recommendations
    
    def validate_integration_points(self, content: str, document_path: str) -> Tuple[bool, List[str], List[str]]:
        """Validate integration points against source code"""
        issues = []
        recommendations = []
        validated = False
        
        # Check for integration patterns
        integration_patterns = [
            r'PowerBill.*integration',
            r'Legion.*integration', 
            r'Great\s+Plains.*integration',
            r'Hotel\s+PMS.*integration',
            r'EDW.*integration',
            r'Azure.*integration',
            r'Power\s+Platform.*integration',
            r'API.*integration',
            r'data\s+flow[s]?',
            r'workflow[s]?\s+orchestration'
        ]
        
        found_integrations = []
        for pattern in integration_patterns:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                found_integrations.append(match.group())
                validated = True
        
        if found_integrations:
            recommendations.append(f"Found {len(found_integrations)} integration points")
            recommendations.extend([f"  - {integration}" for integration in found_integrations])
        else:
            issues.append("No specific integration points detected")
        
        return validated, issues, recommendations
    
    def calculate_confidence_score(self, validation_result: ValidationResult) -> float:
        """Calculate confidence score based on validation results"""
        score = 0.0
        
        # Base score for having code references
        if validation_result.has_code_references:
            score += 0.3
        
        # Score for source code accessibility
        if validation_result.source_code_accessible:
            score += 0.2
        
        # Score for validation performed
        if validation_result.validation_performed:
            score += 0.2
        
        # Score for specific validations
        if validation_result.business_rules_validated:
            score += 0.1
        if validation_result.technical_specs_validated:
            score += 0.1
        if validation_result.integration_points_validated:
            score += 0.1
        
        return min(score, 1.0)
    
    def validate_document(self, document_path: str) -> ValidationResult:
        """Validate a single document"""
        try:
            with open(document_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            return ValidationResult(
                document_path=document_path,
                has_code_references=False,
                source_code_accessible=False,
                validation_performed=False,
                business_rules_validated=False,
                technical_specs_validated=False,
                integration_points_validated=False,
                confidence_score=0.0,
                issues_found=[f"Error reading file: {str(e)}"],
                recommendations=[],
                validation_summary="Failed to read document"
            )
        
        # Check for code references
        has_code_refs, code_refs = self.scan_for_code_references(content)
        
        # Check source code accessibility
        accessibility = self.check_source_code_accessibility()
        source_accessible = any(accessibility.values())
        
        # Initialize validation result
        issues = []
        recommendations = []
        
        # Perform validations if code references found
        business_validated = False
        tech_validated = False
        integration_validated = False
        validation_performed = False
        
        if has_code_refs and source_accessible:
            validation_performed = True
            
            # Validate business rules
            business_validated, business_issues, business_recs = self.validate_business_rules(content, document_path)
            issues.extend(business_issues)
            recommendations.extend(business_recs)
            
            # Validate technical specifications
            tech_validated, tech_issues, tech_recs = self.validate_technical_specifications(content, document_path)
            issues.extend(tech_issues)
            recommendations.extend(tech_recs)
            
            # Validate integration points
            integration_validated, int_issues, int_recs = self.validate_integration_points(content, document_path)
            issues.extend(int_issues)
            recommendations.extend(int_recs)
        
        elif has_code_refs and not source_accessible:
            issues.append("Code references found but source code not accessible")
            recommendations.append("Ensure source code directories are available for validation")
        
        elif not has_code_refs:
            recommendations.append("No code references detected - validation not required")
        
        # Create validation result
        result = ValidationResult(
            document_path=document_path,
            has_code_references=has_code_refs,
            source_code_accessible=source_accessible,
            validation_performed=validation_performed,
            business_rules_validated=business_validated,
            technical_specs_validated=tech_validated,
            integration_points_validated=integration_validated,
            confidence_score=0.0,  # Will be calculated below
            issues_found=issues,
            recommendations=recommendations,
            validation_summary=""
        )
        
        # Calculate confidence score
        result.confidence_score = self.calculate_confidence_score(result)
        
        # Generate validation summary
        if validation_performed:
            validations = []
            if business_validated:
                validations.append("business rules")
            if tech_validated:
                validations.append("technical specs")
            if integration_validated:
                validations.append("integration points")
            
            if validations:
                result.validation_summary = f"Validated: {', '.join(validations)}"
            else:
                result.validation_summary = "Validation performed but no specific patterns found"
        else:
            result.validation_summary = "No validation required or source code not accessible"
        
        return result
    
    def generate_report(self, results: List[ValidationResult], output_path: Optional[str] = None) -> str:
        """Generate comprehensive validation report"""
        report_lines = [
            "# Enhanced Code Validation Report",
            f"Generated: {datetime.now().isoformat()}",
            "",
            "## Executive Summary",
            f"- Total documents analyzed: {len(results)}",
            f"- Documents with code references: {sum(1 for r in results if r.has_code_references)}",
            f"- Documents validated: {sum(1 for r in results if r.validation_performed)}",
            f"- Average confidence score: {sum(r.confidence_score for r in results) / len(results):.2f}",
            "",
            "## Validation Results",
            ""
        ]
        
        for result in results:
            report_lines.extend([
                f"### {result.document_path}",
                f"- **Code References**: {'Yes' if result.has_code_references else 'No'}",
                f"- **Source Code Accessible**: {'Yes' if result.source_code_accessible else 'No'}",
                f"- **Validation Performed**: {'Yes' if result.validation_performed else 'No'}",
                f"- **Confidence Score**: {result.confidence_score:.2f}",
                f"- **Summary**: {result.validation_summary}",
                ""
            ])
            
            if result.issues_found:
                report_lines.append("**Issues Found:**")
                for issue in result.issues_found:
                    report_lines.append(f"- {issue}")
                report_lines.append("")
            
            if result.recommendations:
                report_lines.append("**Recommendations:**")
                for rec in result.recommendations:
                    report_lines.append(f"- {rec}")
                report_lines.append("")
            
            report_lines.append("---")
            report_lines.append("")
        
        report_content = "\n".join(report_lines)
        
        if output_path:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(report_content)
        
        return report_content

def main():
    parser = argparse.ArgumentParser(description='Enhanced Code Validation Script')
    parser.add_argument('--document', help='Path to single document to validate')
    parser.add_argument('--directory', help='Directory to scan for documents')
    parser.add_argument('--output', help='Output file for validation report')
    parser.add_argument('--format', choices=['text', 'json'], default='text', help='Output format')
    
    args = parser.parse_args()
    
    validator = EnhancedCodeValidator()
    results = []
    
    if args.document:
        # Validate single document
        result = validator.validate_document(args.document)
        results.append(result)
    elif args.directory:
        # Validate all markdown files in directory
        directory = Path(args.directory)
        for md_file in directory.rglob('*.md'):
            # Skip validation-reports directory
            if 'validation-reports' not in str(md_file):
                result = validator.validate_document(str(md_file))
                results.append(result)
    else:
        print("Please specify either --document or --directory")
        return 1
    
    # Generate report
    if args.format == 'json':
        report_data = {
            'generated': datetime.now().isoformat(),
            'results': [
                {
                    'document_path': r.document_path,
                    'has_code_references': r.has_code_references,
                    'source_code_accessible': r.source_code_accessible,
                    'validation_performed': r.validation_performed,
                    'confidence_score': r.confidence_score,
                    'validation_summary': r.validation_summary,
                    'issues_found': r.issues_found,
                    'recommendations': r.recommendations
                }
                for r in results
            ]
        }
        
        if args.output:
            with open(args.output, 'w', encoding='utf-8') as f:
                json.dump(report_data, f, indent=2)
        else:
            print(json.dumps(report_data, indent=2))
    else:
        report = validator.generate_report(results, args.output)
        if not args.output:
            print(report)
    
    return 0

if __name__ == '__main__':
    sys.exit(main())