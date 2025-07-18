_Scrum Team • Financial Software for [Towne-Park]_  
Version 1.0 • Last Updated: 2025-07-18  

---

## 1. Purpose  
Provide a clear, shared checklist to ensure every Product Backlog item (PBI) or User Story is truly “Done” and deployable—high quality, fully tested, documented, and reviewed.

## 2. Scope  
Applies to all PBIs, Bugs, and Technical Tasks in the sprint.

## 3. DoD Checklist  
Each User Story (or PBI) must meet **all** of the following before it can be marked Done:

| Category        | Criteria                                                                                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Functional      | • All Acceptance Criteria implemented <br> • Developer has manually validated AC in **Develop** (integration) environment                                  |
| Code Quality    | • Code compiles with zero errors<br> • Coding standards & lint rules passed                                                                                |
| Automated Tests | • Unit tests written & passing (≥ 80% coverage) <br> • API/Integration tests updated & passing                                                             |
| Peer Review     | • Feature is demo'ed to ≥ 1 peer <br>• Pull Request opened <br> • ≥ 1 peer review approval <br> • No unresolved comments                                   |
| CI/CD Pipeline  | • Build artifact created successfully <br> • All pipeline stages green (lint, build, test)                                                                 |
| Documentation   | • Internal-facing docs created (AI generated markdown file)                                                                                                |
| Configuration   | • DB migrations scripted & tested (if applicable)                                                                                                          |
| Security & Perf | • Performance benchmarks met (where applicable)                                                                                                            |
| QA Test Plan    | • The QA Test task on the user story with manual testing steps defined from Sprint Planning has been executed with tester comment and any open bugs linked |


> **Nota Bene:**  
> - A User Story is **not** Done until the developer has personally executed its Acceptance Criteria in the **Develop** (integration) environment and confirmed all behavior end-to-end.  
> - If manual steps remain, surface them as **“Review Required”** tasks on the Story.

---

## 4. Workflow Enforcement  
1. **Before PR**: Developer tests AC in individual environment, updates Task(s)
2. **In PR**: Add `DoD: ✔` checklist to PR description; reviewers tick off each item.  
3. **After Merge**: CI/CD must greenlight build → deploy to Dev → smoke test.  
4. **Sprint Review**: Only Stories meeting the above may be demoed and moved to Done.

---

## 5. Exceptions & Escalation  
- **Blocked Criteria**: If a criterion cannot be met (e.g. external outage), tag `BLOCKED` and notify Scrum Master immediately.  
- **Deferred Items**: Minor docs or non-blocking perf tuning can be backloged as follow-up “Tech Debt” Stories, but must be surfaced before Sprint Close.

---

