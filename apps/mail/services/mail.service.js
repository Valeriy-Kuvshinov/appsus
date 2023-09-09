import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
import { noteService } from '../../note/services/note.service.js'

const EMAIL_KEY = 'emailDB'
var gFilterBy = {isStar: false, isRead: false, isTrash: false, isSent: false, isDraft: false}
var gFilterBy2= {byDate: false, bySubject: false}
// _createEmails()

export const EmailService = {
    query,
    get,
    remove,
    save,
    trash,
    read,
    star,
    getEmptyEmail,
    getFilterBy,
    setFilterBy,
    setFilterBy2,
    resetFilters,
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
            } 

            if (gFilterBy2.byDate) {
                emails = sortBy(emails,'sentAt',-1)
            }
            else if (gFilterBy2.bySubject) {
                emails = sortBy(emails,'subject',1)
            }
            // else {
            //     emails = emails.filter(email => email.removedAt===null)
            // }
            return emails
        })
}

function sortBy(items, key , dir){
    const isStrings=['subject']
    if(isStrings.includes(key)){
        items.sort((a,b)=>(a[key].localeCompare(b[key]))*dir) 
    } else {
        items.sort((a,b)=>(b[key]-a[key])*dir)
    }
    return items
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
}

function setFilterBy2(filterType = '') {
    if (filterType === 'Date') {
        gFilterBy2.byDate = true
    } else {
        gFilterBy2.byDate = false
    }
    if (filterType === 'Subject') {
        gFilterBy2.bySubject = true
    } else {
        gFilterBy2.bySubject = false
    }
}

function resetFilters(){
    gFilterBy.isStar = false
    gFilterBy.isSent = false
    gFilterBy.isDraft = false
    // gFilterBy2.byDate = false
    // gFilterBy2.bySubject = false
}

function trash(email){
    if(email.removedAt===null){
    email.removedAt=Date.now()
    save(email)
    } else {
        remove(email.id)
    }
}

function read(email){
    email.isRead=true
    save(email)
}

function star(email){
    if (email.isStar === false) {
        email.isStar = true 
    } else {
        email.isStar = false 
    } 
    save(email)
} 

function _createEmails() {
    console.log('email created')
    let emails = storageService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        var time=new Date()
        console.log(time)
        var time2
        if(time.getMinutes()<10){
            time2=`${time.getHours()}:0${time.getMinutes()}`
            if(time.getHours()<10){
                time2=`0${time.getHours()}:0${time.getMinutes()}`
            }
        } else if (time.getHours()<10){
          time2=`0${time.getHours()}:${time.getMinutes()}`
        } else {
            time2=`${time.getHours()}:${time.getMinutes()}`
        }
        emails.push(_createEmail('bread', 'bread is good for fiber'
            , false, time2, null, 'bread@bread.com', 'user@pegasus.com', false))
        emails.push(_createEmail('bready', 'bread is great'
            , false, time2, time2, 'breadtistic@bread123.com', 'user@pegasus.com', true))
        emails.push(_createEmail('mark Zuckerberg', 'i am a human'
            , false, time2, null, 'totallyahuman@.com', 'user@pegasus.com', true))
        emails.push(_createEmail('donald Trump', 'fake news!'
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
