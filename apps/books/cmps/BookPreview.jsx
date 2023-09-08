
export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>{book.title || 'N/A'}</h2>
            <h4>Author: {Array.isArray(book.authors) ? book.authors.join(', ') : (book.authors || 'N/A')}</h4>
            <h4>Published Year: {book.publishedDate || 'N/A'}</h4>
            <h4>Price: {book.listPrice.amount || 'N/A'} {book.listPrice.currencyCode || 'N/A'}</h4>
            <img src={`assets/img/${book.thumbnail}.jpg`} alt={book.title || 'N/A'} />
        </article>
    )
}