import { showErrorMsg, eventBusService } from "../../../services/event-bus.service.js"

export const NoteValidator = ({ newNoteTitle, noteType, newNoteText, mediaLink, todos }) => {
    let errorMessage = ''

    if (!newNoteTitle) {
        errorMessage = 'Title cannot be empty'
        showErrorMsg(errorMessage)
    } else if (noteType === 'NoteTxt' && !newNoteText) {
        errorMessage = 'Note text cannot be empty'
        showErrorMsg(errorMessage)
    } else if ((noteType === 'NoteImg' || noteType === 'NoteVideo') && !mediaLink) {
        errorMessage = 'Media URL cannot be empty'
        showErrorMsg(errorMessage)
    } else if (noteType === 'NoteTodos' && !todos) {
        errorMessage = 'Todos cannot be empty'
        showErrorMsg(errorMessage)
    }

    if (errorMessage) {
        eventBusService.emit('show-user-msg', { txt: errorMessage, type: 'error' })
    }

    return {
        isValid: !errorMessage,
        errorMessage
    }
}