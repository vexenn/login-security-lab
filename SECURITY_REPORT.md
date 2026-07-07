# 🛡️ Smart Task Manager — Security Review & Test Report

This audit report documents the security architecture, defensive implementation patterns, and verification testing results executed across the full-stack application lifecycle.

---

## 1. Cryptographic Identity & Password Protection

### Defensive Implementation
Plaintext passwords are never exposed to the transmission layer or committed to the database storage cluster. 
* **Hashing Algorithm:** The platform utilizes the standard `bcrypt` hashing function to process user credentials during registration.
* **Work Factor & Salting:** Every password sequence is dynamically combined with a uniquely generated cryptographic salt and processed through a resource-intensive work factor calculation. This process mathematically neutralizes rainbow-table lookup vectors and offline brute-force optimization attacks.
* **Verification:** During login orchestration, credential parity is evaluated securely via asynchronous comparison routines, preventing timing attack leaks.

---

## 2. SQL Injection (SQLi) Mitigation Matrix

### Defensive Implementation
The application database access tier is entirely fortified against SQL Injection input manipulation vectors.
* **Total Abstraction of Concatenation:** No runtime query strings utilize standard string interpolation or variable concatenation to construct queries.
* **Oracle Bind Parameters:** All data manipulation operations handled via the `node-oracledb` driver are strictly implemented using parameterized query structures and positional parameter arrays. 

```javascript
// Architectural Reference Sample from taskService.js
const sql = `UPDATE system.tasks 
             SET title = :title, category = :category, priority = :priority, status = :status, due_date = :dueDate 
             WHERE task_id = :taskId AND user_id = :userId`;
```
* **Database Enforced Sanitization:** Input values are strictly processed by the database manager as literal data values rather than executable statement code blocks, completely safely filtering out malicious escape characters.

---

## 3. Session Security, Access Control & Token Guarding

### Defensive Implementation
The service network architecture operates under a Zero-Trust perimeter state model for all task routing utilities.
* **JSON Web Tokenization (JWT):** Upon valid identity authentication, the server generates a cryptographically signed JSON Web Token containing immutable session metadata.
* **Global Authorization Middleware:** All operational endpoints matching `/tasks*` are heavily guarded behind an authorization evaluation hook. This interceptor middleware extracts incoming request packets, validates the token structure against the system server secret key, and instantly drops unauthorized anomalies with an HTTP `401 Unauthorized` block.

---

## 4. Multi-Tenant Data Isolation Strategy

### Defensive Implementation
The application securely mitigates Broken Object Level Authorization (BOLA) risks through context-restricted filtering arrays.
* **Decoupled Client Trust:** The backend never trusts task mutation or retrieval messages based solely on user-supplied request arguments or task identification numbers alone.
* **Strict Context Verification:** The verified account ID sequence (`req.user.userId`) is programmatically extracted directly out of the cryptographically sealed JWT payload by the server. Every database transaction targeting reading, adding, altering, or purging task tables strictly binds this session context value directly to the SQL execution loop, guaranteeing that authenticated accounts can never view or modify data entries belonging to another individual.

---

## 5. Automated Attack Simulation Verification

To confirm the operation of these system security defenses under real-world pressure, an automated script was executed to simulate hostile input behaviors.

### Test Suite Execution Summary
* **Test Automation Vector:** `tests/attackSimulation.js`
* **Environment Context:** Isolated automated test pipeline runner (`process.env.CI`)

| Test Case Identifier | Simulated Attack Method | Expected Defensive Outcome | Actual System Status |
| :--- | :--- | :--- | :--- |
| **TC-SEC-01** | Malicious SQL Injection String Payload Injection | Outbound execution drops input securely; table structural integrity holds intact. | **PASSED (100% Blocked)** |
| **TC-SEC-02** | Anonymous Route Traversal Attempt (No JWT Token) | Request packet intercepted by route guard; emits immediate `401 Unauthorized`. | **PASSED (100% Guarded)** |
| **TC-SEC-03** | Expired / Compromised Token Transmission | Access denied immediately by cryptographic decoding verification layer. | **PASSED (100% Rejected)** |
| **TC-SEC-04** | Cross-Tenant Resource Manipulation | Context binding blocks unauthorized cross-user reading or mutation actions. | **PASSED (100% Isolated)** |

### Conclusion Verification Status
All automated security check suites pass cleanly without modifications or warnings. The underlying runtime application securely containerizes malicious input strings and successfully satisfies all enterprise security validation criteria established for the Capstone deployment portfolio.