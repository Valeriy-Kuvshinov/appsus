import { bookService } from '../services/book.service.js'
import { StarRating } from './StarRating.jsx'
// import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useState } = React

export function AddReview({ onAddReview }) {
    const [reviewToEdit, setReviewToEdit] = useState(bookService.getEmptyReview())

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }
        setReviewToEdit(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()

        if (typeof onAddReview !== 'function') {
            console.error("onAddReview is not a function")
            return
        }
        onAddReview(reviewToEdit)
            .then(() => {
                // showSuccessMsg('Review successfully added!')
                setReviewToEdit(bookService.getEmptyReview())
            })
            .catch((err) => {
                // showErrorMsg('Failed to add review.')
                console.error('Error:', err)
            })
    }

    const { fullname, readAt } = reviewToEdit

    return (
        <section className='book-edit'>
            <form onSubmit={onSaveReview}>
                <label htmlFor='fullname'>Fullname:</label>
                <input
                    onChange={handleChange}
                    value={fullname}
                    type='text'
                    name='fullname'
                    id='fullname'
                    required
                />

                <StarRating handleChange={handleChange} />

                <label htmlFor='readAt'>Read at:</label>
                <input
                    onChange={handleChange}
                    value={readAt}
                    type='date'
                    name='readAt'
                    id='readAt'
                    required
                />

                <button>Save</button>
            </form>
        </section>
    )
}