document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ notes.js cargado");
  
    const activeUser = JSON.parse(sessionStorage.getItem('activeUser'));
    const userId = activeUser?.id;
  
    if (!userId) {
      alert("Debes iniciar sesión para acceder a esta página.");
      window.location.href = "login.html";
      return;
    }
  
    const titleInput = document.getElementById('note-title');
    const contentInput = document.getElementById('note-content');
    const saveBtn = document.getElementById('save-note-btn');
    const notesContainer = document.getElementById('notes-container');
  
    // Cargar notas existentes del usuario
    fetch(`http://localhost:3000/notes?ownerId=${userId}`)
      .then(res => res.json())
      .then(notes => {
        notes.forEach(renderNote);
      })
      .catch(err => {
        console.error("Error al cargar notas:", err);
      });
  
    // Evento para guardar una nueva nota
    saveBtn.addEventListener('click', async () => {
      const title = titleInput.value.trim();
      const content = contentInput.value.trim();
  
      if (!title || !content) {
        alert("Debes completar título y contenido.");
        return;
      }
  
      const newNote = {
        title,
        content,
        ownerId: userId,
        createdAt: new Date().toISOString()
      };
  
      try {
        const res = await fetch('http://localhost:3000/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newNote)
        });
  
        if (res.ok) {
          const savedNote = await res.json();
          renderNote(savedNote);
          titleInput.value = "";
          contentInput.value = "";
        } else {
          alert("Error al guardar la nota.");
        }
      } catch (err) {
        console.error("Error de conexión:", err);
        alert("Error de conexión.");
      }
    });
  
    // Renderizar una nota en pantalla
    function renderNote(note) {
      const div = document.createElement('div');
      div.classList.add('note-card');
      div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <small>Creada el: ${new Date(note.createdAt).toLocaleString()}</small>
      `;
      notesContainer.appendChild(div);
    }
  });
  