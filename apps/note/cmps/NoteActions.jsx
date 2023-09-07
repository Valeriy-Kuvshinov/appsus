const { Link } = ReactRouterDOM

export function NoteActions({ isEditing, isPinned, changeBackgroundColor, setIsEditing, saveChanges, onDuplicate, note, onDelete, handleAddTodo }) {
    const mailSubject = encodeURIComponent(note.info.title || "")
    const mailBody = encodeURIComponent(note.info.txt || "")
    const mailtoLink = `/mail/compose?subject=${mailSubject}&body=${mailBody}`

    return (
        <div className={`actions`}>
            <div className="color-picker-dropdown">
                <button><i className="fa-solid fa-palette"></i></button>
                <div className="color-picker-content">
                    <div className="color-box" onClick={() => changeBackgroundColor("#FFFFFF")} style={{ background: 'transparent' }}><i className="fa-solid fa-droplet-slash"></i></div>
                    <div className="color-box" onClick={() => changeBackgroundColor("#FF6B6B")} style={{ backgroundColor: "#FF6B6B" }}></div>
                    <div className="color-box" onClick={() => changeBackgroundColor("#98FB98")} style={{ backgroundColor: "#98FB98" }}></div>
                    <div className="color-box" onClick={() => changeBackgroundColor("#9097f8")} style={{ backgroundColor: "#9097f8" }}></div>
                    <div className="color-box" onClick={() => changeBackgroundColor("#D8BFD8")} style={{ backgroundColor: "#D8BFD8" }}></div>
                    <div className="color-box" onClick={() => changeBackgroundColor("#dfaf84")} style={{ backgroundColor: "#dfaf84" }}></div>
                    <div className="color-box" onClick={() => changeBackgroundColor("#FFFFE0")} style={{ backgroundColor: "#FFFFE0" }}></div>
                    <div className="color-box" onClick={() => changeBackgroundColor("#E0FFFF")} style={{ backgroundColor: "#E0FFFF" }}></div>
                    <div className="color-box" onClick={() => changeBackgroundColor("#6cbcfd")} style={{ backgroundColor: "#6cbcfd" }}></div>
                    <div className="color-box" onClick={() => changeBackgroundColor("#FFB6C1")} style={{ backgroundColor: "#FFB6C1" }}></div>
                    <div className="color-box" onClick={() => changeBackgroundColor("#dbf36f")} style={{ backgroundColor: "#dbf36f" }}></div>
                    <div className="color-box" onClick={() => changeBackgroundColor("#e99b7c")} style={{ backgroundColor: "#e99b7c" }}></div>
                </div>
            </div>
            <button><i className="fa-solid fa-tags"></i></button>
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