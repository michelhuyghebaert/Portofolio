// Portfolio Management CRUD Operations
let portfolios = [
  {
    name: 'Portfolio 1',
    description: 'Description of portfolio 1',
    startDate: '2025-01-01',
    endDate: '2025-01-05'
  },
  {
    name: 'Portfolio 2',
    description: 'Description of portfolio 1',
    startDate: '2025-01-01',
    endDate: '2025-01-05'
  },
  {
    name: 'Portfolio 3',
    description: 'Description of portfolio 1',
    startDate: '2025-01-01',
    endDate: '2025-01-05'
  },
  {
    name: 'Portfolio 4',
    description: 'Description of portfolio 1',
    startDate: '2025-01-01',
    endDate: '2025-01-05'
  }
];

function updateHiddenField() {
  const jsonStr = JSON.stringify(portfolios, null, 2);
  document.getElementById('portfolio-data').value = jsonStr;
  const jsonDisplay = document.getElementById('json-display');
  if (jsonDisplay) {
    jsonDisplay.textContent = jsonStr;
  }
}


function renderPortfolioList() {
  const table = document.getElementById('portfolio-list');
  if (!table) return;
  let tbody = table.querySelector('tbody');
  if (!tbody) {
    tbody = document.createElement('tbody');
    table.appendChild(tbody);
  }
  tbody.innerHTML = '';
  portfolios.forEach((portfolio, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${portfolio.name}</td>
      <td>${portfolio.description}</td>
      <td>${portfolio.startDate}</td>
      <td>${portfolio.endDate}</td>
      <td>
        <button onclick="editPortfolio(${idx})">Edit</button>
        <button onclick="deletePortfolio(${idx})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function addPortfolio(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  let errorMsg = '';
  if (!startDate) {
    errorMsg += 'Start date is required.\n';
  }
  if (name.length > 50) {
    errorMsg += 'Name must not exceed 50 characters.\n';
  }
  if (description.length > 500) {
    errorMsg += 'Description must not exceed 500 characters.\n';
  }
  if (!name) {
    errorMsg += 'Name is required.\n';
  }
  if (errorMsg) {
    alert(errorMsg);
    return;
  }
  if (editIndex !== null) {
    portfolios[editIndex] = { name, description, startDate, endDate };
    editIndex = null;
  } else {
    portfolios.push({ name, description, startDate, endDate });
  }
  document.getElementById('portfolio-form').reset();
  renderPortfolioList();
  updateHiddenField();
  showSaveModal();
}

function showSaveModal() {
  document.getElementById('save-modal').style.display = 'flex';
}

function hideSaveModal() {
  document.getElementById('save-modal').style.display = 'none';
}


let editIndex = null;
function editPortfolio(idx) {
  const p = portfolios[idx];
  document.getElementById('name').value = p.name;
  document.getElementById('description').value = p.description;
  document.getElementById('startDate').value = p.startDate;
  document.getElementById('endDate').value = p.endDate;
  editIndex = idx;
}

let deleteIndex = null;
function showDeleteModal(idx) {
  deleteIndex = idx;
  const p = portfolios[idx];
  document.getElementById('delete-modal-message').textContent = `Are you sure you want to delete the portfolio "${p.name}"?`;
  document.getElementById('delete-modal').style.display = 'flex';
}

function hideDeleteModal() {
  document.getElementById('delete-modal').style.display = 'none';
  deleteIndex = null;
}

function confirmDeletePortfolio() {
  if (deleteIndex !== null) {
    portfolios.splice(deleteIndex, 1);
    renderPortfolioList();
    updateHiddenField();
    hideDeleteModal();
  }
}

// Replace deletePortfolio calls in renderPortfolioList
function renderPortfolioList() {
  const table = document.getElementById('portfolio-list');
  if (!table) return;
  let tbody = table.querySelector('tbody');
  if (!tbody) {
    tbody = document.createElement('tbody');
    table.appendChild(tbody);
  }
  tbody.innerHTML = '';
  portfolios.forEach((portfolio, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${portfolio.name}</td>
      <td>${portfolio.description}</td>
      <td>${portfolio.startDate}</td>
      <td>${portfolio.endDate}</td>
      <td>
        <button onclick="editPortfolio(${idx})">Edit</button>
        <button onclick="showDeleteModal(${idx})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}



function showSection(section) {
  document.getElementById('portfolio-form-section').style.display = section === 'form' ? 'block' : 'none';
  document.getElementById('portfolio-list-section').style.display = section === 'list' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ok-save-btn').addEventListener('click', () => {
    hideSaveModal();
    showSection('list');
  });
  document.getElementById('portfolio-form').addEventListener('submit', addPortfolio);
  document.getElementById('nav-list').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('list');
  });
  document.getElementById('nav-add').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('portfolio-form').reset();
    editIndex = null;
    showSection('form');
  });
  document.getElementById('cancel-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('portfolio-form').reset();
    editIndex = null;
    showSection('list');
  });
  document.getElementById('confirm-delete-btn').addEventListener('click', confirmDeletePortfolio);
  document.getElementById('cancel-delete-btn').addEventListener('click', hideDeleteModal);
  showSection('list');
  renderPortfolioList();
  updateHiddenField();
});

// Show form when editing
function editPortfolio(idx) {
  const p = portfolios[idx];
  document.getElementById('name').value = p.name;
  document.getElementById('description').value = p.description;
  document.getElementById('startDate').value = p.startDate;
  document.getElementById('endDate').value = p.endDate;
  editIndex = idx;
  showSection('form');
}
