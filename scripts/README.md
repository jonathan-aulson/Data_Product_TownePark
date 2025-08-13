# YAML Front-matter Validation Scripts

This directory contains automated validation scripts for YAML front-matter in Markdown files according to the Towne Park Knowledge Corpus standards.

## 🎯 Scope and Applicability

**IMPORTANT: These validation scripts are designed to validate ONLY files within the `docs/knowledge-corpus/` directory.**

### In Scope
- **`docs/knowledge-corpus/`** - All Markdown files in this directory and its subdirectories are subject to YAML front-matter validation.

### Out of Scope
- **All other directories** - Files outside `docs/knowledge-corpus/` are considered reference materials or artifacts only and are NOT subject to YAML front-matter validation requirements.
- **`new-project-assets/`** - Reference materials only, no validation required.
- **`FIBO-master-ontology/`** - External ontology reference, no validation required.
- **`Towne-Park-Billing-Source-Code/`** - Source code repository, no validation required.
- **Root `docs/` files** - Documentation infrastructure files, validation optional.

## Scripts Overview

### 1. `validate_yaml_frontmatter.py` (Full-Featured)
The comprehensive validation script with complete FIBO, policy governance, knowledge graph, and enterprise metadata validation.

**Features:**
- Complete YAML front-matter validation
- Date format validation (YYYY-MM-DD)
- Version format validation (X.Y or X.Y.Z)
- Enumerated field value validation
- FIBO classification validation
- Policy governance framework validation
- Knowledge graph metadata validation
- Enterprise metadata validation
- Multiple output formats (text, JSON, CSV)
- CLI interface with options
- CI/CD integration support

**Requirements:**
- Python 3.7+
- PyYAML library (`pip install PyYAML`)

### 2. `validate_yaml_simple.py` (No Dependencies)
A simplified validation script using only Python standard library for basic validation.

**Features:**
- Basic YAML front-matter validation
- Required field checking
- Date and version format validation
- Simple reporting
- No external dependencies

## Installation

### ⚠️ IMPORTANT: Virtual Environment Setup

**Always use a Python virtual environment for running these scripts to avoid dependency conflicts.**

For complete setup instructions, see: **[PYTHON_SETUP_GUIDE.md](../PYTHON_SETUP_GUIDE.md)**

#### Quick Setup (Windows PowerShell)
```powershell
# From project root directory
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r scripts\requirements.txt
```

#### Daily Usage
```powershell
# Activate virtual environment
venv\Scripts\Activate.ps1

# Run comprehensive validation
python scripts\validate_yaml_frontmatter.py

# Run simple validation
python scripts\validate_yaml_simple.py

# Deactivate when done
deactivate
```

### Option 1: Full-Featured Script (Recommended)
```powershell
# With virtual environment activated
python scripts\validate_yaml_frontmatter.py --path docs/knowledge-corpus/
```

### Option 2: Simple Script (No Dependencies)
```powershell
# With virtual environment activated (still recommended)
python scripts\validate_yaml_simple.py
```

## Usage

### Command Line Options (Full Script)

```bash
python validate_yaml_frontmatter.py [options]
```

**Options:**
- `--path PATH`: Path to scan for Markdown files (default: docs/knowledge-corpus/)
- `--output FORMAT`: Output format: text, json, csv (default: text)
- `--strict`: Enable strict mode (fail on warnings)
- `--quiet`: Suppress non-error output
- `--help`: Show help message

**Examples:**
```bash
# Basic validation (Knowledge Corpus only)
python validate_yaml_frontmatter.py --path docs/knowledge-corpus/

# Validate specific subdirectory with JSON output
python validate_yaml_frontmatter.py --path docs/knowledge-corpus/business-rules/ --output json

# Strict mode for CI/CD
python validate_yaml_frontmatter.py --path docs/knowledge-corpus/ --strict --quiet
```

### Exit Codes

The scripts return appropriate exit codes for CI/CD integration:
- `0`: Success (all files compliant)
- `1`: Errors found (non-compliant files)
- `2`: Warnings in strict mode

## Validation Rules

### Required Core Fields

All Markdown files **within `docs/knowledge-corpus/`** must include these fields in their YAML front-matter:

```yaml
---
title: "Document Title"
description: "Comprehensive description of content and purpose"
created_date: YYYY-MM-DD
last_updated_date: YYYY-MM-DD
version: X.Y
status: "Draft|Review|Production|Active|Archived"
owner: "Document Owner"
---
```

### Advanced Metadata Sections

The following sections are validated based on document type:

#### FIBO Classification (Required for all documents)
```yaml
fibo_classification:
  fibo_type: "fibo_ontology_class"
  domain_extensions:
    towne_park_context: "specific_business_context"
```

#### Policy Governance (Required for business rules, standards, configuration)
```yaml
governance:
  access_level: "public|internal|confidential|restricted"
  compliance_tags: ["tag1", "tag2"]
  policy_constraints: ["constraint1", "constraint2"]
  policy_evaluation:
    evaluated_date: YYYY-MM-DD
    applicable_policies: ["policy1", "policy2"]
    compliance_status: "compliant|non_compliant|pending"
```

#### Discovery Metadata (Recommended)
```yaml
discovery_metadata:
  discovered_date: YYYY-MM-DD
  discovery_method: "method_name"
  confidence_score: 0.0-1.0
  validation_status: "validated|pending|uncertain"
  knowledge_graph_id: "unique_identifier"
```

#### Enterprise Metadata (Required for formal documents)
```yaml
enterprise_metadata:
  document_classification: "document_type"
  security_level: "public|internal|confidential|restricted"
  retention_period: "period"
  review_cycle: "frequency"
  distribution_list: ["stakeholder1", "stakeholder2"]
  compliance_frameworks: ["framework1", "framework2"]
  change_control: "version_controlled"
  approval_authority: "authority_name"
```

### Field Validation Rules

#### Date Fields
- Format: `YYYY-MM-DD` (ISO 8601)
- Must be valid calendar dates
- Examples: `2025-08-08`, `2024-12-31`

#### Version Fields
- Format: `X.Y` or `X.Y.Z` (semantic versioning)
- Examples: `1.0`, `2.1.3`, `0.9`

#### Confidence Scores
- Range: `0.0` to `1.0`
- Examples: `0.95`, `1.0`, `0.75`

#### Enumerated Values

**Status Values:**
- `Draft`, `Review`, `Active`, `Production`, `Archived`, `Deprecated`
- `Validation Complete`, `Architectural Design`

**Access Levels:**
- `public`, `internal`, `confidential`, `restricted`

**Business Values:**
- `critical`, `high`, `medium`, `low`

**Complexity Levels:**
- `high`, `medium`, `low`

**Priority Levels:**
- `immediate`, `high`, `medium`, `low`

## Document Type Detection

The validator automatically detects document types based on file paths and content:

- **Daily Update**: Files containing "daily-update" or "daily_update"
- **Architecture**: Files containing "architecture" or "architectural"
- **Validation Report**: Files containing "validation-report" or "validation_report"
- **Meeting Transcript**: Files containing "meeting-transcript" or "meeting_transcript"
- **Business Rules**: Files containing "business-rules" or "business_rules"
- **Technical Specification**: Files containing "technical-spec" or "technical_spec"
- **Standards**: Files in "standards" directories
- **Configuration**: Files in "configuration" directories
- **User Process**: Files containing "user-process" or "user_process"
- **General**: All other files

## CI/CD Integration

### GitHub Actions Example

```yaml
name: YAML Front-matter Validation

on:
  push:
    paths:
      - 'docs/knowledge-corpus/**/*.md'
  pull_request:
    paths:
      - 'docs/knowledge-corpus/**/*.md'

jobs:
  validate-frontmatter:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.9'
    - name: Install dependencies
      run: |
        pip install -r scripts/requirements.txt
    - name: Validate YAML front-matter (Knowledge Corpus only)
      run: |
        python scripts/validate_yaml_frontmatter.py --path docs/knowledge-corpus/ --strict --quiet
```

### Azure DevOps Example

```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: UsePythonVersion@0
  inputs:
    versionSpec: '3.9'
- script: |
    pip install -r scripts/requirements.txt
    python scripts/validate_yaml_frontmatter.py --path docs/knowledge-corpus/ --strict --quiet
  displayName: 'Validate YAML Front-matter (Knowledge Corpus only)'
```

## Output Formats

### Text Output (Default)
Human-readable report with summary statistics, compliant files list, and detailed error reporting.

### JSON Output
Machine-readable format suitable for integration with other tools:

```json
{
  "generated": "2025-08-08T16:48:27.000Z",
  "summary": {
    "total_files": 14,
    "compliant_files": 12,
    "non_compliant_files": 2,
    "total_errors": 8,
    "total_warnings": 12,
    "total_info": 0
  },
  "files": [
    {
      "path": "docs/example.md",
      "compliant": true,
      "document_type": "general",
      "issues": []
    }
  ]
}
```

### CSV Output
Spreadsheet-compatible format for analysis and reporting:

```csv
File Path,Compliant,Document Type,Issue Level,Field,Message,Line Number
docs/example.md,True,general,,,
docs/error.md,False,general,ERROR,title,Required field 'title' is missing,
```

## Troubleshooting

### Common Issues

1. **ModuleNotFoundError: No module named 'yaml'**
   - Solution: Install PyYAML with `pip install PyYAML`
   - Alternative: Use the simple script (`validate_yaml_simple.py`)

2. **Permission Denied Errors**
   - Solution: Ensure read permissions on all Markdown files
   - Check file encoding (should be UTF-8)

3. **YAML Parsing Errors**
   - Solution: Validate YAML syntax in front-matter
   - Ensure proper indentation and quoting

4. **False Positives in Simple Script**
   - The simple script uses basic parsing and may miss complex YAML structures
   - Use the full script for comprehensive validation

### Getting Help

For issues with the validation scripts:

1. Check the error messages in the validation report
2. Verify YAML syntax using online YAML validators
3. Review the document templates in the knowledge corpus
4. Consult the Towne Park documentation standards

## Development

### Adding New Validation Rules

To add new validation rules to the full script:

1. Update the field definitions in `YAMLFrontmatterValidator`
2. Add validation logic in the appropriate validation methods
3. Update the enumerated values sets as needed
4. Add tests for the new validation rules

### Extending Document Types

To add new document types:

1. Add the type to the `DocumentType` enum
2. Update the `detect_document_type` method
3. Add type-specific validation rules in `is_section_required`
4. Update the documentation

## Version History

- **v1.0** (2025-08-08): Initial implementation with comprehensive validation
  - Full YAML front-matter validation
  - Multiple output formats
  - CI/CD integration support
  - Simple fallback script for environments without dependencies