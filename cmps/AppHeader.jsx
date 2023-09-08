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

    const youtubeVideoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

    return (
        <header className="app-header">
            <a href={youtubeVideoUrl} target="_blank" rel="noopener noreferrer" className="logo-container">
                <img src={currentImage} alt="App logo" className="logo" />
            </a>
            <nav className="nav-links">
                <button className="nav-toggle"><i className="fa-solid fa-bars"></i></button>
                <div className="nav-dropdown">
                    <a className={setActiveNavLink("/")} href="#/">Home</a>
                    <a className={setActiveNavLink("/about")} href="#/about">About</a>
                    <a className={setActiveNavLink("/mail")} href="#/mail">Mail</a>
                    <a className={setActiveNavLink("/note")} href="#/note">Notes</a>
                    <a className={setActiveNavLink("/books")} href="#/books">Books</a>
                </div>
                <a className={setActiveNavLink("/")} href="#/">Home</a>
                <a className={setActiveNavLink("/about")} href="#/about">About</a>
                <a className={setActiveNavLink("/mail")} href="#/mail">Mail</a>
                <a className={setActiveNavLink("/note")} href="#/note">Notes</a>
                <a className={setActiveNavLink("/books")} href="#/books">Books</a>
            </nav>
        </header>
    )
}