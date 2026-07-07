# 📑 Smart Task Manager — Full-Stack Security Lab

A production-grade, multi-theme full-stack task management single-page application (SPA) designed with a strict defensive security posture. This application isolates tenant data contexts, utilizes a modular Service-Controller backend architecture, and implements enterprise-level database protections against common web vulnerabilities.

---

## 🛠️ Tech Stack

* **Frontend:** Semantic HTML5, Dynamic CSS3 (Custom responsive styling custom properties), Asynchronous Vanilla JavaScript (DOM/Fetch API)
* **Backend:** Node.js, Express.js REST routing framework
* **Database Layer:** Oracle Database Express Edition (XE) via the parameterized `node-oracledb` driver
* **Cryptography & Session Security:** `bcrypt` credential salting, `jsonwebtoken` (JWT) state verification, `express-rate-limit` network throttling
* **DevOps Automation:** GitHub Actions (Ubuntu container workspace), ESLint syntax enforcement, Automated API/Vulnerability simulation suites

---

## 📐 System Architecture

The application implements a decoupled, stateless full-stack architecture:
* **Presentation Tier:** A single-page application shell that manages view mutations client-side. It communicates exclusively via asynchronous JSON payloads with the API gateway, eliminating page-reload latency.
* **Application Services Tier:** A modular Express middleware engine that handles route orchestration, global token extraction, credential verification, and centralized database exception parsing.
* **Relational Persistence Tier:** An identity-aware Oracle DB instance enforcing relational foreign keys with cascade deletions, domain-specific string check constraints, and performance-optimized index tables.

---

## 🛡️ Core Security Implementations

* **SQL Injection (SQLi) Defense:** All runtime query expressions strictly ban string concatenation or variable interpolation. The application relies entirely on Oracle positional bind parameters, forcing user inputs to be treated purely as literal data values.
* **Cryptographic Identity Salting:** Plaintext user passwords are salted with unique computational keys and processed through a high-work-factor `bcrypt` function prior to database persistence.
* **Zero-Trust Route Guarding:** Secure resource channels require an authentic JSON Web Token passed within the HTTP transaction headers. Requests are evaluated via an interception hook that drops unauthorized connections instantly with an HTTP `401` block.
* **Broken Object Level Authorization (BOLA) Protection:** The server programmatically extracts the user context ID from the cryptographically sealed JWT payload. Every data retrieval, mutation, or purge sequence explicitly binds this tenant context to the database transaction loop, ensuring users can never interact with tasks belonging to another account.

---

## 🌿 Git Branching Strategy

The project strictly follows an industry-standard source control model to enforce workflow and code quality stability:
* **`main` (Production):** The clean, deployable production assembly of the platform. Direct pushes or unverified commits to this branch are strictly prohibited.
* **`dev` (Integration):** The primary testing branch where various core operations and user features are integrated and verified.
* **`feature/*` (Development):** Ephemeral branches created to write specific functional elements or isolate bug resolution sprints.
* **Integration Rule:** Code moves from `dev` into `main` exclusively through formal Pull Requests, and only after the automated remote workflow passes all linting, building, and security simulation criteria.

---

## 🚀 Continuous Integration (CI) Pipeline Stages

Every branch deployment and Pull Request triggers an automated remote build sequence managed inside a headless `ubuntu-latest` container via GitHub Actions:
1. **Repository Checkout:** Clones the code tree into the execution pipeline instance.
2. **Runtime Initialization:** Dictates and instantiates a standard Node.js `v20` application environment.
3. **Dependency Locking:** Installs explicit packages based on the project's `package-lock.json` footprint to prevent package-drift drift issues.
4. **Code Quality Linting:** Runs automated syntax checking scripts to check for formatting errors and unhandled variable states.
5. **Vulnerability Attack Simulation:** Triggers an isolated testing suite that issues unauthorized API routing requests and malicious SQL injection payloads to verify the backend's protective middleware configurations.
6. **Application Compile:** Builds the production package matrix to verify stability before final deployment authorization.

---

## 💻 Local Setup & Execution Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (v20.x or higher)
* Oracle Database Instance (Local XE installation or cloud connection)
* [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client.html) configured on your system environment paths

### 1. Clone the Codebase
```bash
git clone [https://github.com/vexenn/login-security-lab.git](https://github.com/vexenn/login-security-lab.git)
cd login-security-lab
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Establish Local Environment Properties
Create a file named `.env` in the root folder of the project. Define your local environment and database connection coordinates as shown below:
```env
PORT=5000
JWT_SECRET=your_cryptographic_server_secret_key_string
DB_USER=your_oracle_database_username
DB_PASSWORD=your_oracle_database_secure_password
DB_CONNECT_STRING=localhost:1521/XEPDB1
```
> ⚠️ **Security Warning:** The `.env` file contains sensitive infrastructure secrets and database access passwords. It is explicitly configured inside your `.gitignore` profile and must **never** be staged or committed to your public repository history.

### 4. Initialize the Application Server
```bash
npm start
```
Upon a successful connection to the Oracle database cluster, the terminal log will display `Server running on port 5000`. You can now open `index.html` in your web browser to interact with your secure system dashboard!