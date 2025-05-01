// Check access
const params = new URLSearchParams(window.location.search);
const verified = params.get("verified");
const expiration = localStorage.getItem("accessExpiration");
const now = Date.now();

if (verified === "1") {
  localStorage.setItem("accessExpiration", now + 24 * 60 * 60 * 1000);
  window.location.href = "index.html";
} else if (!expiration || now > parseInt(expiration)) {
  window.location.href = "verify.html";
} else {
  document.body.style.display = "block";

  // Countdown
  const countdownEl = document.getElementById("countdown");
  function updateCountdown() {
    const remaining = parseInt(localStorage.getItem("accessExpiration")) - Date.now();
    if (remaining <= 0) {
      localStorage.removeItem("accessExpiration");
      location.reload();
    } else {
      const hrs = Math.floor(remaining / (1000 * 60 * 60));
      const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((remaining % (1000 * 60)) / 1000);
      countdownEl.textContent = `Expires in: ${hrs}h ${mins}m ${secs}s`;
    }
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();
}