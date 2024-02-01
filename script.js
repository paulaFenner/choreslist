// DOM elements
const inputFieldEl = document.getElementById('input-field');
const addBtnEl = document.getElementById('add-btn');
const deleteBtnEl = document.getElementById('delete-btn');
const choresListEl = document.getElementById('chores-list');

let choresList = [];

const choresFromLocalStorage = JSON.parse(localStorage.getItem('choresList'));

if (choresFromLocalStorage) {
  /* checks localStorage if there's data or not */
  choresList = choresFromLocalStorage;
  renderChores();
}

addBtnEl.addEventListener('click', function () {
  addChores();
  clearFieldValue();
  renderChores();
});

deleteBtnEl.addEventListener('click', function () {
  deleteAllChores();
});

function addChores() {
  let chore = inputFieldEl.value.trim();
  if (chore !== '' && !choresList.includes(chore)) {
    choresList.push(chore);
    localStorage.setItem('choresList', JSON.stringify(choresList));
  } else if (chore === '') {
    alert('Your chores list is empty. Please write a chore');
  } else {
    alert('This chore was already added to your list');
  }
}

function clearFieldValue() {
  inputFieldEl.value = '';
}

function deleteAllChores() {
  choresList = [];
  choresListEl.innerHTML = '';
  localStorage.clear();
}

function renderChores() {
  let listedChore = '';
  for (let i = 0; i < choresList.length; i++) {
    listedChore += `
    <li>${choresList[i]}</li>
    `;
  }
  choresListEl.innerHTML = listedChore;
}

/* TESTING
console.log(choresList); */
