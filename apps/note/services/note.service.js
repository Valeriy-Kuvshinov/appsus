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
    getEmptyNote
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

function createNote(type, info, isPinned = false, style = {}) {
    const newNote = getEmptyNote()
    newNote.type = type
    newNote.info = info
    newNote.isPinned = isPinned
    newNote.style = style
    newNote.id = utilService.makeId()
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
                style: { backgroundColor: '#00d' },
                info: {
                    title: 'Yes Fullstack!',
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://images.unsplash.com/photo-1522098635833-216c03d81fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJpZW5kfGVufDB8fDB8fHww&w=1000&q=80',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
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
                }
            },
            {
                id: 'n104',
                type: 'NoteVideo',
                isPinned: false,
                info: {
                    //'https://www.youtube.com/watch?v=YLv9kot4lzE',
                    url: 'google.com',
                    title: 'Cat Video'
                },
                style: {
                    backgroundColor: '#00d'
                }
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