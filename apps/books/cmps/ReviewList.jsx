import { ReviewPreview } from "./ReviewPreview.jsx"

export function ReviewList({ reviews, onDeleteReview }) {
    return (
        <section className='review-list'>
            <ul>
                {reviews.map(review => (
                    <ReviewPreview
                        key={review.id}
                        review={review}
                        onDeleteReview={onDeleteReview}
                    />
                ))}
            </ul>
        </section>
    )
}