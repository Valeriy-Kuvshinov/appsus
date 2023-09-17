import { showErrorMsg } from "../../../services/event-bus.service.js"

export const NoteValidator = ({ newNoteTitle, noteType, newNoteText, mediaLink, todos }) => {
    let isValid = true;

    if (!newNoteTitle) {
        showErrorMsg('Title cannot be empty')
        isValid = false
    } else if (noteType === 'NoteTxt' && !newNoteText) {
        showErrorMsg('Note text cannot be empty')
        isValid = false
    } else if ((noteType === 'NoteImg' || noteType === 'NoteVideo') && !mediaLink) {
        showErrorMsg('Media URL cannot be empty')
        isValid = false
    } else if (noteType === 'NoteTodos' && !todos) {
        showErrorMsg('Todos cannot be empty')
        isValid = false
    }

    return {
        isValid
    }
}