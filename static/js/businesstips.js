const bizTips = [
    "Track your most sold products — use this to guide restocking and promotions.",
    "Separate personal money from business money — always log your business-only sales.",
    "Keep overheads low — reduce electricity use, and track airtime/data as an expense.",
    "Reinvest profits monthly — buy more stock or expand your product variety.",
    "Offer combos or specials — increase sales while clearing slow-moving stock.",
    "Record supplier prices — this helps compare and switch to cheaper options.",
    "Track expenses that don't directly bring sales (like rent or airtime) — these eat into profits.",
    "Train a helper if you're busy — especially if you're expanding or have regular customers."
];

let bizIndex = 0;

function rotateBizTip() {
  document.getElementById("business-tip").textContent = bizTips[bizIndex];
  bizIndex = (bizIndex + 1) % bizTips.length;
}

document.addEventListener("DOMContentLoaded", () => {
  rotateBizTip();
  setInterval(rotateBizTip, 8000);
});