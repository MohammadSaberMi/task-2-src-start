const btn = document.querySelector('.btn-click');
const active = document.querySelector('.btn-active');
const sub = document.querySelector('.sub');
const tableBody = document.querySelector('#transaction-table tbody');
const sortbtn = document.querySelector('.sort-btn');
const sortIcon = document.querySelector('.sort-icon');
let users = [];
let sortOrder = 'asc';
const openBtm = () => {
  active.classList.toggle('active');
};

console.log(sortOrder);
btn.addEventListener('click', openBtm);
btn.addEventListener('click', getusers);

sortbtn.addEventListener('click', () => {
  sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  sortIcon.style.transform =
    sortOrder === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)';
  getUsersSortedByPrice(sortOrder);
});

async function getUsersSortedByPrice(order) {
  try {
    const res = await axios.get(
      `http://localhost:3000/transactions?_sort=${
        order === 'asc' ? 'price' : '-price'
      }`
    );
    users = res.data;
    console.log(users);
    renderTable(users);
  } catch (err) {
    console.error(err);
  }
}

sub.addEventListener('input', async function (e) {
  console.log(e.target.value);
  const query = e.target.value;
  try {
    const res = await axios.get(
      `http://localhost:3000/transactions?refId_like=${query}`
    );
    users = res.data;
    console.log(users);
    renderTable(users);
  } catch (err) {
    console.error(err);
  }
});

async function getusers() {
  try {
    const res = await axios.get('http://localhost:3000/transactions');
    users = res.data;
    console.log(users);
    renderTable(users);
  } catch (err) {
    console.error(err);
  }
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return date.toLocaleDateString('fa-IR', options);
}

function renderTable(data) {
  tableBody.innerHTML = '';
  data.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
            <td>${index + 1}</td>
            <td style="color: ${
              item.type === 'برداشت از حساب' ? 'red' : 'green'
            };">${item.type}</td>
            <td>${item.price.toLocaleString()}</td>
            <td>${item.refId}</td>
            <td>${formatDate(item.date)}</td>
        `;

    tableBody.appendChild(row);
  });
}
