import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
import { booksData } from './books-database.js'

const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getNextBookId,
    getPrevBookId,
    getEmptyBook,
    getEmptyReview,
    getDefaultFilter,
    addReview,
    deleteReview,
    createBook,
    addGoogleBook
}

function query(filterBy = {}) {
    return asyncStorageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) { // Filter by text in title
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice) { // Filter by minimum price
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            if (filterBy.maxPrice) { // Filter by maximum price
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            if (filterBy.language) { // Filter by selected language
                books = books.filter(book => book.language === filterBy.language)
            }
            if (filterBy.publishedBefore) { // Filter by published before a certain year
                books = books.filter(book => book.publishedDate <= filterBy.publishedBefore)
            }
            if (filterBy.publishedAfter) { // Filter by published after a certain year
                books = books.filter(book => book.publishedDate >= filterBy.publishedAfter)
            }
            if (filterBy.category) { // Filter by selected category
                books = books.filter(book => book.categories.includes(filterBy.category))
            }
            if (filterBy.author) { // Filter by selected author
                books = books.filter(book => book.authors.includes(filterBy.author))
            }
            return books
        })
}

function getDefaultFilter() {
    return {
        txt: '',
        minPageCount: ''
    }
}

function get(bookId) {
    return asyncStorageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return asyncStorageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) return asyncStorageService.put(BOOK_KEY, book)
    else return asyncStorageService.post(BOOK_KEY, book)
}

function getNextBookId(bookId) {
    return asyncStorageService.query(BOOK_KEY).then(books => {
        var idx = books.findIndex(book => book.id === bookId)
        if (idx === books.length - 1) idx = -1
        return books[idx + 1].id
    })
}

function getPrevBookId(bookId) {
    return asyncStorageService.query(BOOK_KEY).then(books => {
        const idx = books.findIndex(book => book.id === bookId)
        if (idx === 0) return books[books.length - 1].id
        return books[idx - 1].id
    })
}

function addReview(bookId, review) {
    return new Promise((resolve, reject) => {
        review = { ...review }
        review.id = utilService.makeId()

        get(bookId)
            .then(book => {
                if (book.reviews) book.reviews.push(review)
                else book.reviews = [review]

                return asyncStorageService.put(BOOK_KEY, book)
            })
            .then(resolve)
            .catch(reject)
    })
}

function deleteReview(bookId, reviewId) {
    return get(bookId).then(book => {
        book.reviews = book.reviews.filter(review => review.id !== reviewId)
        return asyncStorageService.put(BOOK_KEY, book)
    })
}

function getEmptyReview() {
    return {
        fullname: '',
        rating: '',
        readAt: ''
    }
}

function addGoogleBook(bookName = 'bread') {
    const url2 = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
    return axios.get(url2).then((res) => { return (res.data.items).splice(0, 5) })
}

function _createBooks() {
    let books = storageService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksData
        storageService.saveToStorage(BOOK_KEY, books)
    }
}

function createBook({ title, subtitle, authors, publishedDate, description, pageCount
    , categories, thumbnail, language, amount = 0, currencyCode = 'USD', isOnSale = true }) {
    // Type checking
    // if (typeof title !== 'string') throw new Error('Title should be a string')
    const book = getEmptyBook({
        id: utilService.makeId(), title, subtitle, authors, publishedDate, description,
        pageCount, categories, thumbnail, language, listPrice: { amount, currencyCode, isOnSale, }
    })
    return asyncStorageService.post(BOOK_KEY, book)
        .then(savedBook => {
            return savedBook
        })
}

function getEmptyBook(title = '', description, pageCount, publishedDate = new Date(), listPrice = { amount: 0, currencyCode: 'USD', isOnSale: true }, imageURL = '', subtitle, language, authors) {
    return {
        id: '',
        title,
        subtitle,
        authors,
        publishedDate,
        description,
        pageCount,
        categories: [],
        thumbnail: '6',
        imageURL,
        language,
        listPrice
    }
}