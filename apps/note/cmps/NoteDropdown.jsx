
const { useState } = React

export function NoteDropdown({ selectedValue, onSelect }) {
    const [isOpen, setIsOpen] = useState(false)

    const options = [
        { value: 'NoteTxt', icon: 'fa-solid fa-t', label: 'Text' },
        { value: 'NoteImg', icon: 'fa-solid fa-image', label: 'Image' },
        { value: 'NoteVideo', icon: 'fa-solid fa-file-video', label: 'Video' },
        { value: 'NoteTodos', icon: 'fa-solid fa-list-ul', label: 'To-dos' },
    ]

    return (
        <div className="note-type-dropdown" onClick={() => setIsOpen(!isOpen)}>
            <div className="note-type-dropdown-header">
                {
                    ((options.find(opt => opt.value === selectedValue) || {}).icon)
                        ? <i className={options.find(opt => opt.value === selectedValue).icon}></i>
                        : 'Select an option'
                }
            </div>
            {isOpen && (
                <div className="note-type-dropdown-options">
                    {options.map((option) => (
                        <div key={option.value} className="note-type-dropdown-option" onClick={() => onSelect(option.value)}>
                            <i className={option.icon}></i>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}