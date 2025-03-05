document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.getElementById("notes-list");

  // Load saved notes from localStorage and display them
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notesData")) || [];
    
    notesList.innerHTML = ''; // Clear the current list
    notes.forEach((note) => {
      const noteElement = document.createElement("li");
      noteElement.textContent = `${note.text} - ${note.date}`;
      notesList.appendChild(noteElement);
    });
  }

  // Function to clear all notes
  function clearNotes() {
    localStorage.removeItem("notesData");
    loadNotes();
  }

  loadNotes(); // Load notes when the page loads
});
