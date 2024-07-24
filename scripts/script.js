let tasks = [];

const inputField = document.getElementById('input-field');
const addBtn = document.getElementById('add-btn');
const deleteBtn = document.getElementById('delete-btn');
const choresListEl = document.getElementById('chores-list');

addBtn.addEventListener('click', appendTask);
deleteBtn.addEventListener('click', clearAll);
choresListEl.addEventListener('click', handleTaskClicked);

// Retrieve chores from local storage
const tasksFromLocalStorage = JSON.parse(localStorage.getItem('mytask'));

// If there are chores in local storage, load them into choresList and render them
if (tasksFromLocalStorage) {
  tasks = tasksFromLocalStorage;
  generateHtml();
}

function appendTask() {
  let inputValue = inputField.value;
  if (inputValue !== '' && !tasks.includes(inputValue)) {
    tasks.push(inputValue);
    localStorage.setItem('mytask', JSON.stringify(tasks));
  }
  inputField.value = '';
  generateHtml();
}

function generateHtml() {
  choresListEl.innerHTML = '';
  if (tasks.length > 0) {
    for (let task of tasks)
      choresListEl.innerHTML += `
    <li>${task}</li>
    `;
  }
}

function handleTaskClicked(e) {
  if (e.target.tagName === 'LI') {
    const taskClicked = e.target.textContent;
    tasks = tasks.filter((item) => item !== taskClicked);
    localStorage.setItem('mytask', JSON.stringify(tasks));
    generateHtml();

    if (tasks.length === 0) {
      completedTaskList();
    }
  }
}

function completedTaskList() {
  choresListEl.innerHTML = `
    <img src="assets/wellDone.gif" alt="JFriends Joey and Chandler celebrating and giving a thumbs up">
    `;
}

function clearAll() {
  tasks = [];
  inputField.value = '';
  choresListEl.textContent = '';
  localStorage.clear();
}
