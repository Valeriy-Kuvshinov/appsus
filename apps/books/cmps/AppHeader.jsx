const { Link } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header main-layout">
            <div className='header-content'>
                <img src="assets/img/miss-book.jpg" alt="logo" className="header-img" />
                <h1>Miss Books</h1>
            </div>
            <nav className="app-nav">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/book">Books</Link>
                <Link to="/book/edit">Add Book</Link>
            </nav>
        </header>
    )
}