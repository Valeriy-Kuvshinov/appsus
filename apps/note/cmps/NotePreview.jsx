import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteActions } from "./NoteActions.jsx"
import { PinButton } from "./PinButton.jsx"
import { NoteLabels } from "./NoteLabels.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function NotePreview({ note, onDelete, onSave, onDuplicate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [tempNote, setTempNote] = useState({ ...note })
    const [labels, setLabels] = useState(note.labels || [])

    const renderDynamicComponent = (type, info, isEditing, showText = true) => {
        switch (type) {
            case 'NoteTxt':
                return <NoteTxt info={info} changeInfo={updateNoteText} />
            case 'NoteImg':
                return <NoteImg info={info} changeInfo={updateMediaLink} showText={showText} />
            case 'NoteVideo':
                return <NoteVideo info={info} changeInfo={updateMediaLink} showText={showText} />
            case 'NoteTodos':
                return <NoteTodos info={info} isEditing={isEditing} changeInfo={updateNoteField('todos')} />
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
    const updateNoteField = (field) => (value) => {
        setTempNote({ ...tempNote, info: { ...tempNote.info, [field]: value } })
    }
    const handleAddTodo = () => {
        const updatedTodos = [...tempNote.info.todos, { txt: 'todo text', doneAt: null }]
        setTempNote({ ...tempNote, info: { ...tempNote.info, todos: updatedTodos } })
    }

    const addLabel = (label) => {
        const newLabels = [...labels, label]
        setLabels(newLabels)
        const updatedNote = { ...tempNote, labels: newLabels }
        setTempNote(updatedNote)
        onSave(updatedNote)
    }
    const removeLabel = (labelToRemove) => {
        const newLabels = labels.filter(label => label.type !== labelToRemove.type)
        setLabels(newLabels)
        const updatedNote = { ...tempNote, labels: newLabels }
        setTempNote(updatedNote)
        onSave(updatedNote)
    }

    const changeBackgroundColor = (newColor) => {
        const updatedTempNote = { ...tempNote, style: { backgroundColor: newColor } }
        setTempNote(updatedTempNote)
        onSave(updatedTempNote)
    }

    const saveChanges = () => {
        onSave(tempNote)
        setIsEditing(false)
        showSuccessMsg('Note saved')
    }
    
    const renderEditFields = () => {
        return (
            <React.Fragment>
                <textarea
                    type="text"
                    value={tempNote.info.title || ''}
                    onChange={(e) => updateTitle(e.target.value)}
                    className='title-textarea'
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
                                    {renderDynamicComponent(tempNote.type, { ...tempNote.info, txt: '' }, false, null, null, false)}
                                    <input type="text" value={tempNote.info.url} onChange={(e) => updateMediaLink(e.target.value, tempNote.info.txt)} />
                                    <input type="text" value={tempNote.info.txt || ''} onChange={(e) => updateMediaLink(tempNote.info.url, e.target.value)} placeholder="Add text..." />
                                </React.Fragment>
                            )
                        case 'NoteTodos':
                            return <NoteTodos info={tempNote.info} changeInfo={updateNoteField} isEditing={true} />
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
            <div className="note-header">
                {isEditing ? null : <h2>{note.info.title || note.info.txt}</h2>}
                {!isEditing && (<PinButton note={note} onSave={onSave} />)}
            </div>
            <div className="content">
                {isEditing ? renderEditFields() : renderDynamicComponent(note.type, note.info, isEditing, updateNoteField, null, true)}
            </div>
            <NoteLabels labels={labels} addLabel={addLabel} removeLabel={removeLabel} />
            <NoteActions
                handleAddTodo={handleAddTodo}
                isEditing={isEditing}
                changeBackgroundColor={changeBackgroundColor}
                setIsEditing={setIsEditing}
                saveChanges={saveChanges}
                onDuplicate={onDuplicate}
                note={note}
                onDelete={onDelete}
                addLabel={addLabel}
            />
        </div>
    )
}