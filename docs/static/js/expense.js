const STORAGE_KEY = "vutivi_expenses";

document.addEventListener("DOMContentLoaded", () => {
renderList();
});

function getExpenses() {
return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveExpenses(data) {
localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function logExpense() {
const amtStr = document.getElementById("amount").value.trim();
const desc = document.getElementById("description").value.trim();
const category = document.getElementById("category").value;
const isOverhead = document.getElementById("is-overhead").checked;

if (!amtStr || isNaN(amtStr)) return alert("Enter a valid amount");
if (!desc) return alert("Please add a description");

const expenses = getExpenses();
expenses.push({
id: Date.now(),
amount: parseFloat(amtStr),
description: desc,
category,
isOverhead,
date: new Date().toISOString()
});

saveExpenses(expenses);
renderList();

// Reset
document.getElementById("amount").value = "";
document.getElementById("description").value = "";
document.getElementById("category").value = "stock";
document.getElementById("is-overhead").checked = false;

alert("Expense saved");
}

function renderList() {
const list = document.getElementById("expense-list");
if (!list) return;
list.innerHTML = "";
getExpenses().slice(-5).reverse().forEach(exp => {
const li = document.createElement("li");
li.textContent = `${new Date(exp.date).toLocaleDateString()} – ${exp.description} (${exp.category}): R${exp.amount.toFixed(2)}${exp.isOverhead ? " 💸" : ""}`;
list.appendChild(li);
});
}