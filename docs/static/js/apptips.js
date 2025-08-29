const tips = [
    "Use the calculator to avoid mental math errors.",
    "Log every transaction — even small ones.",
    "Differentiate between stock and expenses.",
    "Track recent transactions to avoid duplicates.",
    "Save rent, electricity as overheads — tick the checkbox.",
    "Use consistent descriptions (e.g., “cold drinks” vs “Cold drink stock”) to avoid confusion.",
    "Refresh your report daily or weekly — to spot trends and manage inventory.",
    "Update stock regularly — especially when buying in bulk or from different suppliers.",
    
];
let appIndex = 0;

function rotateAppTip() {
  document.getElementById("app-tip").textContent = tips[appIndex];
  appIndex = (appIndex + 1) % tips.length;
}

document.addEventListener("DOMContentLoaded", () => {
  rotateAppTip();
  setInterval(rotateAppTip, 8000);
});