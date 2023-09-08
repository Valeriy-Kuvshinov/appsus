export function ReviewPreview({ review, onDeleteReview }) {
    function renderStars(rating) {
        const starIcons = []
        for (let i = 0; i < rating; i++) {
            starIcons.push(
                <i
                    className='fa-solid fa-star fa-lg'
                    style={{ color: '#ffee00' }}
                    key={i}
                ></i>
            )
        }
        return starIcons
    }

    const { id, fullname, rating, readAt } = review
    return (
        <article className='review-preview'>
            <li>Fullname: {fullname}</li>
            <li>Rating: {renderStars(rating)}</li>
            <li>Read At: {readAt}</li>
            <button onClick={() => onDeleteReview(id)} className='review-delete-button'>Delete</button>
        </article>
    )
}

