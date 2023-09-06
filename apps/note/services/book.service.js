import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const EMAIL_KEY = 'emailDB'
const BREAD_KEY = 'breadDB'
var gFilterBy = {title: '', listPrice: 0}
_createEmails()
const url='https://www.googleapis.com/emails/v1/volumes?printType=emails&q=effective%2520javascript'

export const EmailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getNextEmailId,
    getFilterBy,
    setFilterBy,
    addGoogleEmail
}

// addGoogleEmail()

function query() {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            // if (gFilterBy.txt) {
            //     const regex = new RegExp(gFilterBy.txt, 'i')
            //     emails = emails.filter(email => regex.test(email.title))
            // }
            if (gFilterBy.listPrice) {
                emails = emails.filter(email => email.listPrice.amount >= gFilterBy.listPrice)
            }  
            return emails
        })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
    .then((email) => 
    {
        email = _setNextPrevEmailId(email)
        return email
    })
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function addReview(emailId,review){
    storageService.put(EMAIL_KEY, email)
}

function getEmptyEmail(title = '',description,pageCount, publishedDate=new Date(), listPrice={amount:0,isOnSale:true},imageURL='') {
    return { id: '', title, description, pageCount, publishedDate, listPrice, imageURL}
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

function addGoogleEmail(emailName='bread'){
    const url2=`https://www.googleapis.com/emails/v1/volumes?printType=emails&q=${emailName}`
    return axios.get(url2).then((res)=>{return (res.data.items).splice(0,5)})
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails.push(_createEmail('breadland',' ',200, 2020, {amount:300,isOnSale:true},''))
        emails.push(_createEmail('james and the wheat field',' ',50, 1990, {amount:120,isOnSale:false},''))
        emails.push(_createEmail('Roei and the bread bakery',' ',1000, 2015, {amount:40,isOnSale:true},''))
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}

function _createEmail(title, description,pageCount,publishedDate=Date.now(), listPrice = {amount: 250,isOnSale: false},imageURL) {
    const email = getEmptyEmail(title, description, pageCount, publishedDate, listPrice, imageURL)
    email.id = utilService.makeId()
    return email
}

function _addId(email){
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