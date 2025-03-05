// Function to save the note with the current date
function saveNote() {
  const noteText = document.getElementById('notes-text').value;
  const date = new Date().toLocaleString(); // Get the current date and time
  if (noteText) {
    // Get saved notes from localStorage, or initialize an empty array if none exist
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Create a new note object
    const newNote = {
      text: noteText,
      date: date
    };

    // Push the new note into the notes array
    notes.push(newNote);

    // Save the updated notes array back to localStorage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Clear the textarea after saving
    document.getElementById('notes-text').value = '';

    // Redirect to notes page to view saved notes
    window.location.href = 'notes.html';
  } else {
    alert('Please enter some notes before saving.');
  }
}

// Function to display the notes on the notes page
function displayNotes() {
  const notesList = document.getElementById('notes-list');
  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  // Clear the existing notes in the list
  notesList.innerHTML = '';

  // Loop through each saved note and display it
  notes.forEach(note => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${note.date}</strong>: ${note.text}`;
    notesList.appendChild(listItem);
  });
}

// Function to clear all notes
function clearNotes() {
  if (confirm('Are you sure you want to clear all notes?')) {
    localStorage.removeItem('notes');
    displayNotes(); // Refresh the list after clearing
  }
}

// Display the notes when the page loads
window.onload = displayNotes;
