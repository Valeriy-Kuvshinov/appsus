
export function BookPreview({ book }) {
    var isThereImgURL=(book.imageURL!==undefined)
    return (
        <article className="book-preview">
            <h2>{book.title || 'N/A'}</h2>
            <h4>Author: {Array.isArray(book.authors) ? book.authors.join(', ') : (book.authors || 'N/A')}</h4>
            <h4>Published Year: {book.publishedDate || 'N/A'}</h4>
            <h4>Price: {book.listPrice.amount || 'N/A'} {book.listPrice.currencyCode || 'N/A'}</h4>
            <img src = {(isThereImgURL===false) ? `imgs/${book.thumbnail}.jpg` : book.imageURL}/>
        </article>
    )
}