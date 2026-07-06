const toColor = (color, text) => {
  const codes = { green: "\x1b[32m", red: "\x1b[31m", yellow: "\x1b[33m", reset: "\x1b[0m" };
  return `${codes[color]}${text}${codes.reset}`;
};

async function runSecurityTests() {
  console.log(toColor("yellow", "\n=== STARTING AUTOMATED SECURITY TESTS ===\n"));

  // ==========================================
  // TEST 1: SQL INJECTION (SQLi) ATTACK
  // ==========================================
  console.log("Test 1: Simulating SQL Injection payload...");
  try {
    const sqliResponse = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "' OR '1'='1",
        password: "anyPassword"
      })
    });
    
    const sqliData = await sqliResponse.json();
    
    if (sqliResponse.status === 401 && sqliData.error === "Invalid credentials") {
      console.log(toColor("green", "[PASSED] -> SQL Injection blocked successfully. Oracle treated payload as a literal string."));
    } else {
      console.log(toColor("red", "[FAILED] -> System vulnerability detected or unexpected response behavior."));
    }
  } catch (err) {
    console.log(toColor("red", `[ERROR] -> Could not connect to server: ${err.message}`));
  }

  console.log("\n--------------------------------------------------\n");

  // ==========================================
  // TEST 2: BRUTE FORCE & RATE LIMITING ATTACK
  // ==========================================
  console.log("Test 2: Simulating Brute-Force attack (Sending 6 rapid login requests)...");
  
  for (let i = 1; i <= 6; i++) {
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@example.com", password: "wrongpassword" })
      });

      const data = await response.json();
      
      if (response.status === 429) {
        console.log(toColor("green", `[PASSED] -> Request #${i}: Blocked by Rate Limiter! Status 429 received.`));
        console.log(toColor("cyan", `            Server Message: "${data.error || data.message}"`));
        break; // Successfully triggered defender roadblock
      } else {
        console.log(`Request #${i}: Handled by login logic (Status ${response.status})`);
      }
    } catch (err) {
      console.log(toColor("red", `[ERROR] -> Request #${i} failed connection.`));
    }
  }

  console.log(toColor("yellow", "\n=== SECURITY EVALUATION COMPLETE ===\n"));
}

runSecurityTests();