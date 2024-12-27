const API_URL = '/api/notes';

interface Note {
    noteId: number;
    userId: number;
    name: string;
    content: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const addNoteCard = document.querySelector('.add-note-card') as HTMLDivElement;
    const noteModal = document.getElementById('noteModal') as HTMLDivElement;
    const viewModal = document.getElementById('viewModal') as HTMLDivElement;
    const closeBtns = document.querySelectorAll('.close-btn') as NodeListOf<HTMLElement>;
    const noteForm = document.getElementById('noteForm') as HTMLFormElement;
    const notesGrid = document.getElementById('notesGrid') as HTMLDivElement;
    const viewTitle = document.getElementById('viewTitle') as HTMLHeadingElement;
    const viewContent = document.getElementById('viewContent') as HTMLParagraphElement;

    let isEditMode = false;
    let editNoteId: number | null = null;

    // Fetch and display notes
    const fetchNotes = async () => {
        try {
            const response = await fetch(API_URL);
            const notes: Note[] = await response.json();
            displayNotes(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const displayNotes = (notes: Note[]) => {
        // Remove all note cards except the first one (Add Note Card)
        while (notesGrid.childElementCount > 1) {
            notesGrid.removeChild(notesGrid.lastChild as ChildNode);
        }

        notes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.dataset.id = note.noteId.toString();

            const title = document.createElement('h3');
            title.textContent = note.name;

            const preview = document.createElement('p');
            preview.textContent = getPreview(note.content);

            const actions = document.createElement('div');
            actions.className = 'actions';

            const editBtn = document.createElement('button');
            editBtn.innerHTML = '&#9998;'; // Pencil icon
            editBtn.title = 'Edit';
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openEditModal(note);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '&#128465;'; // Trash bin icon
            deleteBtn.title = 'Delete';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteNote(note.noteId);
            });

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            noteCard.appendChild(actions);
            noteCard.appendChild(title);
            noteCard.appendChild(preview);

            noteCard.addEventListener('click', () => {
                viewNote(note);
            });

            notesGrid.appendChild(noteCard);
        });
    };

    const getPreview = (content: string): string => {
        return content.length > 100 ? content.substring(0, 100) + '...' : content;
    };

    // Open Modal
    const openModal = (modal: HTMLDivElement) => {
        modal.style.display = 'block';
    };

    // Close Modal
    const closeModal = (modal: HTMLDivElement) => {
        modal.style.display = 'none';
        noteForm.reset();
        isEditMode = false;
        editNoteId = null;
    };

    // Add Note Card Click
    addNoteCard.addEventListener('click', () => {
        openModal(noteModal);
    });

    // Close Buttons
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.parentElement?.parentElement === noteModal) {
                closeModal(noteModal);
            } else if (btn.parentElement?.parentElement === viewModal) {
                closeModal(viewModal);
            }
        });
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === noteModal) {
            closeModal(noteModal);
        }
        if (e.target === viewModal) {
            closeModal(viewModal);
        }
    });

    // Handle Form Submit
    noteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = (document.getElementById('noteTitle') as HTMLInputElement).value.trim();
        const content = (document.getElementById('noteContent') as HTMLTextAreaElement).value.trim();
        const userId = 1; // Assuming a static userId for simplicity

        if (isEditMode && editNoteId !== null) {
            // Update Note
            try {
                await fetch(`${API_URL}/${editNoteId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: title, content }),
                });
                fetchNotes();
                closeModal(noteModal);
            } catch (error) {
                console.error('Error updating note:', error);
            }
        } else {
            // Add Note
            try {
                await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, name: title, content }),
                });
                fetchNotes();
                closeModal(noteModal);
            } catch (error) {
                console.error('Error adding note:', error);
            }
        }
    });

    // Open Edit Modal
    const openEditModal = (note: Note) => {
        isEditMode = true;
        editNoteId = note.noteId;
        (document.getElementById('noteId') as HTMLInputElement).value = note.noteId.toString();
        (document.getElementById('noteTitle') as HTMLInputElement).value = note.name;
        (document.getElementById('noteContent') as HTMLTextAreaElement).value = note.content;
        openModal(noteModal);
    };

    // Delete Note
    const deleteNote = async (id: number) => {
        if (confirm('Are you sure you want to delete this note?')) {
            try {
                await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                });
                fetchNotes();
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    // View Note
    const viewNote = (note: Note) => {
        viewTitle.textContent = note.name;
        viewContent.textContent = note.content;
        openModal(viewModal);
    };

    // Initial Fetch
    fetchNotes();
});