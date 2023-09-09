import { bookService } from "../services/book.service.js"
// import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

import { LongTxt } from "../cmps/LongTxt.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { AddReview } from "../cmps/AddReview.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [isReview, setIsReview] = useState(false)
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
            })

        bookService.getNextBookId(bookId)
            .then(setNextBookId)
            .catch(err => {
                console.log('Failed to get next book ID', err)
            })

        bookService.getPrevBookId(bookId)
            .then(setPrevBookId)
            .catch(err => {
                console.log('Failed to get previous book ID', err)
            })
    }, [bookId])

    function onBack() {
        navigate('/book')
    }

    if (!book) return <div>Loading...</div>

    function getReadingLength(pageCount) {
        if (pageCount > 500) return "Serious Reading"
        if (pageCount > 200) return "Decent Reading"
        return "Light Reading"
    }

    function getVintageStatus(publishedDate) {
        const currentYear = new Date().getFullYear();
        if (currentYear - publishedDate > 10) return "Vintage"
        if (currentYear - publishedDate < 1) return "New"
        return ""
    }

    function getPriceColor(amount) {
        if (amount > 150) return "red"
        if (amount < 20) return "green"
        return "black"
    }

    function onAddReview(reviewToAdd) {
        console.log('review to add', reviewToAdd);
        return bookService.addReview(bookId, reviewToAdd)
            .then(updatedBook => {
                setBook(updatedBook)
                setIsReview(false)
                // showSuccessMsg('Review saved successfully')
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('Error saving review')
            })
    }

    function onDeleteReview(reviewId) {
        bookService
            .deleteReview(bookId, reviewId)
            .then(savedBook => {
                setBook(savedBook)
                // showSuccessMsg('Review deleted successfully')
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('Error deleting review')
                navigate('/book')
            })
    }


    return (
        <section className="book-details main-layout">
            <div className="navigation-buttons">
                {prevBookId && (
                    <button onClick={() => navigate(`/book/${prevBookId}`)}>
                        Previous Book
                    </button>
                )}
                <button onClick={onBack}>Back</button>
                {nextBookId && (
                    <button onClick={() => navigate(`/book/${nextBookId}`)}>
                        Next Book
                    </button>
                )}
            </div>

            {book.listPrice.isOnSale && <p className="on-sale">On Sale!!!</p>}
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <h3>Authors: {book.authors.join(', ')}</h3>
            <h4>Published Year: {book.publishedDate} {getVintageStatus(book.publishedDate)}</h4>
            <div className='book-description'>
                <LongTxt txt={book.description} length={100} />
            </div>
            <p>Page Count: {book.pageCount} ({getReadingLength(book.pageCount)})</p>
            <p>Book language: {book.language}</p>
            <p>Categories: {book.categories.join(', ')}</p>
            <p style={{ color: getPriceColor(book.listPrice.amount) }}>
                Price: {book.listPrice.amount} {book.listPrice.currencyCode}
            </p>
            <img src={`assets/img/${book.thumbnail}.jpg`} alt={book.title} />

            <button onClick={() => setIsReview(!isReview)}>Add Review</button>
            {isReview && <AddReview onAddReview={onAddReview} />}
            <section className='reviews main-layout'>
                <h4 className='reviews-title'>Reviews:</h4>
                {(book.reviews && book.reviews.length && (
                    <ReviewList reviews={book.reviews} onDeleteReview={onDeleteReview} />
                )) ||
                    'No Reviews'}
            </section>
        </section>
    )
}
