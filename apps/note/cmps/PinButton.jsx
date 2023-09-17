import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React

export function PinButton({ note, onSave }) {
    const [isPinned, setIsPinned] = useState(note.isPinned)

    const handlePin = async () => {
        await noteService.togglePin(note.id)
        setIsPinned(!isPinned)

        const updatedNote = { ...note, isPinned: !isPinned, style: note.style }
        onSave(updatedNote)
        if (!isPinned) showSuccessMsg('Note pinned')
        else showSuccessMsg('Note unpinned')
    }

    useEffect(() => {
        setIsPinned(note.isPinned)
    }, [note.isPinned])

    return (
        <button onClick={handlePin} className="pin-button">
            <i className={`fa-solid fa-thumbtack ${isPinned ? 'pinned' : ''}`}></i>
        </button>
    )
}