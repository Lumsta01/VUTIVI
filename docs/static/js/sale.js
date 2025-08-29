const STORAGE_KEY = "vutivi_transactions";

/* ---- calculator hook to auto‑fill ---- */
document.addEventListener("DOMContentLoaded", () => {
  const orig = window.calculate;
  window.calculate = function () {
    orig();
    const res = document.getElementById("display").value.trim();
    if (res && res !== "Error") {
      document.getElementById("amount").value = res;
    }
  };
  renderList();
});

/* ---- localStorage helpers ---- */
function getTx() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
function saveTx(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

/* ---- save button ---- */
function logTransaction() {
  const amtStr = document.getElementById("amount").value.trim();
  const desc = document.getElementById("description").value.trim();
  if (!amtStr || isNaN(amtStr)) return alert("Enter or calculate amount");
  if (!desc) return alert("Add description");

  const data = getTx();
  data.push({ id: Date.now(), amount: parseFloat(amtStr), description: desc, date: new Date().toISOString() });
  saveTx(data);

  // reset UI
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("display").value = "";
  expression = ""; displayExpression = "";

  renderList();
  alert("Sale saved");
}

/* ---- render recent list ---- */
function renderList() {
  const list = document.getElementById("tx-list");
  if (!list) return;
  list.innerHTML = "";
  getTx().slice(-5).reverse().forEach(tx => {
    const li = document.createElement("li");
    li.textContent = `${new Date(tx.date).toLocaleString()} – ${tx.description}: R${tx.amount.toFixed(2)}`;
    list.appendChild(li);
  });
}