// DOM Elements
const balanceEl = document.getElementById('balance');
const moneyPlusEl = document.getElementById('money-plus');
const moneyMinusEl = document.getElementById('money-minus');
const listEl = document.getElementById('transaction-list');
const formEl = document.getElementById('transaction-form');
const textInputEl = document.getElementById('text');
const amountInputEl = document.getElementById('amount');
const dateInputEl = document.getElementById('date');
const categoryInputEl = document.getElementById('category');
const budgetFormEl = document.getElementById('budget-form');
const budgetCategoryInputEl = document.getElementById('budget-category');
const budgetAmountInputEl = document.getElementById('budget-amount');
const budgetListEl = document.getElementById('budget-list');
const themeToggleEl = document.getElementById('theme-toggle');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize transactions and budgets from localStorage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let budgets = JSON.parse(localStorage.getItem('budgets')) || [];

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light-mode';
document.body.className = savedTheme;
updateThemeIcon();

// Initialize the app
function init() {
    updateTransactionList();
    updateValues();
    updateBudgetList();
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? 'minus' : 'plus';
    const formattedDate = new Date(transaction.date).toLocaleDateString();
    
    const item = document.createElement('li');
    item.classList.add(sign);
    
    item.innerHTML = `
        <div>
            <div class="transaction-header">
                <span>${transaction.text}</span>
                <span class="transaction-category">${transaction.category}</span>
            </div>
            <div class="transaction-date">${formattedDate}</div>
        </div>
        <span>${sign === 'plus' ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    listEl.appendChild(item);
}

// Update transaction list
function updateTransactionList() {
    listEl.innerHTML = '';
    // Sort transactions by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    transactions.forEach(addTransactionDOM);
}

// Update balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    
    const expense = (
        amounts
            .filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);
    
    balanceEl.innerText = `$${total}`;
    moneyPlusEl.innerText = `+$${income}`;
    moneyMinusEl.innerText = `-$${expense}`;
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Add new transaction
function addTransaction(e) {
    e.preventDefault();
    
    if (textInputEl.value.trim() === '' || amountInputEl.value.trim() === '' || dateInputEl.value === '' || categoryInputEl.value === '') {
        alert('Please fill all fields');
        return;
    }
    
    const transaction = {
        id: generateID(),
        text: textInputEl.value,
        amount: +amountInputEl.value,
        date: dateInputEl.value,
        category: categoryInputEl.value
    };
    
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    updateBudgetProgress();
    
    textInputEl.value = '';
    amountInputEl.value = '';
    dateInputEl.value = '';
    categoryInputEl.value = '';
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
    updateBudgetProgress();
}

// Add new budget
function addBudget(e) {
    e.preventDefault();
    
    if (budgetCategoryInputEl.value === '' || budgetAmountInputEl.value === '') {
        alert('Please fill all fields');
        return;
    }
    
    // Check if budget already exists for this category
    const existingBudgetIndex = budgets.findIndex(b => b.category === budgetCategoryInputEl.value);
    
    if (existingBudgetIndex !== -1) {
        budgets[existingBudgetIndex].amount = +budgetAmountInputEl.value;
    } else {
        const budget = {
            id: generateID(),
            category: budgetCategoryInputEl.value,
            amount: +budgetAmountInputEl.value
        };
        budgets.push(budget);
    }
    
    updateLocalStorage();
    updateBudgetList();
    updateBudgetProgress();
    
    budgetCategoryInputEl.value = '';
    budgetAmountInputEl.value = '';
}

// Update budget list
function updateBudgetList() {
    budgetListEl.innerHTML = '';
    
    if (budgets.length === 0) {
        budgetListEl.innerHTML = '<p>No budgets set yet. Add a budget to track your spending.</p>';
        return;
    }
    
    budgets.forEach(budget => {
        const budgetItem = document.createElement('div');
        budgetItem.className = 'budget-item';
        budgetItem.innerHTML = `
            <div>
                <div class="budget-category">${budget.category}</div>
                <div class="budget-progress">
                    <div class="budget-progress-bar" style="width: 0%"></div>
                </div>
            </div>
            <div>
                <div class="budget-amount">$${budget.amount.toFixed(2)}</div>
                <div class="budget-spent">$${budget.spent ? budget.spent.toFixed(2) : '0.00'}</div>
            </div>
            <button class="delete-btn" onclick="removeBudget(${budget.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        budgetListEl.appendChild(budgetItem);
    });
}

// Update budget progress bars
function updateBudgetProgress() {
    // Calculate spent amounts for each budget category
    budgets.forEach(budget => {
        const categoryTransactions = transactions.filter(t => 
            t.category === budget.category && t.amount < 0
        );
        budget.spent = categoryTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    });
    
    // Update progress bars
    document.querySelectorAll('.budget-item').forEach((item, index) => {
        const budget = budgets[index];
        const progress = (budget.spent / budget.amount) * 100;
        const progressBar = item.querySelector('.budget-progress-bar');
        
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress > 100) {
            item.classList.add('budget-exceeded');
        } else {
            item.classList.remove('budget-exceeded');
        }
    });
    
    updateLocalStorage();
}

// Remove budget by ID
function removeBudget(id) {
    budgets = budgets.filter(budget => budget.id !== id);
    updateLocalStorage();
    updateBudgetList();
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('budgets', JSON.stringify(budgets));
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', currentTheme);
    
    updateThemeIcon();
}

// Update theme toggle icon
function updateThemeIcon() {
    const icon = themeToggleEl.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Switch tabs
function switchTab(e) {
    const tabId = e.target.dataset.tab;
    
    // Update tab buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update tab contents
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabId}-tab`).classList.add('active');
}

// Set default date to today
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    dateInputEl.value = today;
}

// Event listeners
formEl.addEventListener('submit', addTransaction);
budgetFormEl.addEventListener('submit', addBudget);
themeToggleEl.addEventListener('click', toggleTheme);
tabButtons.forEach(btn => btn.addEventListener('click', switchTab));

// Initialize app
setDefaultDate();
init();
updateBudgetProgress();