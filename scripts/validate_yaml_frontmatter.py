#!/usr/bin/env python3
"""
YAML Front-matter Validation Script for Towne Park Knowledge Corpus

This script validates YAML front-matter in all Markdown files according to the
standardized templates for each document type. It checks for presence and correct
formatting of all required fields, validates date formats, versioning, and
enumerated field values, and ensures FIBO, policy governance, knowledge graph,
and enterprise metadata sections are present where required.

Usage:
    python validate_yaml_frontmatter.py [options]
    
Options:
    --path PATH         Path to scan for Markdown files (default: docs/)
    --output FORMAT     Output format: text, json, csv (default: text)
    --strict            Enable strict mode (fail on warnings)
    --quiet             Suppress non-error output
    --help              Show this help message
"""

import os
import sys
import re
import yaml
import argparse
import json
import csv
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum

class ValidationLevel(Enum):
    ERROR = "ERROR"
    WARNING = "WARNING"
    INFO = "INFO"

class DocumentType(Enum):
    DAILY_UPDATE = "daily-update"
    ARCHITECTURE = "architecture"
    VALIDATION_REPORT = "validation-report"
    MEETING_TRANSCRIPT = "meeting-transcript"
    BUSINESS_RULES = "business-rules"
    TECHNICAL_SPEC = "technical-specification"
    STANDARDS = "standards"
    CONFIGURATION = "configuration"
    USER_PROCESS = "user-process"
    GENERAL = "general"

@dataclass
class ValidationIssue:
    file_path: str
    level: ValidationLevel
    field: str
    message: str
    line_number: Optional[int] = None

@dataclass
class ValidationResult:
    file_path: str
    is_compliant: bool
    document_type: DocumentType
    issues: List[ValidationIssue] = field(default_factory=list)
    
    def add_issue(self, level: ValidationLevel, field: str, message: str, line_number: Optional[int] = None):
        self.issues.append(ValidationIssue(self.file_path, level, field, message, line_number))
        if level == ValidationLevel.ERROR:
            self.is_compliant = False

class YAMLFrontmatterValidator:
    """Validates YAML front-matter in Markdown files according to Towne Park standards."""
    
    # Required fields for all document types
    CORE_REQUIRED_FIELDS = {
        'title': str,
        'description': str,
        'created_date': str,
        'last_updated_date': str,
        'version': str,
        'status': str,
        'owner': str
    }
    
    # Optional but recommended fields
    CORE_OPTIONAL_FIELDS = {
        'source_documents': list,
        'source_date': str,
        'content_type': str,
        'verification_status': str,
        'verified_by': str,
        'verification_date': str,
        'author': str,
        'reviewer': str,
        'date': str,  # Alternative to created_date in some docs
        'effective_date': str,
        'configuration_owner': str,
        'process_owner': str,
        'stakeholders': list,
        'related_docs': list
    }
    
    # Advanced metadata sections
    ADVANCED_SECTIONS = {
        'discovery_metadata': {
            'required_fields': {
                'discovered_date': str,
                'discovery_method': str,
                'confidence_score': (int, float),
                'validation_status': str,
                'knowledge_graph_id': str
            }
        },
        'systems': list,
        'components': list,
        'business_domains': list,
        'user_roles': list,
        'relationships': {
            'type': list,
            'item_fields': {
                'target': str,
                'type': str,
                'strength': (int, float)
            }
        },
        'governance': {
            'required_fields': {
                'access_level': str,
                'compliance_tags': list,
                'policy_constraints': list,
                'policy_evaluation': dict
            }
        },
        'fibo_classification': {
            'required_fields': {
                'fibo_type': str,
                'domain_extensions': dict
            },
            'optional_fields': {
                'towne_park_type': str,
                'confidence_score': (int, float),
                'classification_confidence': (int, float),
                'ontology_version': str,
                'primary_concept': str,
                'secondary_concepts': list,
                'towne_park_extensions': list
            }
        },
        'policy_governance': {
            'required_fields': {
                'governance_level': str,
                'policy_type': str,
                'enforcement_mechanism': str,
                'compliance_requirements': list
            }
        },
        'knowledge_graph': {
            'required_fields': {
                'entity_type': str,
                'relationships': dict,
                'validation_status': str,
                'last_validated': str
            }
        },
        'context_discovery': {
            'required_fields': {
                'discovery_method': str,
                'key_insights': list,
                'business_value': str,
                'technical_complexity': str,
                'implementation_priority': str,
                'discovery_confidence': (int, float)
            }
        },
        'enterprise_metadata': {
            'required_fields': {
                'document_classification': str,
                'security_level': str,
                'retention_period': str,
                'review_cycle': str,
                'distribution_list': list,
                'compliance_frameworks': list,
                'change_control': str,
                'approval_authority': str
            }
        }
    }
    
    # Valid enumerated values
    VALID_STATUS_VALUES = {
        'Draft', 'Review', 'Active', 'Production', 'Archived', 'Deprecated',
        'Validation Complete', 'Architectural Design'
    }
    
    VALID_ACCESS_LEVELS = {
        'public', 'internal', 'confidential', 'restricted'
    }
    
    VALID_GOVERNANCE_LEVELS = {
        'enterprise', 'department', 'team', 'project'
    }
    
    VALID_SECURITY_LEVELS = {
        'public', 'internal', 'confidential', 'restricted', 'classified'
    }
    
    VALID_BUSINESS_VALUES = {
        'critical', 'high', 'medium', 'low'
    }
    
    VALID_COMPLEXITY_LEVELS = {
        'high', 'medium', 'low'
    }
    
    VALID_PRIORITY_LEVELS = {
        'immediate', 'high', 'medium', 'low'
    }
    
    VALID_VALIDATION_STATUSES = {
        'validated', 'pending', 'uncertain', 'architect_validated', 'confirmed'
    }
    
    def __init__(self):
        self.results: List[ValidationResult] = []
        
    def detect_document_type(self, frontmatter: Dict[str, Any], file_path: str) -> DocumentType:
        """Detect document type based on file path and content."""
        path_lower = file_path.lower()
        
        if 'daily-update' in path_lower or 'daily_update' in path_lower:
            return DocumentType.DAILY_UPDATE
        elif 'architecture' in path_lower or 'architectural' in path_lower:
            return DocumentType.ARCHITECTURE
        elif 'validation-report' in path_lower or 'validation_report' in path_lower:
            return DocumentType.VALIDATION_REPORT
        elif 'meeting-transcript' in path_lower or 'meeting_transcript' in path_lower:
            return DocumentType.MEETING_TRANSCRIPT
        elif 'business-rules' in path_lower or 'business_rules' in path_lower:
            return DocumentType.BUSINESS_RULES
        elif 'technical-spec' in path_lower or 'technical_spec' in path_lower:
            return DocumentType.TECHNICAL_SPEC
        elif 'standards' in path_lower:
            return DocumentType.STANDARDS
        elif 'configuration' in path_lower:
            return DocumentType.CONFIGURATION
        elif 'user-process' in path_lower or 'user_process' in path_lower:
            return DocumentType.USER_PROCESS
        else:
            return DocumentType.GENERAL
    
    def validate_date_format(self, date_str: str) -> bool:
        """Validate date format (YYYY-MM-DD)."""
        if not isinstance(date_str, str):
            return False
        
        date_pattern = r'^\d{4}-\d{2}-\d{2}$'
        if not re.match(date_pattern, date_str):
            return False
        
        try:
            datetime.strptime(date_str, '%Y-%m-%d')
            return True
        except ValueError:
            return False
    
    def validate_version_format(self, version_str: str) -> bool:
        """Validate version format (X.Y or X.Y.Z)."""
        if not isinstance(version_str, str):
            return False
        
        version_pattern = r'^\d+\.\d+(\.\d+)?$'
        return bool(re.match(version_pattern, version_str))
    
    def validate_confidence_score(self, score: Any) -> bool:
        """Validate confidence score (0.0 to 1.0)."""
        if isinstance(score, (int, float)):
            return 0.0 <= score <= 1.0
        return False
    
    def validate_field_type(self, value: Any, expected_type: Any) -> bool:
        """Validate field type matches expected type."""
        if isinstance(expected_type, tuple):
            return isinstance(value, expected_type)
        return isinstance(value, expected_type)
    
    def validate_enumerated_field(self, value: str, valid_values: set) -> bool:
        """Validate enumerated field value."""
        return value in valid_values
    
    def extract_frontmatter(self, content: str) -> Tuple[Optional[Dict[str, Any]], List[str]]:
        """Extract YAML frontmatter from markdown content."""
        lines = content.split('\n')
        
        if not lines or lines[0].strip() != '---':
            return None, ["No YAML frontmatter found (missing opening ---)"]
        
        yaml_lines = []
        end_found = False
        
        for i, line in enumerate(lines[1:], 2):
            if line.strip() == '---':
                end_found = True
                break
            yaml_lines.append(line)
        
        if not end_found:
            return None, ["No YAML frontmatter found (missing closing ---)"]
        
        yaml_content = '\n'.join(yaml_lines)
        
        try:
            frontmatter = yaml.safe_load(yaml_content)
            if not isinstance(frontmatter, dict):
                return None, ["YAML frontmatter is not a dictionary"]
            return frontmatter, []
        except yaml.YAMLError as e:
            return None, [f"YAML parsing error: {str(e)}"]
    
    def validate_core_fields(self, frontmatter: Dict[str, Any], result: ValidationResult):
        """Validate core required fields."""
        for field, expected_type in self.CORE_REQUIRED_FIELDS.items():
            if field not in frontmatter:
                result.add_issue(ValidationLevel.ERROR, field, f"Required field '{field}' is missing")
                continue
            
            value = frontmatter[field]
            if not self.validate_field_type(value, expected_type):
                result.add_issue(ValidationLevel.ERROR, field, 
                               f"Field '{field}' should be of type {expected_type.__name__}, got {type(value).__name__}")
                continue
            
            # Specific validations
            if field in ['created_date', 'last_updated_date']:
                if not self.validate_date_format(value):
                    result.add_issue(ValidationLevel.ERROR, field, 
                                   f"Field '{field}' must be in YYYY-MM-DD format, got '{value}'")
            
            elif field == 'version':
                if not self.validate_version_format(value):
                    result.add_issue(ValidationLevel.ERROR, field, 
                                   f"Field '{field}' must be in X.Y or X.Y.Z format, got '{value}'")
            
            elif field == 'status':
                if not self.validate_enumerated_field(value, self.VALID_STATUS_VALUES):
                    result.add_issue(ValidationLevel.WARNING, field, 
                                   f"Field '{field}' has non-standard value '{value}'. Valid values: {sorted(self.VALID_STATUS_VALUES)}")
    
    def validate_advanced_sections(self, frontmatter: Dict[str, Any], result: ValidationResult):
        """Validate advanced metadata sections."""
        for section_name, section_config in self.ADVANCED_SECTIONS.items():
            if section_name not in frontmatter:
                # Check if this is a required section based on document type
                if self.is_section_required(section_name, result.document_type):
                    result.add_issue(ValidationLevel.ERROR, section_name, 
                                   f"Required section '{section_name}' is missing")
                else:
                    result.add_issue(ValidationLevel.INFO, section_name, 
                                   f"Optional section '{section_name}' is not present")
                continue
            
            section_data = frontmatter[section_name]
            
            # Handle different section types
            if isinstance(section_config, dict):
                if 'required_fields' in section_config:
                    self.validate_section_fields(section_data, section_config, section_name, result)
                elif 'type' in section_config:
                    self.validate_typed_section(section_data, section_config, section_name, result)
            elif section_config == list:
                if not isinstance(section_data, list):
                    result.add_issue(ValidationLevel.ERROR, section_name, 
                                   f"Section '{section_name}' should be a list, got {type(section_data).__name__}")
    
    def validate_section_fields(self, section_data: Any, section_config: Dict, section_name: str, result: ValidationResult):
        """Validate fields within a section."""
        if not isinstance(section_data, dict):
            result.add_issue(ValidationLevel.ERROR, section_name, 
                           f"Section '{section_name}' should be a dictionary, got {type(section_data).__name__}")
            return
        
        # Check required fields
        for field, expected_type in section_config.get('required_fields', {}).items():
            if field not in section_data:
                result.add_issue(ValidationLevel.ERROR, f"{section_name}.{field}", 
                               f"Required field '{field}' is missing from section '{section_name}'")
                continue
            
            value = section_data[field]
            if not self.validate_field_type(value, expected_type):
                result.add_issue(ValidationLevel.ERROR, f"{section_name}.{field}", 
                               f"Field '{field}' in section '{section_name}' should be of type {expected_type}, got {type(value).__name__}")
                continue
            
            # Specific validations for certain fields
            self.validate_special_fields(value, field, section_name, result)
    
    def validate_special_fields(self, value: Any, field: str, section_name: str, result: ValidationResult):
        """Validate special fields with specific requirements."""
        field_path = f"{section_name}.{field}" if section_name else field
        
        if field in ['discovered_date', 'last_validated', 'evaluated_date', 'verification_date']:
            if not self.validate_date_format(value):
                result.add_issue(ValidationLevel.ERROR, field_path, 
                               f"Date field '{field}' must be in YYYY-MM-DD format, got '{value}'")
        
        elif field in ['confidence_score', 'discovery_confidence', 'classification_confidence']:
            if not self.validate_confidence_score(value):
                result.add_issue(ValidationLevel.ERROR, field_path, 
                               f"Confidence score '{field}' must be between 0.0 and 1.0, got {value}")
        
        elif field == 'access_level':
            if not self.validate_enumerated_field(value, self.VALID_ACCESS_LEVELS):
                result.add_issue(ValidationLevel.WARNING, field_path, 
                               f"Field '{field}' has non-standard value '{value}'. Valid values: {sorted(self.VALID_ACCESS_LEVELS)}")
        
        elif field == 'governance_level':
            if not self.validate_enumerated_field(value, self.VALID_GOVERNANCE_LEVELS):
                result.add_issue(ValidationLevel.WARNING, field_path, 
                               f"Field '{field}' has non-standard value '{value}'. Valid values: {sorted(self.VALID_GOVERNANCE_LEVELS)}")
        
        elif field == 'security_level':
            if not self.validate_enumerated_field(value, self.VALID_SECURITY_LEVELS):
                result.add_issue(ValidationLevel.WARNING, field_path, 
                               f"Field '{field}' has non-standard value '{value}'. Valid values: {sorted(self.VALID_SECURITY_LEVELS)}")
        
        elif field == 'business_value':
            if not self.validate_enumerated_field(value, self.VALID_BUSINESS_VALUES):
                result.add_issue(ValidationLevel.WARNING, field_path, 
                               f"Field '{field}' has non-standard value '{value}'. Valid values: {sorted(self.VALID_BUSINESS_VALUES)}")
        
        elif field == 'technical_complexity':
            if not self.validate_enumerated_field(value, self.VALID_COMPLEXITY_LEVELS):
                result.add_issue(ValidationLevel.WARNING, field_path, 
                               f"Field '{field}' has non-standard value '{value}'. Valid values: {sorted(self.VALID_COMPLEXITY_LEVELS)}")
        
        elif field == 'implementation_priority':
            if not self.validate_enumerated_field(value, self.VALID_PRIORITY_LEVELS):
                result.add_issue(ValidationLevel.WARNING, field_path, 
                               f"Field '{field}' has non-standard value '{value}'. Valid values: {sorted(self.VALID_PRIORITY_LEVELS)}")
        
        elif field == 'validation_status':
            if not self.validate_enumerated_field(value, self.VALID_VALIDATION_STATUSES):
                result.add_issue(ValidationLevel.WARNING, field_path, 
                               f"Field '{field}' has non-standard value '{value}'. Valid values: {sorted(self.VALID_VALIDATION_STATUSES)}")
    
    def validate_typed_section(self, section_data: Any, section_config: Dict, section_name: str, result: ValidationResult):
        """Validate sections with specific type requirements."""
        expected_type = section_config['type']
        
        if not self.validate_field_type(section_data, expected_type):
            result.add_issue(ValidationLevel.ERROR, section_name, 
                           f"Section '{section_name}' should be of type {expected_type.__name__}, got {type(section_data).__name__}")
            return
        
        # Validate list items if applicable
        if expected_type == list and 'item_fields' in section_config:
            for i, item in enumerate(section_data):
                if not isinstance(item, dict):
                    result.add_issue(ValidationLevel.ERROR, f"{section_name}[{i}]", 
                                   f"List item in '{section_name}' should be a dictionary, got {type(item).__name__}")
                    continue
                
                for field, field_type in section_config['item_fields'].items():
                    if field not in item:
                        result.add_issue(ValidationLevel.ERROR, f"{section_name}[{i}].{field}", 
                                       f"Required field '{field}' is missing from list item in '{section_name}'")
                        continue
                    
                    if not self.validate_field_type(item[field], field_type):
                        result.add_issue(ValidationLevel.ERROR, f"{section_name}[{i}].{field}", 
                                       f"Field '{field}' should be of type {field_type}, got {type(item[field]).__name__}")
    
    def is_section_required(self, section_name: str, doc_type: DocumentType) -> bool:
        """Determine if a section is required for a specific document type."""
        # FIBO classification is required for all document types
        if section_name == 'fibo_classification':
            return True
        
        # Policy governance is required for business rules and standards
        if section_name == 'policy_governance':
            return doc_type in [DocumentType.BUSINESS_RULES, DocumentType.STANDARDS, DocumentType.CONFIGURATION]
        
        # Knowledge graph is recommended for all but not strictly required
        if section_name == 'knowledge_graph':
            return False
        
        # Enterprise metadata is required for formal documents
        if section_name == 'enterprise_metadata':
            return doc_type in [DocumentType.BUSINESS_RULES, DocumentType.STANDARDS, DocumentType.TECHNICAL_SPEC]
        
        # Discovery metadata is recommended for all
        if section_name == 'discovery_metadata':
            return False
        
        return False
    
    def validate_file(self, file_path: str) -> ValidationResult:
        """Validate a single Markdown file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            result = ValidationResult(file_path, False, DocumentType.GENERAL)
            result.add_issue(ValidationLevel.ERROR, 'file', f"Error reading file: {str(e)}")
            return result
        
        frontmatter, errors = self.extract_frontmatter(content)
        
        if frontmatter is None:
            result = ValidationResult(file_path, False, DocumentType.GENERAL)
            for error in errors:
                result.add_issue(ValidationLevel.ERROR, 'frontmatter', error)
            return result
        
        doc_type = self.detect_document_type(frontmatter, file_path)
        result = ValidationResult(file_path, True, doc_type)
        
        # Validate core fields
        self.validate_core_fields(frontmatter, result)
        
        # Validate advanced sections
        self.validate_advanced_sections(frontmatter, result)
        
        # Validate tags if present
        if 'tags' in frontmatter:
            if not isinstance(frontmatter['tags'], list):
                result.add_issue(ValidationLevel.WARNING, 'tags', 
                               f"Field 'tags' should be a list, got {type(frontmatter['tags']).__name__}")
        
        return result
    
    def validate_directory(self, directory_path: str) -> List[ValidationResult]:
        """Validate all Markdown files in a directory."""
        results = []
        
        for root, dirs, files in os.walk(directory_path):
            for file in files:
                if file.endswith('.md'):
                    file_path = os.path.join(root, file)
                    result = self.validate_file(file_path)
                    results.append(result)
        
        self.results = results
        return results
    
    def _get_display_path(self, file_path: str) -> str:
        """Get a shortened display path for better readability."""
        # Convert to forward slashes for consistency
        normalized_path = file_path.replace('\\', '/')
        
        # If path is too long, show relative path from docs/
        if len(normalized_path) > 80:
            if 'docs/' in normalized_path:
                # Show path relative to docs/
                parts = normalized_path.split('docs/')
                if len(parts) > 1:
                    return f"docs/{parts[-1]}"
            
            # If still too long, truncate with ellipsis
            if len(normalized_path) > 80:
                return f"...{normalized_path[-77:]}"
        
        return normalized_path
    
    def generate_report(self, output_format: str = 'text') -> str:
        """Generate validation report in specified format."""
        if output_format == 'json':
            return self.generate_json_report()
        elif output_format == 'csv':
            return self.generate_csv_report()
        else:
            return self.generate_text_report()
    
    def generate_text_report(self) -> str:
        """Generate human-readable text report."""
        report = []
        report.append("=" * 100)
        report.append("YAML FRONT-MATTER VALIDATION REPORT")
        report.append("=" * 100)
        report.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append("")
        
        # Summary statistics
        total_files = len(self.results)
        compliant_files = sum(1 for r in self.results if r.is_compliant)
        non_compliant_files = total_files - compliant_files
        
        total_errors = sum(len([i for i in r.issues if i.level == ValidationLevel.ERROR]) for r in self.results)
        total_warnings = sum(len([i for i in r.issues if i.level == ValidationLevel.WARNING]) for r in self.results)
        total_info = sum(len([i for i in r.issues if i.level == ValidationLevel.INFO]) for r in self.results)
        
        report.append("SUMMARY")
        report.append("-" * 50)
        report.append(f"Total files processed: {total_files}")
        report.append(f"Compliant files: {compliant_files}")
        report.append(f"Non-compliant files: {non_compliant_files}")
        report.append(f"Compliance rate: {(compliant_files/total_files*100):.1f}%" if total_files > 0 else "Compliance rate: N/A")
        report.append("")
        report.append(f"Total errors: {total_errors}")
        report.append(f"Total warnings: {total_warnings}")
        report.append(f"Total info messages: {total_info}")
        report.append("")
        
        # Compliant files
        if compliant_files > 0:
            report.append("COMPLIANT FILES")
            report.append("-" * 50)
            for result in self.results:
                if result.is_compliant:
                    # Use shorter file path for display
                    display_path = self._get_display_path(result.file_path)
                    report.append(f"✅ {display_path}")
                    report.append(f"   Type: {result.document_type.value}")
                    if result.issues:
                        for issue in result.issues:
                            if issue.level != ValidationLevel.ERROR:
                                report.append(f"   {issue.level.value}: {issue.field} - {issue.message}")
                    report.append("")
        
        # Non-compliant files
        if non_compliant_files > 0:
            report.append("NON-COMPLIANT FILES")
            report.append("-" * 50)
            for result in self.results:
                if not result.is_compliant:
                    # Use shorter file path for display
                    display_path = self._get_display_path(result.file_path)
                    report.append(f"❌ {display_path}")
                    report.append(f"   Type: {result.document_type.value}")
                    for issue in result.issues:
                        icon = "🔴" if issue.level == ValidationLevel.ERROR else "🟡" if issue.level == ValidationLevel.WARNING else "ℹ️"
                        report.append(f"   {icon} {issue.level.value}: {issue.field}")
                        report.append(f"      {issue.message}")
                    report.append("")
        
        # Document type breakdown
        doc_type_counts = {}
        for result in self.results:
            doc_type = result.document_type.value
            if doc_type not in doc_type_counts:
                doc_type_counts[doc_type] = {'total': 0, 'compliant': 0}
            doc_type_counts[doc_type]['total'] += 1
            if result.is_compliant:
                doc_type_counts[doc_type]['compliant'] += 1
        
        report.append("DOCUMENT TYPE BREAKDOWN")
        report.append("-" * 40)
        for doc_type, counts in sorted(doc_type_counts.items()):
            compliance_rate = (counts['compliant'] / counts['total'] * 100) if counts['total'] > 0 else 0
            report.append(f"{doc_type}: {counts['compliant']}/{counts['total']} ({compliance_rate:.1f}%)")
        
        return "\n".join(report)
    
    def generate_json_report(self) -> str:
        """Generate JSON report."""
        report_data = {
            'generated': datetime.now().isoformat(),
            'summary': {
                'total_files': len(self.results),
                'compliant_files': sum(1 for r in self.results if r.is_compliant),
                'non_compliant_files': sum(1 for r in self.results if not r.is_compliant),
                'total_errors': sum(len([i for i in r.issues if i.level == ValidationLevel.ERROR]) for r in self.results),
                'total_warnings': sum(len([i for i in r.issues if i.level == ValidationLevel.WARNING]) for r in self.results),
                'total_info': sum(len([i for i in r.issues if i.level == ValidationLevel.INFO]) for r in self.results)
            },
            'files': []
        }
        
        for result in self.results:
            file_data = {
                'path': result.file_path,
                'compliant': result.is_compliant,
                'document_type': result.document_type.value,
                'issues': [
                    {
                        'level': issue.level.value,
                        'field': issue.field,
                        'message': issue.message,
                        'line_number': issue.line_number
                    }
                    for issue in result.issues
                ]
            }
            report_data['files'].append(file_data)
        
        return json.dumps(report_data, indent=2)
    
    def generate_csv_report(self) -> str:
        """Generate CSV report."""
        import io
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Header
        writer.writerow(['File Path', 'Compliant', 'Document Type', 'Issue Level', 'Field', 'Message', 'Line Number'])
        
        for result in self.results:
            if not result.issues:
                writer.writerow([result.file_path, result.is_compliant, result.document_type.value, '', '', '', ''])
            else:
                for issue in result.issues:
                    writer.writerow([
                        result.file_path,
                        result.is_compliant,
                        result.document_type.value,
                        issue.level.value,
                        issue.field,
                        issue.message,
                        issue.line_number or ''
                    ])
        
        return output.getvalue()

def main():
    """Main entry point for the validation script."""
    parser = argparse.ArgumentParser(
        description='Validate YAML front-matter in Markdown files',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python validate_yaml_frontmatter.py
  python validate_yaml_frontmatter.py --path docs/ --output json
  python validate_yaml_frontmatter.py --strict --quiet
        """
    )
    
    parser.add_argument('--path', default='docs/', 
                       help='Path to scan for Markdown files (default: docs/)')
    parser.add_argument('--output', choices=['text', 'json', 'csv'], default='text',
                       help='Output format (default: text)')
    parser.add_argument('--strict', action='store_true',
                       help='Enable strict mode (fail on warnings)')
    parser.add_argument('--quiet', action='store_true',
                       help='Suppress non-error output')
    
    args = parser.parse_args()
    
    # Validate path exists
    if not os.path.exists(args.path):
        print(f"Error: Path '{args.path}' does not exist", file=sys.stderr)
        sys.exit(1)
    
    # Initialize validator
    validator = YAMLFrontmatterValidator()
    
    # Validate files
    if not args.quiet:
        print(f"Scanning for Markdown files in: {args.path}")
    
    results = validator.validate_directory(args.path)
    
    if not args.quiet:
        print(f"Processed {len(results)} files")
    
    # Generate report
    report = validator.generate_report(args.output)
    print(report)
    
    # Exit with appropriate code
    non_compliant_count = sum(1 for r in results if not r.is_compliant)
    error_count = sum(len([i for i in r.issues if i.level == ValidationLevel.ERROR]) for r in results)
    warning_count = sum(len([i for i in r.issues if i.level == ValidationLevel.WARNING]) for r in results)
    
    if error_count > 0:
        sys.exit(1)  # Errors found
    elif args.strict and warning_count > 0:
        sys.exit(2)  # Warnings in strict mode
    else:
        sys.exit(0)  # Success

if __name__ == '__main__':
    main()