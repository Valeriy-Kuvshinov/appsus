import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
import { noteService } from '../../note/services/note.service.js'

const EMAIL_KEY = 'emailDB'
var gFilterBy = {isStar: false, isRead: false, isTrash: false, isSent: false, isDraft: false}
_createEmails()

export const EmailService = {
    query,
    get,
    remove,
    save,
    trash,
    getEmptyEmail,
    getFilterBy,
    setFilterBy,
    createNoteFromEmail,
}

function query() {
    return asyncStorageService.query(EMAIL_KEY)
        .then(emails => {
            if (gFilterBy.isStar) {
                emails = emails.filter(email => email.isStar)
            }
            else if (gFilterBy.isRead) {
                emails = emails.filter(email => email.isRead)
            }
            else if (gFilterBy.isTrash) {
                emails = emails.filter(email => email.removedAt!==null)
            }
            else if (gFilterBy.isSent) {
                emails = emails.filter(email => email.sentAt!==null)
            }
            else if (gFilterBy.isDraft) {
                emails = emails.filter(email => (email.sentAt===null)&&(email.removedAt===null))
            } else {
                emails = emails.filter(email => email.removedAt===null)
            }
            return emails
        })
}

function get(emailId) {
    return asyncStorageService.get(EMAIL_KEY, emailId)
        .then((email) => {
            // email = _setNextPrevEmailId(email)
            return email
        })
}

function remove(emailId) {
    return asyncStorageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return asyncStorageService.put(EMAIL_KEY, email)
    } else {
        return asyncStorageService.post(EMAIL_KEY, email)
    }
}

function getEmptyEmail(subject, body, isRead = false, sentAt = null, removedAt = null, from = '', to = '', isStar = false) {
    return { id: '', subject, body, isRead, sentAt, removedAt, from, to, isStar }
}

function getFilterBy() {
    // return gFilterBy.listPrice
}

function setFilterBy(filterType = '') {
    if (filterType === 'starred') {
        gFilterBy.isStar = true
    } else {
        gFilterBy.isStar = false
    }
    if (filterType === 'read') {
        gFilterBy.isRead = true
    } else {
        gFilterBy.isRead = false
    }
    if (filterType==='trash') {
        gFilterBy.isTrash = true
    }  else {
        gFilterBy.isTrash = false
    }
    if (filterType==='sent') {
        gFilterBy.isSent = true
    }  else {
        gFilterBy.isSent = false
    }
    if (filterType==='drafts') {
        gFilterBy.isDraft = true
    }  else {
        gFilterBy.isDraft = false
    }
    return gFilterBy
}

function trash(email){
    email.removedAt=Date.now()
    save(email)
}

function _createEmails() {
    console.log('email created')
    let emails = storageService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails.push(_createEmail('bread', 'bread is good for fiber'
            , false, Date.now(), null, 'bread@bread.com', 'user@pegasus.com', false))
        emails.push(_createEmail('bready', 'bread is great'
            , false, Date.now(), Date.now(), 'breadtistic@bread123.com', 'user@pegasus.com', true))
        emails.push(_createEmail('Mark Zuckerberg', 'i am a human'
            , false, Date.now(), null, 'totallyahuman@.com', 'user@pegasus.com', true))
        emails.push(_createEmail('Donald Trump', 'fake news!'
                , false, null, null, 'realdonaldtrump@money.com', 'user@pegasus.com', false))
        storageService.saveToStorage(EMAIL_KEY, emails)
    }
}

function _createEmail(subject, body, isRead = false, sentAt = null, removedAt = null, from = '', to = '', isStar = false) {
    const email = getEmptyEmail(subject, body, isRead, sentAt, removedAt, from, to, isStar)
    email.id = utilService.makeId()
    return email
}

function createNoteFromEmail(emailId) {
    return get(emailId)
        .then(email => {
            const noteInfo = {
                title: email.subject,
                txt: email.body
            }
            return noteService.createNote('NoteTxt', noteInfo)
        })
}
