import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
// import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        bookService.query(filterBy).then((books) => {
            // console.log('Books: ', books)
            setBooks(books)
        })
    }, [filterBy])

    function onRemoveBook(bookId) {
        bookService
            .remove(bookId)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
                // showSuccessMsg(`Book removed!`)
            })
            .catch((err) => {
                console.error(err)
                // showErrorMsg(`Failed to remove book.`)
            })
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilterBy }));
    }

    if (!books) return <div>Loading...</div>;

    return (
        <section className='book-index main-layout'>
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}