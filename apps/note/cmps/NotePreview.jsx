
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { noteService } from "../services/note.service.js"
import { NoteActions } from "./NoteActions.jsx"

const { useState, useEffect } = React

export function NotePreview({ note, onDelete, onSave, onDuplicate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [tempNote, setTempNote] = useState({ ...note })

    const renderDynamicComponent = (type, info) => {
        switch (type) {
            case 'NoteTxt':
                return <NoteTxt info={info} changeInfo={updateNoteText} />
            case 'NoteImg':
                return <NoteImg info={info} changeInfo={updateMediaLink} />
            case 'NoteVideo':
                return <NoteVideo info={info} changeInfo={updateMediaLink} />
            case 'NoteTodos':
                return <NoteTodos info={info} changeInfo={updateTodos} />
        }
        return null
    }

    const updateTitle = (newTitle) => {
        setTempNote({ ...tempNote, info: { ...tempNote.info, title: newTitle } })
    }

    const updateNoteText = (newText) => {
        setTempNote({ ...tempNote, info: { ...tempNote.info, txt: newText } })
    }

    const updateMediaLink = (newUrl, newText) => {
        setTempNote({ ...tempNote, info: { ...tempNote.info, url: newUrl, txt: newText } })
    }

    const updateTodos = (newTodos) => {
        const todoItems = newTodos.split(',').map(txt => ({ txt: txt.trim(), doneAt: null }))
        setTempNote({ ...tempNote, info: { ...tempNote.info, todos: todoItems } })
    }

    const changeBackgroundColor = (newColor) => {
        const updatedTempNote = { ...tempNote, style: { backgroundColor: newColor } }
        setTempNote(updatedTempNote)
        onSave(updatedTempNote)
    }

    const saveChanges = () => {
        onSave(tempNote)
        setIsEditing(false)
    }

    const handlePin = async () => {
        await noteService.togglePin(note.id)
        setIsPinned(!isPinned)

        const updatedNote = { ...note, isPinned: !isPinned, style: note.style }
        onSave(updatedNote)
    }

    const [isPinned, setIsPinned] = useState(note.isPinned)

    useEffect(() => {
        setIsPinned(note.isPinned)
    }, [note.isPinned])

    const renderEditFields = () => {
        return (
            <React.Fragment>
                <input
                    type="text"
                    value={tempNote.info.title || ''}
                    onChange={(e) => updateTitle(e.target.value)}
                    placeholder="Title"
                />
                {(() => {
                    switch (tempNote.type) {
                        case 'NoteTxt':
                            return <textarea value={tempNote.info.txt} onChange={(e) => updateNoteText(e.target.value)} />
                        case 'NoteImg':
                        case 'NoteVideo':
                            return (
                                <React.Fragment>
                                    <input type="text" value={tempNote.info.url} onChange={(e) => updateMediaLink(e.target.value, tempNote.info.txt)} />
                                    <input type="text" value={tempNote.info.txt || ''} onChange={(e) => updateMediaLink(tempNote.info.url, e.target.value)} placeholder="Add text..." />
                                </React.Fragment>
                            )
                        case 'NoteTodos':
                            return <input type="text" value={tempNote.info.todos.map(todo => todo.txt).join(', ')} onChange={(e) => updateTodos(e.target.value)} />
                    }
                    return null
                })()}
            </React.Fragment>
        )
    }

    useEffect(() => {
        setTempNote({ ...note })
    }, [note])

    return (
        <div className='note-card' style={tempNote.style}>
            {isEditing ? null : <h2>{note.info.title || note.info.txt}</h2>}
            <div className="content">
                {isEditing ? renderEditFields() : renderDynamicComponent(note.type, note.info)}
            </div>
            <NoteActions
                isEditing={isEditing}
                isPinned={isPinned}
                handlePin={handlePin}
                changeBackgroundColor={changeBackgroundColor}
                setIsEditing={setIsEditing}
                saveChanges={saveChanges}
                onDuplicate={onDuplicate}
                note={note}
                onDelete={onDelete}
            />
        </div>
    )
}