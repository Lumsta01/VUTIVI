/* ---------- Stock logger ---------- */

const STOCK_KEY = "vutivi_stock";

/* on page load */
document.addEventListener("DOMContentLoaded", () => {
  hookAutoTotal(); // live total‑cost calculator
  renderStockList();
});

/* helpers -------------------------------------------------- */
function getStock() {
  return JSON.parse(localStorage.getItem(STOCK_KEY) || "[]");
}
function saveStock(data) {
  localStorage.setItem(STOCK_KEY, JSON.stringify(data));
}

/* live “Total Cost” calculator */
function hookAutoTotal() {
  const qtyEl   = document.getElementById("quantity");
  const costEl  = document.getElementById("cost/unit");   // uses the id from your markup
  const totalEl = document.getElementById("total-cost");

  function calc() {
    const q = parseFloat(qtyEl.value);
    const c = parseFloat(costEl.value);
    totalEl.value = !isNaN(q) && !isNaN(c) ? (q * c).toFixed(2) : "";
  }

  qtyEl.addEventListener("input", calc);
  costEl.addEventListener("input", calc);
}

/* main action -------------------------------------------------- */
function updateStock() {
  const itemName = document.getElementById("item-name").value.trim();
  const qtyStr   = document.getElementById("quantity").value.trim();
  const costStr  = document.getElementById("cost/unit").value.trim();
  const supplier = document.getElementById("amount").value.trim(); // optional (your field id)

  /* basic validation */
  if (!itemName)              return alert("Enter the item name");
  if (!qtyStr || isNaN(qtyStr))   return alert("Enter a valid quantity");
  if (!costStr || isNaN(costStr)) return alert("Enter a valid cost per unit");

  const quantity   = parseFloat(qtyStr);
  const costPer    = parseFloat(costStr);
  const totalCost  = quantity * costPer;

  /* save */
  const stock = getStock();
  stock.push({
    id: Date.now(),
    itemName,
    quantity,
    costPer,
    totalCost,
    supplier,
    date: new Date().toISOString()
  });
  saveStock(stock);
  renderStockList();

  /* reset form */
  document.getElementById("item-name").value = "";
  document.getElementById("quantity").value   = "";
  document.getElementById("cost/unit").value  = "";
  document.getElementById("total-cost").value = "";
  document.getElementById("amount").value     = "";

  alert("Stock updated");
}

/* recent‑stock sidebar --------------------------------------- */
function renderStockList() {
  const list = document.getElementById("stock-list");
  if (!list) return;

  list.innerHTML = "";
  getStock()
    .slice(-5)             // last five entries
    .reverse()             // newest first
    .forEach(s => {
      const li = document.createElement("li");
      li.textContent =
        `${new Date(s.date).toLocaleDateString()} – `
        + `${s.itemName} • `
        + `${s.quantity} @ R${s.costPer.toFixed(2)} = `
        + `R${s.totalCost.toFixed(2)}`
        + (s.supplier ? ` (Supplier: ${s.supplier})` : "");
      list.appendChild(li);
    });
}
