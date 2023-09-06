const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function AppHeader() {
    const [currentImage, setCurrentImage] = useState('imgs/appsusimposter.png')

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage(prevImage => {
                return prevImage === 'imgs/appsusimposter.png' ? 'imgs/susimposter.png' : 'imgs/appsusimposter.png'
            })
        }, 10000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const setActiveNavLink = (path) => {
        return window.location.hash.includes(path) ? 'active' : ''
    }

    return (
        <header className="app-header">
            <Link to="/" className="logo-container">
                <img src={currentImage} alt="App logo" className="logo" />
            </Link>
            <nav className="nav-links">
                <a className={setActiveNavLink("/")} href="#/">Home</a>
                <a className={setActiveNavLink("/about")} href="#/about">About</a>
                <a className={setActiveNavLink("/mail")} href="#/mail">Mail</a>
                <a className={setActiveNavLink("/note")} href="#/note">Notes</a>
                <a className={setActiveNavLink("/note")} href="#/note">Books</a>
            </nav>
        </header>
    )
}