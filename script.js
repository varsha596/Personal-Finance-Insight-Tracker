const dateInput = document.getElementById("date");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const transactionsBody = document.getElementById("transactions");

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add transaction
function addTransaction() {
  const date = dateInput.value;
  const type = typeInput.value;
  const category = categoryInput.value.trim();
  const amount = Number(amountInput.value);

  if (!date || !type || !category || !amount) {
    alert("Please fill all fields");
    return;
  }

  const transaction = {
    id: Date.now(),
    date,
    type,
    category,
    amount
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  clearInputs();
  renderTransactions();
}

// Render all transactions
function renderTransactions() {
  transactionsBody.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(txn => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${txn.date}</td>
      <td>${txn.type}</td>
      <td>${txn.category}</td>
      <td>₹${txn.amount}</td>
      <td>
        <button onclick="deleteTransaction(${txn.id})">Delete</button>
      </td>
    `;

    transactionsBody.appendChild(row);

    if (txn.type === "income") {
      totalIncome += txn.amount;
    } else {
      totalExpense += txn.amount;
    }
  });

  incomeEl.textContent = totalIncome;
  expenseEl.textContent = totalExpense;
  balanceEl.textContent = totalIncome - totalExpense;
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(txn => txn.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
}

// Clear inputs
function clearInputs() {
  dateInput.value = "";
  typeInput.value = "";
  categoryInput.value = "";
  amountInput.value = "";
}

// Initial load
renderTransactions();
