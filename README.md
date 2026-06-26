# Secure Authentication Portal & Security Lab

A production-grade, full-stack authentication system designed with a defensive-security mindset. This project isolates environment configurations, abstracts the data layer using a modular Service-Controller architecture, and implements robust security counter-measures against common web vulnerabilities.

## 🛡️ Security Implementations
* **SQL Injection (SQLi) Defense:** Utilizes Oracle bind parameters to ensure user inputs are treated strictly as literal data, completely neutralizing malicious query alterations.
* **Brute-Force & DoS Mitigation:** Implements high-velocity request throttling via middleware to drop automated credential-stuffing scripts.
* **Cryptographic Data Protection:** Leverages one-way cryptographic salting and hashing to securely isolate raw credentials in storage.
* **Secure Session Management:** Issues cryptographically signed JSON Web Tokens (JWT) for secure, stateless client-side session handling.
* **Cross-Site Scripting (XSS) Prevention:** Enforces strict DOM data-rendering layers on the frontend to treat server responses purely as text blocks.
* **Continuous Integration (CI):** Features automated GitHub Actions workflows to run syntax validation pipelines on every branch deployment.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Custom responsive layout)
* **Backend:** Node.js, Express.js
* **Database:** Oracle Database Enterprise Edition (via node-oracledb)
* **Authentication & Defense:** bcrypt, jsonwebtoken, express-rate-limit
* **DevOps/Testing:** GitHub Actions (YAML), Automated Request Fetch Simulation Suite