
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
        const fetchedNotes = await noteService.query({ txt: searchTerm, type: filterType })
        setNotes(fetchedNotes)
    }

    const handleNoteAdded = () => {
        loadNotes()
    }

    return (
        <div>
            <h1>MissKeep</h1>

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
                <NoteList notes={notes} />
            </main>
        </div>
    )
}