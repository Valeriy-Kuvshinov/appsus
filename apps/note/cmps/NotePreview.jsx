
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"

const { useState, useEffect } = React

export function NotePreview({ note, onDelete, onSave, onDuplicate }) {
    const [isEditing, setIsEditing] = useState(false)

    const renderDynamicComponent = (type, info) => {
        switch (type) {
            case 'NoteTxt':
                return <NoteTxt info={info} changeInfo={updateNote} />
            case 'NoteImg':
                return <NoteImg info={info} changeInfo={updateNote} />
            case 'NoteVideo':
                return <NoteVideo info={info} changeInfo={updateNote} />
            case 'NoteTodos':
                return <NoteTodos info={info} changeInfo={updateNote} />
            default:
                return null
        }
    }

    const updateNote = (newInfo) => {
        onSave({ ...note, info: newInfo })
    }

    const updateNoteText = (newText) => {
        onSave({ ...note, info: { ...note.info, txt: newText } })
    }

    const updateMediaLink = (newUrl) => {
        onSave({ ...note, info: { ...note.info, url: newUrl } })
    }

    const updateTodos = (newTodos) => {
        const todoItems = newTodos.split(',').map(txt => ({ txt: txt.trim(), doneAt: null }))
        onSave({ ...note, info: { ...note.info, todos: todoItems } })
    }

    const renderEditFields = () => {
        switch (note.type) {
            case 'NoteTxt':
                return <textarea value={note.info.txt} onChange={(e) => updateNoteText(e.target.value)} />
            case 'NoteImg':
            case 'NoteVideo':
                return <input type="text" value={note.info.url} onChange={(e) => updateMediaLink(e.target.value)} />
            case 'NoteTodos':
                return <input type="text" value={note.info.todos.map(todo => todo.txt).join(', ')} onChange={(e) => updateTodos(e.target.value)} />
            default:
                return null
        }
    }

    return (
        <div>
            <h2>{note.info.title || note.info.txt}</h2>
            {isEditing ? renderEditFields() : renderDynamicComponent(note.type, note.info)}
            {!isEditing && <button onClick={() => onDelete(note.id)}>Delete</button>}
            {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
            {isEditing && <button onClick={() => setIsEditing(false)}>Save</button>}
            {!isEditing && <button onClick={() => onDuplicate(note)}>Duplicate</button>}
        </div>
    )
}