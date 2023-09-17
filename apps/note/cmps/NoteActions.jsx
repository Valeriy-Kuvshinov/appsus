import { ColorPicker } from "./ColorPicker.jsx"
const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteActions({ isEditing, changeBackgroundColor, setIsEditing, saveChanges
    , onDuplicate, note, onDelete, handleAddTodo, addLabel }) {
    const mailSubject = encodeURIComponent(note.info.title || "")
    const mailBody = encodeURIComponent(note.info.txt || "")
    const mailtoLink = `/mail/compose?subject=${mailSubject}&body=${mailBody}`
    const [isLabelDropdownVisible, setLabelDropdownVisible] = useState(false)

    const labels = [
        { type: 'Critical', style: { backgroundColor: '#fd2c2c' } },
        { type: 'Family', style: { backgroundColor: '#55adff' } },
        { type: 'Work', style: { backgroundColor: '#59c044' } },
        { type: 'Friends', style: { backgroundColor: '#f3f167' } },
        { type: 'Spam', style: { backgroundColor: '#f1a518' } },
        { type: 'Memories', style: { backgroundColor: '#7942ac' } },
        { type: 'Romantic', style: { backgroundColor: '#1e8bf0' } }
    ]
    const alreadyAddedLabels = note.labels || []
    const availableLabels = labels.filter(
        label => !alreadyAddedLabels.some(
            addedLabel => addedLabel.type === label.type
        )
    )
    const onLabelClick = (label) => {
        addLabel(label)
        setLabelDropdownVisible(false)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (isLabelDropdownVisible && !event.target.closest('.label-dropdown')) {
                setLabelDropdownVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isLabelDropdownVisible])

    return (
        <div className={`actions`}>
            <ColorPicker changeBackgroundColor={changeBackgroundColor} />
            <button
                onClick={() => setLabelDropdownVisible(!isLabelDropdownVisible)}
                disabled={availableLabels.length === 0}
            >
                <i className="fa-solid fa-tags"></i>
            </button>
            <div className={`label-dropdown ${isLabelDropdownVisible ? 'active' : ''}`}>
                {availableLabels.map((label) => (
                    <div
                        key={label.type}
                        className="label-option"
                        style={label.style}
                        onClick={() => onLabelClick(label)}
                    >
                        {label.type}
                    </div>
                ))}
            </div>
            {!isEditing && <button onClick={() => setIsEditing(true)}><i className="fa-solid fa-pen-to-square"></i></button>}
            {isEditing && note.type === 'NoteTodos' && <button onClick={handleAddTodo}><i className="fa-solid fa-square-plus"></i></button>}
            {isEditing && <button onClick={saveChanges} >Save</button>}
            {!isEditing && <button onClick={() => onDuplicate(note)}><i className="fa-solid fa-copy"></i></button>}
            {!isEditing && (
                <Link to={mailtoLink}>
                    <button><i className="fa-solid fa-envelope"></i></button>
                </Link>
            )}
            {!isEditing && <button onClick={() => onDelete(note.id)}><i className="fa-solid fa-rectangle-xmark"></i></button>}
        </div>
    )
}