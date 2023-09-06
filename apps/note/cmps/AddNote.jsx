
import { NoteValidator } from "./NoteValidator.jsx"
import { noteService } from "../services/note.service.js"

const { useState } = React

export const AddNote = ({ onNoteAdded }) => {
    const [newNoteTitle, setNewNoteTitle] = useState('')
    const [newNoteText, setNewNoteText] = useState('')
    const [noteType, setNoteType] = useState('NoteTxt')
    const [mediaLink, setMediaLink] = useState('')
    const [todos, setTodos] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleCreate = async () => {
        const { isValid, errorMessage } = NoteValidator({
            newNoteTitle,
            noteType,
            newNoteText,
            mediaLink,
            todos,
        })

        if (!isValid) {
            setErrorMessage(errorMessage);
            return;
        }

        let info = {};

        if (noteType === 'NoteTxt') {
            info = {
                title: newNoteTitle,
                txt: newNoteText,
            };
        } else if (noteType === 'NoteImg' || noteType === 'NoteVideo') {
            info = {
                title: newNoteTitle,
                url: mediaLink,
            };
        } else if (noteType === 'NoteTodos') {
            const todoItems = todos.split(',').map((txt) => ({ txt: txt.trim(), doneAt: null }));
            info = {
                title: newNoteTitle,
                todos: todoItems,
            };
        }

        const newNote = await noteService.createNote(noteType, info);

        setNewNoteTitle('');
        setNewNoteText('');
        setMediaLink('');
        setTodos('');
        onNoteAdded(newNote);
    }

    return (
        <div className='note-creation'>
            <select onChange={(e) => setNoteType(e.target.value)} value={noteType}>
                <option value="NoteTxt">Text</option>
                <option value="NoteImg">Image</option>
                <option value="NoteVideo">Video</option>
                <option value="NoteTodos">To-dos</option>
            </select>
            <input
                type="text"
                placeholder="New note title"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
            />
            {noteType === 'NoteTxt' && (
                <textarea
                    placeholder="New note text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                />
            )}
            {(noteType === 'NoteImg' || noteType === 'NoteVideo') && (
                <input
                    type="text"
                    placeholder="Media URL"
                    value={mediaLink}
                    onChange={(e) => setMediaLink(e.target.value)}
                />
            )}
            {noteType === 'NoteTodos' && (
                <input
                    type="text"
                    placeholder="To-dos (comma separated)"
                    value={todos}
                    onChange={(e) => setTodos(e.target.value)}
                />
            )}
            <button onClick={handleCreate}>Create New Note</button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    )
}