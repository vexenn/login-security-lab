# 🤖 Capstone Project — Prompt Engineering Log

This log chronicles the 10 core generative AI prompt structures and engineering interventions utilized to accelerate development, diagnose environment anomalies, and fortify the security architecture of the Smart Task Manager platform.

---

### 🗂️ Prompt Matrix Index

| Prompt ID | Lifecycle Phase | Core Technical Objective | Defensive / Diagnostic Focus |
| :--- | :--- | :--- | :--- |
| **PROMPT-01** | Requirement Analysis | Database Schema Architecture Definition | Establishing Oracle table spaces and relational integrity constraints. |
| **PROMPT-02** | Backend Engineering | Secure User Onboarding Logic | Cryptographic password hashing and salting with error validation safety handling. |
| **PROMPT-03** | Backend Engineering | Tokenization & Session Route Defenses | Engineering global JWT middleware to prevent unauthorized api traversal. |
| **PROMPT-04** | Backend Engineering | Relational Data Query Construction | Building parameterized SQL statements to abstract away SQL Injection vectors. |
| **PROMPT-05** | DevOps / Automation | Continuous Integration Pipeline Setup | Launching automated Ubuntu container actions to run linting and build checks. |
| **PROMPT-06** | DevOps / Diagnostics | Pipeline Environment Context Failure | Troubleshooting path execution errors mismatching local vs container contexts. |
| **PROMPT-07** | DevOps / Diagnostics | Git Engine Case-Sensitivity Index Defects | Overriding local indexing caches to force Linux runner case matching. |
| **PROMPT-08** | Frontend Engineering | UI Theme Variables Design Matrix | Implementing responsive vanilla CSS variables enabling user-selected styling changes. |
| **PROMPT-09** | Full-Stack Testing | Local Network Client Connection Failure | Troubleshooting browser-level connection blockages by diagnosing runtime server processes. |
| **PROMPT-10** | Full-Stack Diagnostics | Database Integrity Constraints Collision | Engineering a client-side lookup state cache to resolve ORA-01407 update blocks. |

---

### 📑 Detailed Prompt Execution History

#### PROMPT-01: Database Schema Architecture Definition
* **User Input Structure:** > *"Act as an Oracle Database Administrator. Write a clean DDL SQL script to create two tables: USERS and TASKS. The USERS table needs auto-incrementing identity keys, a unique email string, and a generous password length to hold hashes. The TASKS table must include a foreign key pointing to the user with a cascade delete rule, and strict check constraints for priority (High, Medium, Low) and status (Pending, In Progress, Completed). Add composite index optimization for rapid filtering lookups."*
* **AI Remediation & Engineering Outcome:** Generated an idempotent Oracle-compliant SQL script establishing proper schema types, foreign key referential integrity rules, and strategic indexes (`IDX_TASKS_USER_SEARCH`).

#### PROMPT-02: Secure User Onboarding Logic
* **User Input Structure:**
  > *"I am building a Node.js Express user register router. Write a service function using the node-oracledb driver that accepts a plaintext password, hashes it safely using bcrypt, and uses secure bind variables to insert the user record into an Oracle DB. Ensure it traps duplicate email constraint collisions gracefully and returns a clean error payload."*
* **AI Remediation & Engineering Outcome:** Delivered modular service layers abstracting database interactions away from route endpoints, incorporating cryptographic salting steps and tailored database exception parsing blocks.

#### PROMPT-03: Tokenization & Session Route Defenses
* **User Input Structure:**
  > *"Design a secure JWT authentication middleware file for an Express API server. It needs to read incoming request headers, look for a Bearer token, decode it using a server-side secret environment variable, and attach the user payload context metadata directly to the request object. If the token is missing, expired, or malformed, instantly terminate the request with a clean 401 response."*
* **AI Remediation & Engineering Outcome:** Built a global interceptor pattern guarding target resource routes, effectively validating authorization tokens prior to processing endpoint requests.

#### PROMPT-04: Relational Data Query Construction
* **User Input Structure:**
  > *"Write a Node.js service function to fetch and update records in an Oracle task table. To prevent any risk of SQL Injection attacks, do not use string concatenation or template literals to mix user inputs into the SQL. Show me how to correctly map JavaScript parameters to positional bind values inside the data driver array."*
* **AI Remediation & Engineering Outcome:** Implemented parameterized query execution loops across all core database entry, mutation, and purge channels, satisfying OWASP injection mitigation standards.

#### PROMPT-05: Continuous Integration Pipeline Setup
* **User Input Structure:**
  > *"Write a GitHub Actions .github/workflows/ci.yml configuration script targeting a headless Ubuntu container runner environment. The pipeline engine should execute automatically on code pushes to 'main' or 'dev' branches, establish a clean Node.js environment matrix, install locked dependencies, run code linters, and trigger an automated security attack simulation script."*
* **AI Remediation & Engineering Outcome:** Developed a robust, YAML-formatted integration flow utilizing explicit execution lifecycles and secret key context distribution arrays.

#### PROMPT-06: Pipeline Environment Context Failure
* **User Input Structure:**
  > *"My GitHub Actions automated workflow pipeline script keeps crashing on the headless container terminal runner during the test suite phase. The log output shows an error stating that the test file cannot be found at the targeted path, even though it executes completely fine on my local development laptop. Help me diagnose this environment path mismatch."*
* **AI Remediation & Engineering Outcome:** Identified structural execution variance between local Windows path testing styles and absolute Linux directory traversal structures, guiding target path realignments to the explicit tests subfolder layout.

#### PROMPT-07: Git Engine Case-Sensitivity Index Defects
* **User Input Structure:**
  > *"I modified a folder name from uppercase 'Tests' to lowercase 'tests' on my local machine to match the Linux runner paths, but my Git status is not tracking the modification, and the remote container pipeline is still failing with the same missing directory error. How do I force Git to update its local file index to handle case changes correctly for Linux?"*
* **AI Remediation & Engineering Outcome:** Diagnosed Git's internal default case-insensitive configuration limits on development machines and delivered system configuration commands (`git config core.ignorecase false`) along with targeted tracking index purges (`git rm -r --cached`) to re-align remote trees.

#### PROMPT-08: UI Theme Variables Design Matrix
* **User Input Structure:**
  > *"I want to elevate a basic HTML task page into a premium software dashboard. Write a comprehensive CSS style sheet structured entirely around custom variables (:root). Define explicit color-token mappings for multiple visual palettes: a default dark mode, a light mode, a neon cyberpunk theme, and an emerald theme. All component properties (backgrounds, borders, shadows, icons) must reference these variable tokens to allow instant skin adjustments via JavaScript runtime DOM updates."*
* **AI Remediation & Engineering Outcome:** Built a modular, highly scalable typography and theme matrix establishing modern dark/light styling modes and custom palette overrides completely divorced from rigid, hardcoded colors.

#### PROMPT-09: Local Network Client Connection Failure
* **User Input Structure:**
  > *"I am testing my single-page application dashboard locally by launching my index.html file in my web browser. However, when I fill out the registration form fields and submit it, the card flashes an error saying 'Failed to fetch'. What does this error mean from a browser network standpoint, and how do I fix the connection?"*
* **AI Remediation & Engineering Outcome:** Isolated the specific network-tier disconnect, identifying that the local backend Express server process was inactive, and provided precise troubleshooting diagnostics to verify port bindings and implement missing backend Cross-Origin Resource Sharing (`cors`) modules.

#### PROMPT-10: Database Integrity Constraints Collision
* **User Input Structure:**
  > *"My task creation form works great, but when I try to update just the status column from the dropdown menu, the backend node-oracledb driver throws a severe crash log: 'Database query execution error: Error: ORA-01407: cannot update SYSTEM.TASKS.TITLE to NULL'. My frontend update script is only transmitting the changed status text. Why is it trying to overwrite my title, and how do I fix this tracking without altering my strict backend PUT endpoints?"*
* **AI Remediation & Engineering Outcome:** Solved a structural REST payload mismatch by establishing an in-memory client-side task tracking cache (`cachedTasks`); during client dropdown updates, the application maps unchanged parent metadata attributes alongside the new status variable, transmitting a compliant full-resource packet that satisfies the database's integrity rules.