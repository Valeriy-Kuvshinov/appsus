
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NotePreview({ note, onDelete, onSave, onDuplicate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [tempNote, setTempNote] = useState({ ...note })

    useEffect(() => {
        setTempNote({ ...note })
    }, [note])

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

    const updateMediaLink = (newUrl) => {
        setTempNote({ ...tempNote, info: { ...tempNote.info, url: newUrl } })
    }

    const updateTodos = (newTodos) => {
        const todoItems = newTodos.split(',').map(txt => ({ txt: txt.trim(), doneAt: null }))
        setTempNote({ ...tempNote, info: { ...tempNote.info, todos: todoItems } })
    }

    const changeBackgroundColor = (newColor) => {
        setTempNote({ ...tempNote, style: { backgroundColor: newColor } })
    }

    const saveChanges = () => {
        onSave(tempNote)
        setIsEditing(false)
    }

    const handlePin = async () => {
        await noteService.togglePin(note.id)
        setIsPinned(!isPinned)

        const updatedNote = { ...note, isPinned: !isPinned }
        onSave(updatedNote)
    }

    const [isPinned, setIsPinned] = useState(note.isPinned)

    useEffect(() => {
        setIsPinned(note.isPinned)
    }, [note.isPinned])

    // const renderEditFields = () => {
    //     switch (tempNote.type) {
    //         case 'NoteTxt':
    //             return <textarea value={tempNote.info.txt} onChange={(e) => updateNoteText(e.target.value)} />
    //         case 'NoteImg':
    //         case 'NoteVideo':
    //             return <input type="text" value={tempNote.info.url} onChange={(e) => updateMediaLink(e.target.value)} />
    //         case 'NoteTodos':
    //             return <input type="text" value={tempNote.info.todos.map(todo => todo.txt).join(', ')} onChange={(e) => updateTodos(e.target.value)} />
    //         default:
    //             return null
    //     }
    // }
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
                            return <input type="text" value={tempNote.info.url} onChange={(e) => updateMediaLink(e.target.value)} />
                        case 'NoteTodos':
                            return <input type="text" value={tempNote.info.todos.map(todo => todo.txt).join(', ')} onChange={(e) => updateTodos(e.target.value)} />
                    }
                    return null
                })()}
            </React.Fragment>
        )
    }

    return (
        <div className='note-card' style={tempNote.style}>
            {isEditing ? null : <h2>{note.info.title || note.info.txt}</h2>}
            <div className="content">
                {isEditing ? renderEditFields() : renderDynamicComponent(note.type, note.info)}
            </div>
            <div className="actions">
                {!isEditing && <button onClick={() => onDelete(note.id)}><i className="fa-solid fa-rectangle-xmark"></i></button>}
                {!isEditing && <button onClick={() => setIsEditing(true)}><i className="fa-solid fa-pen-to-square"></i></button>}
                {isEditing && <button onClick={saveChanges} >Save</button>}
                {!isEditing && <button onClick={() => onDuplicate(note)}><i className="fa-solid fa-copy"></i></button>}
                <div className="color-picker-dropdown">
                    <button><i className="fa-solid fa-palette"></i></button>
                    <div className="color-picker-content">
                        <div className="color-box" onClick={() => changeBackgroundColor("#FF6B6B")} style={{ backgroundColor: "#FF6B6B" }}></div>
                        <div className="color-box" onClick={() => changeBackgroundColor("#98FB98")} style={{ backgroundColor: "#98FB98" }}></div>
                        <div className="color-box" onClick={() => changeBackgroundColor("#ADD8E6")} style={{ backgroundColor: "#ADD8E6" }}></div>
                        <div className="color-box" onClick={() => changeBackgroundColor("#D8BFD8")} style={{ backgroundColor: "#D8BFD8" }}></div>
                        <div className="color-box" onClick={() => changeBackgroundColor("#FFDAB9")} style={{ backgroundColor: "#FFDAB9" }}></div>
                        <div className="color-box" onClick={() => changeBackgroundColor("#FFFFE0")} style={{ backgroundColor: "#FFFFE0" }}></div>
                        <div className="color-box" onClick={() => changeBackgroundColor("#E0FFFF")} style={{ backgroundColor: "#E0FFFF" }}></div>
                        <div className="color-box" onClick={() => changeBackgroundColor("#D2B48C")} style={{ backgroundColor: "#D2B48C" }}></div>
                        <div className="color-box" onClick={() => changeBackgroundColor("#FFB6C1")} style={{ backgroundColor: "#FFB6C1" }}></div>
                        <div className="color-box" onClick={() => changeBackgroundColor("#FFE4E1")} style={{ backgroundColor: "#FFE4E1" }}></div>
                        <div className="color-box" onClick={() => changeBackgroundColor("#F0E68C")} style={{ backgroundColor: "#F0E68C" }}></div>
                        <div className="color-box" onClick={() => changeBackgroundColor("#FFFFFF")} style={{ background: 'transparent' }}><i className="fa-solid fa-droplet-slash"></i></div>
                    </div>
                </div>
                {!isEditing && (<button onClick={handlePin}><i className={`fa-solid fa-thumbtack ${isPinned ? 'pinned' : ''}`}></i></button>)}
                {!isEditing && <button onClick={() => console.log('testing')}><i className="fa-solid fa-envelope"></i></button>}
            </div>
        </div>
    )
}