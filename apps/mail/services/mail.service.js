import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
import { noteService } from '../../note/services/note.service.js'

const EMAIL_KEY = 'emailDB'
var gFilterBy = { title: '', listPrice: 0 }
_createEmails()

export const EmailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getNextEmailId,
    getFilterBy,
    setFilterBy,
    createNoteFromEmail,
}

function query() {
    return asyncStorageService.query(EMAIL_KEY)
        .then(emails => {
            // if (gFilterBy.txt) {
            //     const regex = new RegExp(gFilterBy.txt, 'i')
            //     emails = emails.filter(email => regex.test(email.title))
            // }
            // if (gFilterBy.listPrice) {
            //     emails = emails.filter(email => email.listPrice.amount >= gFilterBy.listPrice)
            // }  
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
    return gFilterBy.listPrice
}

function setFilterBy(filterBy = {}) {
    // if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.listPrice !== undefined) gFilterBy.listPrice = filterBy.listPrice
    return gFilterBy
}

function getNextEmailId(emailId) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            var idx = emails.findIndex(email => email.id === emailId)
            if (idx === emails.length - 1) idx = -1
            return emails[idx + 1].id
        })
}

function _createEmails() {
    console.log('email created')
    let emails = storageService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails.push(_createEmail('bread', 'bread is good for fiber'
            , false, Date.now(), null, 'bread@bread.com', 'user@pegasus.com', false))
        emails.push(_createEmail('bready', 'bread is great'
            , false, Date.now(), null, 'breadtistic@bread123.com', 'user@pegasus.com', true))
        storageService.saveToStorage(EMAIL_KEY, emails)
    }
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

function _createEmail(subject, body, isRead = false, sentAt = null, removedAt = null, from = '', to = '', isStar = false) {
    const email = getEmptyEmail(subject, body, isRead, sentAt, removedAt, from, to, isStar)
    email.id = utilService.makeId()
    return email
}

function _setNextPrevEmailId(email) {
    return storageService.query(EMAIL_KEY).then((emails) => {
        const emailIdx = emails.findIndex((currEmail) => currEmail.id === email.id)
        const nextEmail = emails[emailIdx + 1] ? emails[emailIdx + 1] : emails[0]
        const prevEmail = emails[emailIdx - 1] ? emails[emailIdx - 1] : emails[emails.length - 1]
        email.nextEmailId = nextEmail.id
        email.prevEmailId = prevEmail.id
        return email
    })
}