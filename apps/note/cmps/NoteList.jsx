import { NotePreview } from "./NotePreview.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

export function NoteList({ notes, setNotes }) {
    const pinnedNotes = notes.filter(note => note.isPinned)
    const otherNotes = notes.filter(note => !note.isPinned)

    const handleDelete = async (noteId) => {
        await noteService.remove(noteId)
        setNotes(notes.filter(note => note.id !== noteId))
        showSuccessMsg('Note has been deleted')
    }

    const handleSave = async (updatedNote) => {
        await noteService.save(updatedNote)
        setNotes((prevNotes) => {
            return prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note)
        })
    }

    const handleDuplicate = async (noteToDuplicate) => {
        const newNote = JSON.parse(JSON.stringify(noteToDuplicate))
        delete newNote.id

        newNote.info.title = `${newNote.info.title} (Copy)`
        const savedNote = await noteService.createNote(newNote.type, newNote.info, newNote.isPinned, newNote.style)

        if (noteToDuplicate.labels) savedNote.labels = [...noteToDuplicate.labels]
        
        setNotes([...notes, savedNote])
        showSuccessMsg('Note duplicated')
    }

    return (
        <div className='notes-container'>
            <h3>PINNED</h3>
            <div className='notes-list'>
                {pinnedNotes.map(note => (
                    <NotePreview key={note.id} note={note} onDelete={handleDelete} onSave={handleSave} onDuplicate={handleDuplicate} />
                ))}
            </div>
            <h3>OTHERS</h3>
            <div className='notes-list'>
                {otherNotes.map(note => (
                    <NotePreview key={note.id} note={note} onDelete={handleDelete} onSave={handleSave} onDuplicate={handleDuplicate} />
                ))}
            </div>
        </div>
    )
}