
export const NoteValidator = ({ newNoteTitle, noteType, newNoteText, mediaLink, todos }) => {
    let errorMessage = ''

    if (!newNoteTitle) {
        errorMessage = 'Title cannot be empty'
    } else if (noteType === 'NoteTxt' && !newNoteText) {
        errorMessage = 'Note text cannot be empty'
    } else if ((noteType === 'NoteImg' || noteType === 'NoteVideo') && !mediaLink) {
        errorMessage = 'Media URL cannot be empty'
    } else if (noteType === 'NoteTodos' && !todos) {
        errorMessage = 'Todos cannot be empty'
    }

    return {
        isValid: !errorMessage,
        errorMessage
    }
}