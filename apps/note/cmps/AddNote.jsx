import { NoteValidator } from "./NoteValidator.jsx"
import { NoteDropdown } from "./NoteDropdown.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState } = React

export function AddNote({ onNoteAdded }) {
    const [newNoteTitle, setNewNoteTitle] = useState('')
    const [newNoteText, setNewNoteText] = useState('')
    const [noteType, setNoteType] = useState('NoteTxt')
    const [mediaLink, setMediaLink] = useState('')
    const [todos, setTodos] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)

    const randomizeBackgroundColor = () => {
        const colors = [
            "#FF6B6B",
            "#98FB98",
            "#9097f8",
            "#D8BFD8",
            "#dfaf84",
            "#FFFFE0",
            "#E0FFFF",
            "#6cbcfd",
            "#FFB6C1",
            "#dbf36f",
            "#e99b7c"
        ]
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        setBackgroundColor(randomColor)
        return randomColor
    }

    const handleCreate = async () => {
        const { isValid } = NoteValidator({
            newNoteTitle,
            noteType,
            newNoteText,
            mediaLink,
            todos,
        })
        if (!isValid) {
            return
        }
        const chosenColor = randomizeBackgroundColor()

        let info = {}

        if (noteType === 'NoteTxt') {
            info = {
                title: newNoteTitle,
                txt: newNoteText,
            }
        } else if (noteType === 'NoteImg' || noteType === 'NoteVideo') {
            info = {
                title: newNoteTitle,
                url: mediaLink,
                txt: newNoteText,
            }
        } else if (noteType === 'NoteTodos') {
            const todoItems = todos.split(',').map((txt) => ({ txt: txt.trim(), doneAt: null }))
            info = {
                title: newNoteTitle,
                todos: todoItems,
            }
        }

        const newNote = await noteService.createNote(noteType, info, false, { backgroundColor: chosenColor })

        setNewNoteTitle('')
        setNewNoteText('')
        setMediaLink('')
        setTodos('')
        onNoteAdded(newNote)
        setIsExpanded(false)
        setNoteType('NoteTxt')
        showSuccessMsg('Note has been added')
    }

    return (
        <div className='note-creation-wrapper'>
            {isExpanded ? (
                <div className='note-creation' onClick={() => setIsExpanded(true)}>
                    <div className='title-dropdown'>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newNoteTitle}
                            onChange={(e) => setNewNoteTitle(e.target.value)}
                            className="input-title"
                        />
                        <NoteDropdown
                            selectedValue={noteType}
                            onSelect={(value) => setNoteType(value)}
                        />
                    </div>
                    {noteType === 'NoteTxt' && (
                        <input
                            placeholder="Take a note..."
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                        />
                    )}
                    {(noteType === 'NoteImg' || noteType === 'NoteVideo') && (
                        <React.Fragment>
                            <input
                                type="text"
                                placeholder="Media URL"
                                value={mediaLink}
                                onChange={(e) => setMediaLink(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Text under media"
                                value={newNoteText}
                                onChange={(e) => setNewNoteText(e.target.value)}
                            />
                        </React.Fragment>
                    )}
                    {noteType === 'NoteTodos' && (
                        <input
                            type="text"
                            placeholder="To-dos (comma separated)"
                            value={todos}
                            onChange={(e) => setTodos(e.target.value)}
                        />
                    )}
                    <button onClick={handleCreate}>Create</button>
                </div>
            ) : (
                <div onClick={() => setIsExpanded(true)}>
                    <input
                        placeholder="Take a note..."
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                    />
                </div>
            )}
        </div>
    )
}