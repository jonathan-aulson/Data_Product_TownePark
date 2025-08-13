---
title: "Python Virtual Environment Setup Guide"
description: "Instructions for setting up and using the Python virtual environment for the Data Product TownePark project, specifically for running YAML front-matter validation scripts"
created_date: 2025-08-08
last_updated_date: 2025-08-12
version: 1.1
status: Active
owner: "Development Team"
version_history:
  - version: "1.0"
    date: "2025-08-08"
    changes: "Initial Python setup guide"
  - version: "1.1"
    date: "2025-08-12"
    changes: "Relocated from .roo/rules/ to proper docs/development/ location per governance framework"
discovery_metadata:
  discovered_date: 2025-08-12
  discovery_method: "rule_consolidation_relocation"
  confidence_score: 1.0
  validation_status: "validated"
  knowledge_graph_id: "python_setup_guide"
systems:
  - Python Environment
  - Development Tools
  - Script Execution
  - CI/CD Pipeline
components:
  - Virtual Environment
  - Package Management
  - Script Validation
  - VS Code Integration
business_domains:
  - Development Operations
  - Quality Assurance
  - Script Automation
user_roles:
  - Developer
  - QA Engineer
  - DevOps Engineer
  - System Administrator
relationships:
  - target: "scripts/validate_yaml_frontmatter.py"
    type: "dependency"
    strength: 1.0
  - target: "scripts/requirements.txt"
    type: "dependency"
    strength: 1.0
  - target: "../../.roo/rules/04_YAML_Front_matter_Standards.md"
    type: "supports"
    strength: 0.85
governance:
  access_level: "internal"
  compliance_tags: ["Development_Tools", "Environment_Setup", "Script_Dependencies"]
  policy_constraints: ["development_environment_standards", "dependency_management"]
  policy_evaluation:
    evaluated_date: 2025-08-12
    applicable_policies: ["development_environment_policy", "dependency_management_policy"]
    compliance_status: "compliant"
    automatic_constraints: ["environment_isolation", "dependency_tracking"]
fibo_classification:
  fibo_type: "development-environment-specification"
  domain_extensions:
    towne_park_context: "python_virtual_environment_setup"
    process_type: "development_environment_configuration"
    automation_level: "semi_automated_setup"
tags:
  - python
  - virtual-environment
  - development-setup
  - script-validation
  - environment-configuration
---

# Python Virtual Environment Setup Guide

## Overview

This guide provides instructions for setting up and using the Python virtual environment for the Data Product TownePark project, specifically for running YAML front-matter validation scripts.

## Prerequisites

- Python 3.7 or higher installed on your system
- PowerShell or Command Prompt access
- VS Code (recommended)

## Initial Setup

### 1. Create Virtual Environment

From the project root directory (`c:/Users/JonathanAulson/Documents/Projects/Data_Product_TownePark`):

```powershell
# Create virtual environment
python -m venv venv
```

### 2. Activate Virtual Environment

**For PowerShell (Windows):**
```powershell
venv\Scripts\Activate.ps1
```

**For Command Prompt (Windows):**
```cmd
venv\Scripts\activate.bat
```

**For Git Bash/Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies

```powershell
pip install -r scripts\requirements.txt
```

### 4. Verify Installation

```powershell
python -c "import yaml; print('PyYAML installed successfully')"
```

## Daily Usage

### Activating the Environment

Before running any Python scripts, always activate the virtual environment:

```powershell
# Navigate to project root
cd c:\Users\JonathanAulson\Documents\Projects\Data_Product_TownePark

# Activate virtual environment
venv\Scripts\Activate.ps1

# Verify activation (you should see (venv) in your prompt)
```

### Running Validation Scripts

**Simple Validation (Basic Check):**
```powershell
python scripts\validate_yaml_simple.py
```

**Comprehensive Validation (Full Schema Check):**
```powershell
python scripts\validate_yaml_frontmatter.py
```

### Deactivating the Environment

When finished working:
```powershell
deactivate
```

## VS Code Integration

### 1. Select Python Interpreter

1. Open VS Code in the project directory
2. Press `Ctrl+Shift+P` to open command palette
3. Type "Python: Select Interpreter"
4. Choose the interpreter from `venv\Scripts\python.exe`

### 2. Terminal Integration

VS Code will automatically activate the virtual environment when opening a new terminal if the correct interpreter is selected.

## Troubleshooting

### PowerShell Execution Policy Issues

If you get an execution policy error:

```powershell
# Check current policy
Get-ExecutionPolicy

# Set policy for current user (if needed)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Module Not Found Errors

If you get "module not found" errors:

1. Ensure virtual environment is activated
2. Reinstall dependencies:
   ```powershell
   pip install --force-reinstall -r scripts\requirements.txt
   ```

### Virtual Environment Not Activating

1. Ensure you're in the correct directory
2. Check that `venv` folder exists
3. Try recreating the virtual environment:
   ```powershell
   rmdir /s venv
   python -m venv venv
   venv\Scripts\Activate.ps1
   pip install -r scripts\requirements.txt
   ```

## Project Structure

```
Data_Product_TownePark/
├── venv/                          # Virtual environment (created)
│   ├── Scripts/
│   │   ├── Activate.ps1          # PowerShell activation
│   │   ├── activate.bat          # CMD activation
│   │   └── python.exe            # Python interpreter
│   └── Lib/                      # Installed packages
├── scripts/
│   ├── requirements.txt          # Python dependencies
│   ├── validate_yaml_simple.py   # Basic validation
│   └── validate_yaml_frontmatter.py  # Comprehensive validation
└── docs/                         # Documentation to validate
```

## Best Practices

1. **Always activate** the virtual environment before running scripts
2. **Keep requirements.txt updated** when adding new dependencies
3. **Don't commit the venv folder** to version control (add to .gitignore)
4. **Use relative paths** when running scripts from project root
5. **Test scripts** in the virtual environment before deployment

## Common Commands Reference

```powershell
# Setup (one-time)
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r scripts\requirements.txt

# Daily workflow
venv\Scripts\Activate.ps1                    # Activate
python scripts\validate_yaml_frontmatter.py  # Run validation
deactivate                                   # Deactivate when done

# Maintenance
pip list                                     # Show installed packages
pip freeze > scripts\requirements.txt       # Update requirements
pip install --upgrade pip                   # Update pip
```

## Integration with CI/CD

For automated validation in GitHub Actions or other CI/CD systems, the workflow should:

1. Set up Python environment
2. Create and activate virtual environment
3. Install dependencies from requirements.txt
4. Run validation scripts
5. Report results

Example GitHub Actions step:
```yaml
- name: Setup Python and validate YAML
  run: |
    python -m venv venv
    venv\Scripts\Activate.ps1
    pip install -r scripts\requirements.txt
    python scripts\validate_yaml_frontmatter.py
```

## Support

For issues with the Python environment setup:

1. Check this guide first
2. Verify Python installation: `python --version`
3. Check virtual environment status: Look for `(venv)` in prompt
4. Review error messages carefully
5. Try recreating the virtual environment if issues persist

## Related Documentation

### **Script Dependencies**
- [`scripts/validate_yaml_frontmatter.py`](../../scripts/validate_yaml_frontmatter.py) - Primary validation script
- [`scripts/requirements.txt`](../../scripts/requirements.txt) - Python package dependencies
- [`scripts/validate_yaml_simple.py`](../../scripts/validate_yaml_simple.py) - Basic validation script

### **Integration Points**
- [YAML Front-matter Standards](../../.roo/rules/04_YAML_Front_matter_Standards.md) - Validation standards implemented by these scripts
- [Comprehensive Code Validation Framework](../../.roo/rules/01_Comprehensive_Code_Validation_Framework.md) - Overall validation framework

### **Development Resources**
- [Development Environment Configuration](../configuration/development-environment.md) 🔄 PLANNED
- [Script Development Guidelines](../standards/script-development-standards.md) 🔄 PLANNED

---

**Last Updated:** 2025-08-12  
**Maintained By:** Development Team  
**Version:** 1.1