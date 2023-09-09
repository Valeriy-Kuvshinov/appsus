import { BookPreview } from "./BookPreview.jsx"
import { bookService } from "../services/book.service.js"
const { Link } = ReactRouterDOM

const { useState, useEffect } = React

export function BookList({onRemoveBook }) {
    const [books, getBooks] = useState([])
    useEffect(() => {
        // bookService.setFilterBy(params.filterType)
        bookService.query().then(books => getBooks(books))
    }, [])
    if(books.length===0)return
    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id || index}>
                    <BookPreview book={book} />
                    <section className="book-buttons">
                        <button onClick={() => onRemoveBook(book.id)}>
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                        <button>
                            <Link to={`/book/${book.id}`}>
                                <i className="fa-solid fa-circle-info"></i>
                            </Link>
                        </button>
                        <button>
                            <Link to={`/book/edit/${book.id}`}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                        </button>
                    </section>
                </li>
            )}
        </ul>
    )
}