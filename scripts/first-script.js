// DOM elements
const inputFieldEl = document.getElementById('input-field');
const addBtnEl = document.getElementById('add-btn');
const deleteBtnEl = document.getElementById('delete-btn');
const choresListEl = document.getElementById('chores-list');

let choresList = []; /* Array that stores the chores added */

// Retrieve chores from local storage
const choresFromLocalStorage = JSON.parse(localStorage.getItem('choresList'));

// If there are chores in local storage, load them into choresList and render them
if (choresFromLocalStorage) {
  choresList = choresFromLocalStorage;
  renderChores();
}

// EVENT LISTENERS
// Add a chore, clear input field, and render updated chores list
addBtnEl.addEventListener('click', function () {
  addChores();
  clearFieldValue();
  renderChores();
});

deleteBtnEl.addEventListener('click', function () {
  deleteAllChores();
});

choresListEl.addEventListener('click', function (e) {
  // Check if the clicked element is a chore (list item)
  if (e.target.tagName === 'LI') {
    const clickedChore = e.target.textContent.trim(); // Get the text content of the clicked chore
    const index = choresList.indexOf(clickedChore); // Find the index of the clicked chore in the choresList array

    // If the clicked chore is found in the array
    if (index !== -1) {
      choresList.splice(index, 1); // Remove the clicked chore from the array
      localStorage.setItem('choresList', JSON.stringify(choresList)); // Update local storage with the modified chores list
      renderChores(); // Render the updated chores list

      // If all chores are completed, render the completion GIF
      if (choresList.length === 0) {
        renderCompletionGif();
      }
    }
  }
});

// FUNCTIONS
function addChores() {
  let chore = inputFieldEl.value.trim(); // Get the chore from the input field

  // If the chore is not empty and not already in the list
  if (chore !== '' && !choresList.includes(chore)) {
    // Add the chore to the list and update local storage
    choresList.push(chore);
    localStorage.setItem('choresList', JSON.stringify(choresList));
  } else if (chore === '') {
    // Show an alert if the input field is empty
    alert('Your chores list is empty. Please write a chore');
  } else {
    // Show an alert if the chore is already in the list
    alert('This chore was already added to your list');
  }
}

function renderChores() {
  let listedChore = '';
  // Loop through the chores list and create list items for each chore
  for (let i = 0; i < choresList.length; i++) {
    listedChore += `
    <li>${choresList[i]}</li>
    `;
  }
  // Display the list items in the choresListEl container
  choresListEl.innerHTML = listedChore;
}

// Function to clear the input field
function clearFieldValue() {
  inputFieldEl.value = '';
}

// Clear the chores list array, the list displayed on the webpage and the localStorage
function deleteAllChores() {
  choresList = [];
  choresListEl.innerHTML = '';
  localStorage.clear();
}

// Function to render the completion GIF when all chores are completed
function renderCompletionGif() {
  choresListEl.innerHTML =
    '<img src="assets/wellDone.gif" alt="Friends Joey and Chandler celebrating and giving a thumbs up">';
}
