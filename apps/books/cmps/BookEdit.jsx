
import { bookService } from "../services/book.service.js"
// import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function BookEdit() {
    const [newBook, setNewBook] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()
    console.log("Current bookId:", bookId)

    useEffect(() => {
        if (bookId) {
            bookService.get(bookId).then((book) => {
                console.log("Fetched book structure:", JSON.stringify(book, null, 2));
                setNewBook({
                    ...book,
                    authors: book.authors.join(", "),
                    categories: book.categories.join(", ")
                })
            })
                .catch(error => {
                    console.error('Failed to fetch book:', error);
                })
        }
    }, [bookId])

    const handleChange = ({ target }) => {
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        if (name.includes(',')) {
            const [parent, child] = name.split(',')
            let newValue = value
            if (parent === 'listPrice' && child === 'amount') newValue = Number(value)

            setNewBook({
                ...newBook,
                [parent]: {
                    ...newBook[parent],
                    [child]: newValue
                }
            })
        } else {
            setNewBook({
                ...newBook,
                [name]: value,
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Transform the string fields to array
        const authorsArray = newBook.authors.split(',')
        const categoriesArray = newBook.categories.split(',')

        const bookToSubmit = {
            ...newBook,
            authors: authorsArray,
            categories: categoriesArray,
            pageCount: Number(newBook.pageCount),
            listPrice: {
                ...newBook.listPrice,
                amount: Number(newBook.listPrice.amount)
            }
        }
        console.log("handleSubmit amount type: ", typeof bookToSubmit.listPrice.amount)
        console.log("Submitting book: ", JSON.stringify(bookToSubmit, null, 2))

        if (bookId) {
            bookService.save(bookToSubmit)
                .then(() => {
                    console.log("Book Updated")
                    // showSuccessMsg('Book successfully updated!')
                    navigate('/book')
                })
                .catch(error => {
                    console.error('Failed to update book:', error)
                    // showErrorMsg('Failed to update the book.')
                })
        } else {
            bookService.createBook(bookToSubmit)
                .then(book => {
                    console.log("New Book Created", book)
                    // showSuccessMsg('Book successfully Added!')
                    navigate('/book')
                })
                .catch(error => {
                    console.error('Failed to create new book:', error)
                    // showErrorMsg('Failed to add book.')
                })
        }
    }

    return (
        <div className='editor-wrapper'>
            <form className="editor-container main-layout" onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input name="title" value={newBook.title} onChange={handleChange} type="text" placeholder="Book Title" required />
                </label>

                <label>
                    Subtitle:
                    <input name="subtitle" value={newBook.subtitle} onChange={handleChange} type="text" placeholder="Book Subtitle" required />
                </label>

                <label>
                    Authors (comma-separated):
                    <input name="authors" value={newBook.authors} onChange={handleChange} type="text" placeholder="Author1, Author2" required />
                </label>

                <label>
                    Published Date:
                    <input name="publishedDate" value={newBook.publishedDate} onChange={handleChange} type="number" placeholder="1999" required />
                </label>

                <label>
                    Description:
                    <textarea name="description" value={newBook.description} onChange={handleChange} placeholder="Enter book description here" required></textarea>
                </label>

                <label>
                    Page Count:
                    <input name="pageCount" value={newBook.pageCount} onChange={handleChange} type="number" placeholder="200" required />
                </label>

                <label>
                    Categories (comma-separated):
                    <input name="categories" value={newBook.categories} onChange={handleChange} type="text" placeholder="Fiction, Adventure" required />
                </label>

                <label>
                    Language:
                    <select name="language" value={newBook.language} onChange={handleChange} required>
                        <option value="en">English</option>
                        <option value="de">German</option>
                        <option value="es">Spanish</option>
                        <option value="ru">Russian</option>
                    </select>
                </label>

                <label>
                    Price:
                    <input name="listPrice,amount" value={newBook.listPrice.amount} onChange={handleChange} type="number" placeholder="100" required />
                </label>

                <label>
                    Is On Sale:
                    <input
                        name="listPrice,isOnSale"
                        onChange={handleChange}
                        type="checkbox"
                        checked={newBook.listPrice.isOnSale === true}
                    />
                </label>

                <button type="submit">Submit Book</button>
            </form>
        </div>
    )
}