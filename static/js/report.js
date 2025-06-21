/* --- storage keys --- */
const SALES_KEY    = "vutivi_transactions";
const EXP_KEY      = "vutivi_expenses";
const STOCK_KEY    = "vutivi_stock";

/* --- helper --- */
const get   = key => JSON.parse(localStorage.getItem(key) || "[]");
const money = v => "R" + v.toFixed(2);

/* --- period filter --- */
function inPeriod(date, filter) {
  const d = new Date(date), n = new Date();
  if (filter === "day")  return d.toDateString() === n.toDateString();
  if (filter === "week") { const w = new Date(n); w.setDate(n.getDate() - 7); return d >= w; }
  if (filter === "month") return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
  return true;
}

/* --- single Load --- */
function loadReport() {
  const filter = document.getElementById("filter-select").value;

  const sales   = get(SALES_KEY).filter(tx => inPeriod(tx.date, filter));
  const exp     = get(EXP_KEY).filter   (tx => inPeriod(tx.date, filter));
  const stock   = get(STOCK_KEY).filter (tx => inPeriod(tx.date, filter));

  /* totals */
  const totSales = sales.reduce((s, t) => s + t.amount, 0);
  const totExp   = exp  .reduce((s, t) => s + t.amount, 0);
  const totStock = stock.reduce((s, t) => s + t.totalCost,  0); 

  /* update boxes */
  document.getElementById("total-sales").textContent    = money(totSales);
  document.getElementById("total-expenses").textContent = money(totExp);
  document.getElementById("total-stock").textContent    = money(totStock);
  document.getElementById("net-profit").textContent     = money(totSales - totExp);

  /* render lists */
const targets = {
  "sales-list":    { data: sales,  field: "amount",    label: tx => tx.description },
  "expenses-list": { data: exp,    field: "amount",    label: tx => tx.description },
  "stock-list":    { data: stock,  field: "totalCost", label: tx => tx.itemName || tx.description || "Stock" }
};

Object.entries(targets).forEach(([id, cfg]) => {
    const tbody = document.getElementById(id);          // MUST find <tbody>
    tbody.innerHTML = "";                               // clear old rows
  
    cfg.data.slice().reverse().forEach(tx => {          // add new rows
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="p-2 border-b">${new Date(tx.date).toLocaleString()}</td>
        <td class="p-2 border-b">${cfg.label(tx)}</td>
        <td class="p-2 border-b text-right">${money(tx[cfg.field])}</td>
      `;
      tbody.appendChild(row);
    });
  });
}

/* --- startup + filter listener --- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filter-select").addEventListener("change", loadReport);
  loadReport();
});
