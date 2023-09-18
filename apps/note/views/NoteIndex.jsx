import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { AddNote } from "../cmps/AddNote.jsx"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        loadNotes()
    }, [searchTerm, filterType])

    const toggleDarkMode = () => {
        setIsDarkMode(prevState => !prevState)
    }

    const loadNotes = async () => {
        const filterBy = { txt: searchTerm, type: filterType }
        const fetchedNotes = await noteService.query(filterBy)
        setNotes(fetchedNotes)
    }

    const handleNoteAdded = (newNote) => {
        setNotes([...notes, newNote])
    }

    return (
        <div className={`note-page ${isDarkMode ? 'dark-mode' : ''}`}>
            <aside className='note-sidebar'>
                <ul>
                    <li><button><i className="fa-regular fa-lightbulb"></i></button></li>
                    <li><button><i className="fa-regular fa-bell"></i></button></li>
                    <li><button><i className="fa-solid fa-pencil"></i></button></li>
                    <li><button><i className="fa-solid fa-box-archive"></i></button></li>
                    <li><button><i className="fa-regular fa-trash-can"></i></button></li>
                    <li><button><i className="fa-regular fa-circle-question"></i></button></li>
                    <li>
                        <button onClick={toggleDarkMode}>
                            <i className={isDarkMode ? "fa-solid fa-moon" : "fa-regular fa-sun"}></i>
                        </button>
                    </li>
                </ul>
            </aside>
            <div className='note-content'>
                <div>
                    <NoteFilter
                        onSearchChange={setSearchTerm}
                        onFilterTypeChange={setFilterType}
                        searchTerm={searchTerm}
                        filterType={filterType}
                    />
                </div>
                <main>
                    <AddNote onNoteAdded={handleNoteAdded} />
                    <NoteList notes={notes} setNotes={setNotes} />
                </main>
            </div>
        </div>
    )
}