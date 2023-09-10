
import { bookService } from "../services/book.service.js"
import { utilService } from "../../../services/util.service.js"

const { useState } = React

export function BookAdd() {
    const [books, setBooks] = useState([])

    if (books.length === 0) {
        bookService.addGoogleBook().then((books) => setBooks(books))
    }
    function search() {
        const search = document.getElementById('search').value
        if (search === '') return
        bookService.addGoogleBook(search).then((books) => setBooks(books))
    }

    function addBook(ev) {
        // console.log('add')
        var index = books.findIndex(book => book.id === ev.target.id)
        var book = bookService.getEmptyBook(
            books[index].volumeInfo.title,
            books[index].volumeInfo.description,
            books[index].volumeInfo.pageCount,
            books[index].volumeInfo.publishedDate,
            {
                amount: utilService.getRandomIntInclusive(10, 30),
                currencyCode: 'USD',
                isOnSale: (books[index].saleInfo.saleability === 'NOT_FOR_SALE') ? false : true
            },
            (books[index].volumeInfo.imageLinks !== undefined) ? (books[index].volumeInfo.imageLinks.thumbnail) : 'no picture',
            books[index].volumeInfo.subtitle,
            books[index].volumeInfo.language,
            books[index].volumeInfo.authors[0]
        )
        bookService.save(book)
    }
    return <section className='main-layout book-add-section'>
        <div className='book-add-search'>
            <input type="search" placeholder="type book name" id="search"></input>
            <button onClick={search}><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <section>
            <ul>
                {books.length && books.map((book) =>
                    <li key={book.id} className="book-to-add">
                        {book.volumeInfo.title}
                        <button onClick={addBook} id={book.id}><i className="fa-solid fa-square-plus"></i></button>
                    </li>)}
            </ul>
        </section>
    </section>
}