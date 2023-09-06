import { NotePreview } from "./NotePreview.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

// export function NoteList({ notes, loadNotes }) {
//     const handleDelete = async (noteId) => {
//         await noteService.remove(noteId)
//         loadNotes()
//     }

//     const handleSave = async (note) => {
//         await noteService.save(note)
//         loadNotes()
//     }

//     const handleDuplicate = async (noteToDuplicate) => {
//         const newNote = JSON.parse(JSON.stringify(noteToDuplicate))
//         delete newNote.id

//         newNote.info.title = `${newNote.info.title} (copy)`

//         await noteService.createNote(newNote.type, newNote.info)
//         loadNotes()
//     }
//     return (
//         <div className='notes-list'>
//             {notes.map(note => (
//                 <NotePreview key={note.id} note={note} onDelete={handleDelete} onSave={handleSave} onDuplicate={handleDuplicate} />
//             ))}
//         </div>
//     )
// }
export function NoteList({ notes, setNotes }) {
    const handleDelete = async (noteId) => {
        await noteService.remove(noteId);
        setNotes(notes.filter(note => note.id !== noteId));
    };

    const handleSave = async (updatedNote) => {
        await noteService.save(updatedNote);
        setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    };

    const handleDuplicate = async (noteToDuplicate) => {
        const newNote = JSON.parse(JSON.stringify(noteToDuplicate));
        delete newNote.id;

        newNote.info.title = `${newNote.info.title} (copy)`;

        const savedNote = await noteService.createNote(newNote.type, newNote.info);
        setNotes([...notes, savedNote]);
    };

    return (
        <div className='notes-list'>
            {notes.map(note => (
                <NotePreview key={note.id} note={note} onDelete={handleDelete} onSave={handleSave} onDuplicate={handleDuplicate} />
            ))}
        </div>
    );
}