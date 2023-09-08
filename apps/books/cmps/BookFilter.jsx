const { useState, useEffect } = React

const categories = ["Fiction", "Thriller", "German Literature", "Psychological Fiction",
    "Classics", "Drama", "Fantasy", "Historical Fiction", "Russian Literature",
    "Psychological Thriller", "Adventure", "Classic Literature", "Romance",
    "Latino Literature", "Magical Realism", "Law", "Political Science",
    "Sovereignty", "Pets", "Emotional Healing", "Speculative Non-Fiction",
    "Self Help", "Paranormal", "Science Fiction", "Unknown", "Mystery",
    "Crime", "Supernatural", "Education", "Creative Writing", "Poetry",
    "Pop Culture", "DIY", "Family", "History", "Country Studies",
    "Biography", "Practical Advice", "Automotives", "Games", "Art",
    "Adult", "Business", "Personal Growth", "Self Help", "Politics & War",
    "Moral & Ethics", "Social Commentary", "Science & Technology"]

export function BookFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy, category: '' })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;
            case 'checkbox':
                value = target.checked
                break
            default:
                break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, minPrice, maxPrice, language, publishedBefore, publishedAfter, category } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter By:</h2>
            <form className="filter-form" onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title: </label>
                <input value={txt} onChange={handleChange} type="text" placeholder="By Title" id="txt" name="txt" />

                <label htmlFor="minPrice">Min Price: </label>
                <input value={minPrice} onChange={handleChange} type="number" min="0" placeholder="0" id="minPrice" name="minPrice" />

                <label htmlFor="maxPrice">Max Price: </label>
                <input value={maxPrice} onChange={handleChange} type="number" max="999" placeholder="999" id="maxPrice" name="maxPrice" />

                <label htmlFor="publishedBefore">Published Before: </label>
                <input value={publishedBefore} onChange={handleChange} type="number" max={new Date().getFullYear()} placeholder="2023" id="publishedBefore" name="publishedBefore" />

                <label htmlFor="publishedAfter">Published After: </label>
                <input value={publishedAfter} onChange={handleChange} type="number" min="1600" placeholder="1600" id="publishedAfter" name="publishedAfter" />

                <label htmlFor="language">Language: </label>
                <select value={language} onChange={handleChange} id="language" name="language">
                    <option value="">Select Language</option>
                    <option value="en">English</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                    <option value="ru">Russian</option>
                </select>

                <label htmlFor="category">Category: </label>
                <select value={category} onChange={handleChange} id="category" name="category">
                    <option value="">Select Category</option>
                    {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))}
                </select>
            </form>
        </section>
    )
}