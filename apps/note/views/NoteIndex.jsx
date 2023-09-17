
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { AddNote } from "../cmps/AddNote.jsx"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('all')

    useEffect(() => {
        loadNotes()
    }, [searchTerm, filterType])

    const loadNotes = async () => {
        const filterBy = { txt: searchTerm, type: filterType }
        const fetchedNotes = await noteService.query(filterBy)
        setNotes(fetchedNotes)
    }

    const handleNoteAdded = (newNote) => {
        setNotes([...notes, newNote])
    }

    return (
        <div className='note-page'>
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
    )
}