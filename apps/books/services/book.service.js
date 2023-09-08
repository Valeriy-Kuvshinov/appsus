import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
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
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            // Filter by text in title
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            // Filter by minimum price
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            // Filter by maximum price
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            // Filter by selected language
            if (filterBy.language) {
                books = books.filter(book => book.language === filterBy.language)
            }
            // Filter by books published before a certain year
            if (filterBy.publishedBefore) {
                books = books.filter(book => book.publishedDate <= filterBy.publishedBefore)
            }
            // Filter by books published after a certain year
            if (filterBy.publishedAfter) {
                books = books.filter(book => book.publishedDate >= filterBy.publishedAfter)
            }
            // Filter by selected categories
            if (filterBy.category) {
                books = books.filter(book => book.categories.includes(filterBy.category));
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
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) return storageService.put(BOOK_KEY, book)
    else return storageService.post(BOOK_KEY, book)
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY).then(books => {
        var idx = books.findIndex(book => book.id === bookId)
        if (idx === books.length - 1) idx = -1
        return books[idx + 1].id
    })
}

function getPrevBookId(bookId) {
    return storageService.query(BOOK_KEY).then(books => {
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

                return storageService.put(BOOK_KEY, book)
            })
            .then(resolve)
            .catch(reject)
    })
}

function deleteReview(bookId, reviewId) {
    return get(bookId).then(book => {
        book.reviews = book.reviews.filter(review => review.id !== reviewId)
        return storageService.put(BOOK_KEY, book)
    })
}

function getEmptyReview() {
    return {
        fullname: '',
        rating: '',
        readAt: ''
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksData
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function createBook({ title, subtitle, authors, publishedDate, description, pageCount
    , categories, thumbnail, language, amount = 0, currencyCode = 'USD', isOnSale = true }) {
    // Type checking
    if (typeof title !== 'string') throw new Error('Title should be a string')

    const emptyBook = getEmptyBook()
    const newBook = {
        ...emptyBook,  // spread all properties of emptyBook into newBook
        id: utilService.makeId(),  // overwrite id
        title,  // overwrite title
        subtitle,
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
        thumbnail,
        language,
        listPrice: {
            amount,
            currencyCode,
            isOnSale,
        },
    }
    console.log('Creating book:', amount, typeof amount)

    return storageService.post(BOOK_KEY, newBook)
        .then(savedBook => {
            return savedBook
        })
}

function getEmptyBook() {
    return {
        id: '',
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: 1900,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
        pageCount: 0,
        categories: [],
        thumbnail: '6',
        language: 'en',
        listPrice: {
            amount: 0,
            currencyCode: 'USD',
            isOnSale: true
        }
    }
}