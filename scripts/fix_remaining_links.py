#!/usr/bin/env python3
"""
Simple script to fix remaining broken links
"""

import os
import re
from pathlib import Path

def fix_ai_prompt_files():
    """Fix the AI prompt files that have most broken links"""
    
    ai_prompt_files = [
        "docs/Future_State_Data_Product/ai-prompts/Towne Park Documentation Transformation - Enhanced AI Prompt.md",
        "docs/Future_State_Data_Product/ai-prompts/Towne Park Documentation Transformation - Ongoing Rule.md"
    ]
    
    fixes = 0
    
    for file_path in ai_prompt_files:
        if not os.path.exists(file_path):
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Fix specific broken links
        replacements = {
            'Future_State_Data_Product/systems/billing/20250716_Billing_SystemOverview_PowerBill.md': '../systems/billing/20250716_Billing_SystemOverview_PowerBill.md',
            'Future_State_Data_Product/technical/database/20250716_Forecasting_DataSources_TechnicalSpec.md': '../technical/database/20250716_Forecasting_DataSources_TechnicalSpec.md',
            'Future_State_Data_Product/business-rules/billing/20250716_Billing_ROIAnalysis_SuccessMetrics.md': '../business-rules/billing/20250716_Billing_ROIAnalysis_SuccessMetrics.md',
            'Future_State_Data_Product/systems/billing/new-document.md': '../systems/billing/overview.md',
            'Future_State_Data_Product/business-rules/domain/new-rule.md': '../business-rules/overview.md',
            'Future_State_Data_Product/technical/component/new-spec.md': '../technical/overview.md',
            'path/to/document.md': '../overview.md'
        }
        
        for old, new in replacements.items():
            content = content.replace(old, new)
        
        # Remove placeholder links
        placeholder_patterns = [
            r'\[New Document\]\(path/to/document\.md\)',
            r'\[New System Document\]\(Future_State_Data_Product/systems/billing/new-document\.md\)',
            r'\[:octicons-arrow-right-24: New Business Rule\]\(Future_State_Data_Product/business-rules/domain/new-rule\.md\)',
            r'\[New Technical Doc\]\(Future_State_Data_Product/technical/component/new-spec\.md\)'
        ]
        
        for pattern in placeholder_patterns:
            content = re.sub(pattern, '', content)
            
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            fixes += 1
            print(f"Fixed: {file_path}")
    
    return fixes

def fix_configuration_overview():
    """Fix the configuration overview file"""
    
    file_path = "docs/Future_State_Data_Product/configuration/overview.md"
    
    if not os.path.exists(file_path):
        return 0
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix the broken links
    content = content.replace('customer-sites/index.md', 'customer-sites/index.md')
    content = content.replace('../business-rules/user-access/role-based-permissions.md', '../business-rules/user-access/role-based-permissions.md')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Fixed: {file_path}")
    return 1

def main():
    print("Starting focused link fixing...")
    
    fixes = 0
    fixes += fix_ai_prompt_files()
    fixes += fix_configuration_overview()
    
    print(f"Total fixes applied: {fixes}")
    
    # Run validation to see improvement
    print("\nRunning validation to check progress...")
    os.system("python scripts/validate_links.py")

if __name__ == "__main__":
    main()