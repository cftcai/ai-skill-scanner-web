// ai-skill-scanner-web — self-hosted script (no CDN, CSP script-src 'self').
// All DOM is built with textContent / createElement, so no HTML injection is
// possible even if the sample data were ever replaced with live data.
"use strict";

function el(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text !== undefined) n.textContent = text;
  return n;
}

function showMessage(message, kind) {
  const box = document.getElementById("message-box");
  box.textContent = message;
  box.className = "msg " + (kind === "warn" ? "msg-warn" : "msg-error");
}

function hideMessage() {
  const box = document.getElementById("message-box");
  box.textContent = "";
  box.className = "msg hidden";
}

// Illustrative sample output from the canonical tests/malicious_skill.py
// fixture. This static page does not run a live scan; summary counts are
// derived from the findings so they can never drift.
const SAMPLE_FINDINGS = [
  { file: "tests/malicious_skill.py", line: 20, type: "dangerous_code_execution", severity: "high", snippet: "eval(\"__import__('os').system...\")" },
  { file: "tests/malicious_skill.py", line: 28, type: "suspicious_pattern", severity: "high", snippet: "requests.post(\"https://evil-callback...\")" },
  { file: "tests/malicious_skill.py", line: 35, type: "prompt_injection_risk", severity: "high", snippet: "Ignore all previous instructions..." },
  { file: "tests/malicious_skill.py", line: 42, type: "high_entropy_obfuscation", severity: "medium", snippet: "base64.b64encode(b\"import os...\")" },
  { file: "tests/malicious_skill.py", line: 45, type: "suspicious_pattern", severity: "high", snippet: "marshal.dumps(lambda: exec... )" }
];

function statCard(nClass, value, label) {
  const card = el("div", "stat");
  card.appendChild(el("div", "n " + nClass, String(value)));
  card.appendChild(el("div", "l", label));
  return card;
}

function renderResults(findings) {
  const high = findings.filter(f => f.severity === "high").length;
  const medlow = findings.length - high;

  const summary = document.getElementById("summary-cards");
  summary.replaceChildren(
    statCard("total", findings.length, "Total Findings"),
    statCard("high", high, "High Severity"),
    statCard("medlow", medlow, "Medium / Low")
  );

  const tbody = document.getElementById("findings-body");
  tbody.replaceChildren();
  findings.forEach(f => {
    const tr = el("tr");

    tr.appendChild(el("td", "cell-mono", `${f.file}:${f.line}`));

    const tdType = el("td");
    tdType.appendChild(el("span", "pill", f.type));
    tr.appendChild(tdType);

    const tdSev = el("td");
    tdSev.appendChild(el("span", "pill " + f.severity, f.severity));
    tr.appendChild(tdSev);

    tr.appendChild(el("td", "cell-mono snippet", f.snippet));
    tbody.appendChild(tr);
  });
}

function runScan(isDemo) {
  const results = document.getElementById("results");
  const input = document.getElementById("url-input").value.trim();
  hideMessage();

  if (!input) {
    showMessage('Click "Load Demo Fixture" to view sample output for the mock malicious skill.', "warn");
    return;
  }
  if (!isDemo && !input.includes("malicious_skill")) {
    showMessage("This static page only shows sample output for the built-in mock malicious skill. For any other repository, use the Scan URL workflow or the CLI.", "warn");
    results.classList.add("hidden");
    return;
  }

  results.classList.remove("hidden");
  results.scrollIntoView({ behavior: "smooth" });
  renderResults(SAMPLE_FINDINGS);
}

function loadDemoFixture() {
  document.getElementById("url-input").value =
    "https://github.com/cftcai/ai-skill-scanner/tree/main/tests/malicious_skill.py";
  hideMessage();
  runScan(true);
}

function clearResults() {
  document.getElementById("results").classList.add("hidden");
  document.getElementById("findings-body").replaceChildren();
  document.getElementById("summary-cards").replaceChildren();
  hideMessage();
}

async function fetchLatestVersions() {
  try {
    const [scannerRes, sigRes] = await Promise.all([
      fetch("https://api.github.com/repos/cftcai/ai-skill-scanner/commits/main"),
      fetch("https://api.github.com/repos/cftcai/ai-skill-signatures/commits/main")
    ]);
    const scanner = await scannerRes.json();
    const sig = await sigRes.json();
    const target = document.getElementById("latest-sha");
    target.replaceChildren(
      document.createTextNode("• Scanner "),
      el("span", "mono", String(scanner.sha).substring(0, 7)),
      document.createTextNode(" • Signatures "),
      el("span", "mono", String(sig.sha).substring(0, 7))
    );
  } catch (e) {
    // Rate-limited or offline: leave the field blank.
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-demo").addEventListener("click", loadDemoFixture);
  document.getElementById("btn-scan").addEventListener("click", () => runScan(false));
  document.getElementById("btn-clear").addEventListener("click", clearResults);
  fetchLatestVersions();
});
