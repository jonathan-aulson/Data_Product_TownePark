# Modular ToDo Deliverables and Reorganization Plan

Summary: This file contains modular, actionable ToDo lists for each rule file in [`.roo/rules`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules:1), a canonical ownership mapping to remove overlap, an applicability matrix, mandatory-script integration, and concise suggestions to improve mission success.

1.  Per-rule modular ToDo lists (each ends with required reflection sentence)

Rule: [`00_Master_AI_Protocol_and_Foundational_Principles.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/00_Master_AI_Protocol_and_Foundational_Principles.md:1)

*   Applicability criteria:
    *   Applies when tasks require enterprise-wide policy precedence, discovery orchestration, or absolute information preservation.
    *   Trigger: task changes content, defines governance, or requires cross-rule decisions.
*   ToDo:
    1.  Verify foundational principles relevant to the task (Principles 1–7) and record decision rationale.
    2.  Run master enforcement script [`scripts/validate_master_ai_protocol_compliance.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/validate_master_ai_protocol_compliance.py:1) when policy-level checks are required.
    3.  Ensure YAML metadata includes discovery and governance fields per master template.
    4.  Add knowledge-graph integration steps if discovery or entity mapping required.
    5.  Mark any conflicts and escalate per precedence rules (legal > industry > corporate).
    6.  Update master-level todo tracking and metadata.
*   Final line (required): Reflect on the task at hand and determine whether a rule found in .roo/rules/ directory applies to the task- if so, add the ToDo list steps from that rule to your current active ToDo list before continuing

Rule: [`01_Comprehensive_Code_Validation_Framework.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/01_Comprehensive_Code_Validation_Framework.md:1)

*   Applicability criteria:
    *   Applies when documentation references implementation, code, calculations, or integration points.
    *   Trigger: document creation/editing with code references, or CI/CD validation runs.
*   ToDo:
    1.  Identify code-reference targets using [`.roo/rules/05_Source_Code_Map.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/05_Source_Code_Map.md:1) mappings.
    2.  Execute enhanced validation script [`scripts/enhanced_code_validation.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/enhanced_code_validation.py:1) (mandatory) to generate validation findings.
    3.  Execute enforcement script [`scripts/enforce_code_validation.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/enforce_code_validation.py:1) (mandatory) to verify authenticity and file existence.
    4.  Produce Code Validation Report and place in `docs/knowledge-corpus/validation-reports/`.
    5.  If enforcement fails, follow violation response protocol and escalate per Rule 02.
    6.  Update validation metadata in YAML frontmatter and knowledge graph.
*   Final line (required): Reflect on the task at hand and determine whether a rule found in .roo/rules/ directory applies to the task- if so, add the ToDo list steps from that rule to your current active ToDo list before continuing

Rule: [`02_Unified_Governance_Framework.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/02_Unified_Governance_Framework.md:1)

*   Applicability criteria:
    *   Applies when content placement, directory rules, or policy constraints may be violated.
    *   Trigger: authoring content, moving files, granting access, or decision execution.
*   ToDo:
    1.  Evaluate content type and intended target directory using the decision tree in this rule.
    2.  Enforce directory placement rules (ai-prompts/, scripts/, ai-generated-reports/, docs/knowledge-corpus/) and correct if needed.
    3.  If content includes code references, ensure Code Validation Report exists (invoke Rule 01 steps).
    4.  Run governance enforcement script [`scripts/validate_unified_governance_compliance.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/validate_unified_governance_compliance.py:1) when automated governance check required.
    5.  Update governance metadata and, if blocked, notify stakeholders per escalation procedures.
    6.  Record remediation actions and update the unified governance todo list.
*   Final line (required): Reflect on the task at hand and determine whether a rule found in .roo/rules/ directory applies to the task- if so, add the ToDo list steps from that rule to your current active ToDo list before continuing

Rule: [`03_FIBO_Integration_Specification.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/03_FIBO_Integration_Specification.md:1)

*   Applicability criteria:
    *   Applies when content relates to financial classification, contract types, revenue codes, or when enriching documents with FIBO mappings.
    *   Trigger: processing financial contracts, revenue calculations, or annotating metadata with fibo\_classification.
*   ToDo:
    1.  Identify financial entities and candidate mappings using the autonomous classification pipeline.
    2.  Run FIBO validation script [`scripts/validate_fibo_integration_compliance.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/validate_fibo_integration_compliance.py:1) (mandatory for classification changes).
    3.  Apply Towne Park domain extensions and update YAML frontmatter fibo fields.
    4.  Add classification confidence score and required evidence to discovery\_metadata.
    5.  If changes affect governance or validation, enqueue Rule 01 and Rule 02 ToDos.
    6.  Document domain-extension changes in the ontology-change log.
*   Final line (required): Reflect on the task at hand and determine whether a rule found in .roo/rules/ directory applies to the task- if so, add the ToDo list steps from that rule to your current active ToDo list before continuing

Rule: [`04_YAML_Front_matter_Standards.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/04_YAML_Front_matter_Standards.md:1)

*   Applicability criteria:
    *   Applies to any markdown in `docs/knowledge-corpus/` or when generating/updating documentation.
    *   Trigger: creating/editing docs, CI validation runs, or metadata updates.
*   ToDo:
    1.  Validate YAML frontmatter using [`scripts/validate_yaml_frontmatter.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/validate_yaml_frontmatter.py:1) locally.
    2.  If advanced enforcement required, run [`scripts/validate_yaml_frontmatter_enforcement.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/validate_yaml_frontmatter_enforcement.py:1) (mandatory in CI).
    3.  Ensure required fields and discovery/governance metadata are present and compliant.
    4.  Fix cross-reference targets and run cross\_rule integration checks (`scripts/validate_rule_framework_integration.py`).
    5.  Commit metadata corrections and, if blocked by CI, follow escalation guidance.
    6.  Add a YAML validation entry to the document todo\_list in frontmatter when applicable.
*   Final line (required): Reflect on the task at hand and determine whether a rule found in .roo/rules/ directory applies to the task- if so, add the ToDo list steps from that rule to your current active ToDo list before continuing

Rule: [`05_Source_Code_Map.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/05_Source_Code_Map.md:1)

*   Applicability criteria:
    *   Applies when locating source code for validation, searching implementation references, or maintaining component indices.
    *   Trigger: code validation, discovery tasks, or source-code mapping updates.
*   ToDo:
    1.  Use the Source Code Map to locate candidate files and components for validation.
    2.  Confirm file existence and path normalization before invoking validation scripts.
    3.  Update the Source Code Map when new components are discovered or moved.
    4.  For validation tasks, attach source\_file mappings to validation metadata and call Rule 01 scripts.
    5.  Run periodic maintenance scans (weekly) to reconcile map with repository contents.
    6.  Log mapping changes to knowledge graph and record validation status.
*   Final line (required): Reflect on the task at hand and determine whether a rule found in .roo/rules/ directory applies to the task- if so, add the ToDo list steps from that rule to your current active ToDo list before continuing

Rule: [`06_Enterprise_Knowledge_Graph_System_Complete.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/06_Enterprise_Knowledge_Graph_System_Complete.md:1)

*   Applicability criteria:
    *   Applies when discovery, knowledge-graph updates, navigation, or entity/relationship modeling is part of the task.
    *   Trigger: discovery runs, graph updates, navigation changes, or cross-system mapping.
*   ToDo:
    1.  Identify discovery scope and register sources (include code, docs, ontology).
    2.  Execute discovery scan and entity extraction; assign confidence scores.
    3.  Validate relationships via code validation (invoke Rule 01) where implementations exist.
    4.  Update knowledge graph entities and navigation metadata; refresh caches as required.
    5.  If user-facing navigation changes are required, follow the phased rollout strategy.
    6.  Add graph maintenance entry to enforcement tracking and monitoring dashboards.
*   Final line (required): Reflect on the task at hand and determine whether a rule found in .roo/rules/ directory applies to the task- if so, add the ToDo list steps from that rule to your current active ToDo list before continuing

2.  Canonical ownership mapping and overlap reconciliation (summary)

*   Ownership mapping (canonical owner = file responsible for primary behavior):
    *   Governance & directory placement -> [`02_Unified_Governance_Framework.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/02_Unified_Governance_Framework.md:1)
    *   YAML metadata & validation -> [`04_YAML_Front_matter_Standards.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/04_YAML_Front_matter_Standards.md:1)
    *   Code validation & enforcement -> [`01_Comprehensive_Code_Validation_Framework.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/01_Comprehensive_Code_Validation_FRAMEWORK.md:1)
    *   FIBO classification -> [`03_FIBO_Integration_Specification.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/03_FIBO_Integration_Specification.md:1)
    *   Source-code indexing -> [`05_Source_Code_Map.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/05_Source_Code_Map.md:1)
    *   Knowledge graph & navigation -> [`06_Enterprise_Knowledge_Graph_System_Complete.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/06_Enterprise_Knowledge_Graph_System_Complete.md:1)
    *   Foundational policy and precedence -> [`00_Master_AI_Protocol_and_Foundational_Principles.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/00_Master_AI_PROTOCOL_and_Foundational_Principles.md:1)
*   Overlap reconciliation rules:
    1.  Move directory-specific enforcement text to Rule 02 (governance) and keep usage examples in others.
    2.  YAML field validation logic remains in Rule 04; Rule 01,03,06 must reference Rule 04 for YAML checks.
    3.  Scripts are enumerated centrally under Rule 01 (code validation), Rule 04 (yaml enforcement), Rule 02 (governance enforcement), Rule 03 (fibo validation), and Rule 00 for master-level checks.
    4.  Knowledge-graph operational steps stay in Rule 06; any validation that depends on source code must call Rule 01 scripts (single source of truth).
    5.  Implement canonical "call patterns": policy check (00) -> governance placement (02) -> metadata validation (04) -> source mapping (05) -> code validation (01) -> graph update/navigation (06) -> fibo enrichment (03) as applicable.

3.  Mandatory scripts and integration into ToDos (canonical list)

*   Master enforcement: [`scripts/validate_master_ai_protocol_compliance.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/validate_master_ai_protocol_compliance.py:1)
*   Code enforcement: [`scripts/enforce_code_validation.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/enforce_code_validation.py:1)
*   Enhanced code validation: [`scripts/enhanced_code_validation.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/enhanced_code_validation.py:1)
*   YAML enforcement: [`scripts/validate_yaml_frontmatter_enforcement.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/validate_yaml_frontmatter_enforcement.py:1)
*   FIBO validation: [`scripts/validate_fibo_integration_compliance.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/validate_fibo_integration_compliance.py:1)
*   Unified governance validation: [`scripts/validate_unified_governance_compliance.py`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/scripts/validate_unified_governance_compliance.py:1)

Integration rule:

*   Any ToDo that performs validating, publishing, or finalizing must include the appropriate script-run step as "mandatory" and must mark the step as blocking until success.

4.  Applicability matrix (quick evaluation)

*   If task touches docs/knowledge-corpus -> run Rule 04, Rule 02 (directory), and if code refs exist, Rule 01.
*   If task touches source code -> run Rule 05 (locate), Rule 01 (validate), and update Rule 06 (graph).
*   If task changes financial classification -> run Rule 03 then propagate to Rule 04 and Rule 06.
*   If task is policy/governance decision -> start with Rule 00 then Rule 02.
*   Use precedence: Rule 00 > Rule 02 > Rule 04 > Rule 01 > Rule 03 > Rule 05 > Rule 06 for conflicts.

5.  Reorganization plan (proposed edits)

*   Create canonical "scripts index" section under [`.roo/rules/_scripts_index.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/_scripts_index.md:1) and reference from each rule.
*   Trim duplicate enforcement text in Rule 00, 02, 04 and replace with concise cross-references.
*   Move YAML field-level rules exclusively to Rule 04; add an API-compatible validation contract (`validation_contract` section) so other rules integrate programmatically.
*   Add small "applicability" frontmatter block to each rule file with explicit triggers and canonical owner tag (e.g., `owner: rule-02-governance`).

6.  Suggestions to improve mission success (concise)

*   Implement the `_scripts_index` file and expose a small CLI that runs the canonical pipeline for a document (governance -> yaml -> code -> fibo -> graph).
*   Add pre-commit hooks to enforce Rule 02 and Rule 04 locally and provide clear error messages linking to the relevant ToDo.
*   Expose a single "evaluate task" checklist script that outputs which rule ToDos apply (use the applicability matrix).
*   Maintain the modular todo lists in machine-readable YAML inside each rule frontmatter to enable automation.

6.a) Assistant suggested improvements for YAML frontmatter validation (added 2025-08-13)

*   Improve frontmatter extraction:
    *   Allow and ignore leading blank lines and a UTF-8 BOM before the opening '---'.
    *   Accept both '---' and '--- ' variants and handle frontmatter that begins after a single leading comment block.
*   Improve error messages and type reporting:
    *   Normalize expected-type formatting in messages (e.g., "int|float" rather than raw tuple).
    *   When expected\_type is a tuple, list acceptable types in human-readable form.
*   Make enumerated validations case-insensitive where appropriate or document case rules.
*   Surface non-dict YAML frontmatter more clearly (e.g., "frontmatter parsed as <type>; expected mapping/dictionary").
*   Add unit tests and fixtures:
    *   Tests for missing opening/closing delimiter, non-dict frontmatter, malformed dates, tuple-type expected fields, confidence score bounds, and enumerated value variants.
*   Operational suggestions:
    *   Add an optional CLI flag to validator to auto-fix trivial issues (normalize date fields, convert single tag string to list) with explicit dry-run mode.
    *   Expose a machine-readable validation contract (validation\_contract) in Rule 04 so other scripts can call the validator programmatically.
    *   Add clear guidance in Rule 04 about fibo\_classification being required by policy and provide a migration guide for legacy docs.
    *   Add pre-commit hook example script and CI workflow templates for frontmatter enforcement.

7.  Implementation progress (actions performed by the assistant on 2025-08-13)

*   Added the "Assistant suggested improvements" subsection above (this content).
*   Created a minimal enforcement script stub to enable CI-style enforcement runs:
    *   File created: `scripts/validate_yaml_frontmatter_enforcement.py` (see repository).
    *   Behavior: invokes the canonical validator over a path, prints the text report, and exits non-zero on validation errors (suitable for CI).
*   Plan updates:
    *   Item #4 (Begin implementing YAML enforcement script) — status: In Progress (enforcement script stub created).
    *   Item #12 (Maintain modular todo lists inside rule frontmatter) — status: In Progress (added Assistant suggestions to file and noted machine-readable todo recommendation).
    *   CI workflows, pre-commit hooks, unit tests, and additional validator hardening remain Planned / Pending.
*   Next steps (recommended and planned):
    1.  Harden validator per suggestions (frontmatter extraction, type-message formatting, case-handling) — Planned.
    2.  Add unit tests and CI job to run them — Planned.
    3.  Add pre-commit hook example and incorporate into repository — Planned.
    4.  Implement `validation_contract` in Rule 04 frontmatter for programmatic integration — Planned.
    5.  If accepted, run the new enforcement script against `docs/knowledge-corpus/` and capture the first validation report for triage — Planned.

Deliverable file references:

*   This deliverable saved to [`.roo/rules/modular-todo-deliverables.md`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/.roo/rules/modular-todo-deliverables.md:1)
*   Enforcement script stub: `scripts/validate_yaml_frontmatter_enforcement.py` (created)
*   Use the canonical scripts in [`scripts/`](vscode-webview://1us0rfbqch1cj3hoduf5aee8i61lh2vlhp651sbqe39ser28g9kb/index.html?id=b43a4c0a-207b-4463-9e26-480233bdc557&parentId=1&origin=0008a3df-c12a-4a54-b2b4-66a4d511d2e2&swVersion=4&extensionId=RooVeterinaryInc.roo-cline&platform=electron&vscode-resource-base-authority=vscode-resource.vscode-cdn.net&parentOrigin=vscode-file%3A%2F%2Fvscode-app&purpose=webviewView) as indicated above.   
---
