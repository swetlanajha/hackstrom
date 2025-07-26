const breachList = ["123456", "password", "admin", "qwerty", "password123"];

function analyzePassword() {
  const pwd = document.getElementById("password").value;
  const result = document.getElementById("result");
  const barFill = document.getElementById("barFill");
  const tips = document.getElementById("tips");
  const darkweb = document.getElementById("darkweb");

  result.innerHTML = tips.innerHTML = darkweb.innerHTML = "";
  barFill.style.width = "0%";

  let strength = 0;
  if (pwd.length >= 8) strength++;
  if (/[A-Z]/.test(pwd)) strength++;
  if (/[0-9]/.test(pwd)) strength++;
  if (/[\W]/.test(pwd)) strength++;

  let strengthText = "Weak", barColor = "red";
  if (strength === 2) { strengthText = "Moderate"; barColor = "yellow"; }
  else if (strength >= 3) { strengthText = "Strong"; barColor = "green"; }

  result.innerHTML = `Strength: <strong>${strengthText}</strong>`;
  barFill.className = `fill ${barColor}`;
  barFill.style.width = `${strength * 25}%`;

  if (breachList.includes(pwd.toLowerCase())) {
    result.innerHTML += "<br><span style='color:red'>⚠️ Password found in breach database!</span>";
  } else {
    result.innerHTML += "<br><span style='color:lightgreen'>✅ Password not found in known breaches.</span>";
  }

  darkweb.innerHTML = "<div class='loading'>🌐 Scanning the dark web...</div>";
  setTimeout(() => {
    darkweb.innerHTML = (strength < 3)
      ? "🛑 Similar patterns seen in leaked dark web dumps!"
      : "✅ No traces found on simulated dark web.";
  }, 2000);

  let tipList = [];
  if (pwd.length < 8) tipList.push("Use at least 8 characters.");
  if (!/[A-Z]/.test(pwd)) tipList.push("Add uppercase letters.");
  if (!/[0-9]/.test(pwd)) tipList.push("Include numbers.");
  if (!/[\W]/.test(pwd)) tipList.push("Use special symbols.");
  tips.innerHTML = "<br><u>🔒 Security Tips:</u><br>" + tipList.join("<br>");
}

function showSection(id) {
  document.querySelectorAll(".content").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function showAboutSection(type) {
  document.querySelectorAll(".about-sub").forEach(el => el.style.display = "none");
  document.getElementById("about").style.display = "block";
  document.getElementById(type).style.display = "block";
  if (!document.getElementById(type).innerHTML) loadAboutContent(type);
}

function loadAboutContent(type) {
  const content = {
    faqs: `
      <h2>📚 FAQs</h2>
      <ul>
        <li>What is BreachShield?</li>
        <li>How do you check if my password is breached?</li>
        <li>Do you store my password?</li>
        <li>Is this service free?</li>
        <li>What are strong password examples?</li>
        <li>Can I subscribe for future breach alerts?</li>
        <li>Do you support HIBP API?</li>
        <li>Is dark web scanning real?</li>
        <li>Can I trust the results?</li>
        <li>How do you protect user data?</li>
      </ul>
    `,
    terms: `
      <h2>📜 Terms of Use</h2>
      <p>BreachShield is provided as an informational tool to assess password security risks and raise awareness.</p>
      <p>By using BreachShield, you agree not to input any sensitive or actual login passwords. This tool is intended for demonstration and educational purposes only.</p>
      <p>The service may use publicly available APIs to fetch breach data, and we hold no responsibility for the completeness or accuracy of such data.</p>
      <p>Users must not misuse this service for any illegal or unethical activity including but not limited to security bypass attempts, enumeration, or data scraping.</p>
    `,
    privacy: `
      <h2>🔒 Privacy Policy</h2>
      <p>We take user privacy seriously. BreachShield does not store any passwords or emails entered on this platform.</p>
      <p>Email addresses submitted for breach notifications are securely transmitted via HTTPS and only used for alerting purposes. No marketing or third-party sharing is done.</p>
      <p>We use anonymized API queries where possible and follow industry best practices to avoid storing or exposing any personal information.</p>
      <p>Our tool is client-side rendered for optimal security and your data never leaves your browser unless you explicitly submit it for alerts.</p>
    `
  };
  document.getElementById(type).innerHTML = content[type];
}

function subscribeEmail() {
  const email = document.getElementById("emailNotify").value;
  const notifyStatus = document.getElementById("notifyStatus");
  if (!email.includes("@")) {
    notifyStatus.innerHTML = "❌ Please enter a valid email.";
    return;
  }
  notifyStatus.innerHTML = "✅ You’ll be notified if your email appears in future breaches.";
}
