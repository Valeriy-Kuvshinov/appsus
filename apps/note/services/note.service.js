import { asyncStorageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    createNote,
    getEmptyNote,
    togglePin,
}

function query(filterBy = {}) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => {
                    return regExp.test(note.info.title) ||
                        (note.info.txt && regExp.test(note.info.txt)) ||
                        (note.info.todos && note.info.todos.some(todo => regExp.test(todo.txt)))
                })
            }
            if (filterBy.type && filterBy.type !== 'all') {
                notes = notes.filter(note => note.type === filterBy.type)
            }
            return notes
        })
}

function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) return asyncStorageService.put(NOTE_KEY, note)
    else return asyncStorageService.post(NOTE_KEY, note)
}

function togglePin(noteId) {
    return get(noteId).then(note => {
        note.isPinned = !note.isPinned
        return save(note)
    })
}

function createNote(type, info, isPinned = false, style = { backgroundColor: '#FFFFFF' }) {
    const newNote = getEmptyNote()
    newNote.id = utilService.makeId()
    newNote.type = type
    newNote.info = info
    newNote.isPinned = isPinned
    newNote.style = style
    newNote.createdAt = Date.now()

    return asyncStorageService.post(NOTE_KEY, newNote)
        .then(savedNote => {
            return savedNote
        })
}

function getEmptyNote() {
    return {
        id: '',
        createdAt: null,
        type: '',
        isPinned: false,
        style: {},
        info: {}
    }
}

function _createNotes() {
    let notes = loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                info: {
                    title: 'Yes Fullstack!',
                    txt: 'Fullstack Me Baby!'
                },
                style: { backgroundColor: '#FF6B6B' },
                labels: []
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    title: 'Bobi and Me',
                    url: 'https://images.unsplash.com/photo-1522098635833-216c03d81fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJpZW5kfGVufDB8fDB8fHww&w=1000&q=80',
                    txt: 'Friends forever'
                },
                style: { backgroundColor: '#98FB98' },
                labels: []
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                },
                style: { backgroundColor: '#9097f8' },
                labels: []
            },
            {
                id: 'n104',
                type: 'NoteVideo',
                isPinned: true,
                info: {
                    title: 'Cat Video',
                    url: 'https://www.youtube.com/watch?v=YLv9kot4lzE',
                    txt: 'so cute!'
                },
                style: { backgroundColor: '#D8BFD8' },
                labels: []
            },
            {
                id: 'n105',
                createdAt: Date.now(),
                type: 'NoteTxt',
                isPinned: true,
                info: {
                    title: 'Reminder',
                    txt: 'To add MissBooks to the project.'
                },
                style: { backgroundColor: '#dfaf84' },
                labels: []
            },
            {
                id: 'n106',
                createdAt: Date.now(),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    title: 'Nature',
                    url: 'https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/hz4mzyf4iktjywa59nfp',
                    txt: 'So refreshing'
                },
                style: { backgroundColor: '#FFFFE0' },
                labels: []
            },
            {
                id: 'n107',
                createdAt: Date.now(),
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Weekend Plans',
                    todos: [
                        { txt: 'Hiking', doneAt: null },
                        { txt: 'Reading', doneAt: null }
                    ]
                },
                style: { backgroundColor: '#E0FFFF' },
                labels: []
            },
            {
                id: 'n108',
                createdAt: Date.now(),
                type: 'NoteVideo',
                isPinned: true,
                info: {
                    title: 'Funny Video',
                    url: 'https://www.youtube.com/watch?v=EcMlX_36gjs',
                    txt: 'Hilarious!'
                },
                style: { backgroundColor: '#6cbcfd' },
                labels: []
            }
        ]
        saveToStorage(NOTE_KEY, notes)
    }
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    return JSON.parse(json)
}

function saveToStorage(key, val) {
    const json = JSON.stringify(val)
    localStorage.setItem(key, json)
}