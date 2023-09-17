const { useState, useEffect } = React

export function AppHeader() {
    const [currentImage, setCurrentImage] = useState('imgs/appsusimposter.png')
    const [currentText, setCurrentText] = useState('')

    useEffect(() => {
        const timer = setInterval(() => {
            if (!window.location.hash.includes('/book') && !window.location.hash.includes('/note')
                && !window.location.hash.includes('/mail')) {
                setCurrentImage(prevImage => {
                    return prevImage === 'imgs/appsusimposter.png' ? 'imgs/susimposter.png' : 'imgs/appsusimposter.png'
                })
                setCurrentText('')
            }
        }, 10000)

        return () => {
            clearInterval(timer)
        }
    }, [])
    useEffect(() => {
        const onHashChange = () => {
            const hash = window.location.hash

            if (hash.includes('/book')) {
                setCurrentImage('imgs/miss-book.jpg')
                setCurrentText('Ms. Books')
            } else if (hash.includes('/note')) {
                setCurrentImage('imgs/miss-notes.jpg')
                setCurrentText('Ms. Keep')
            } else if (hash.includes('/mail')) {
                setCurrentImage('imgs/mister-mail.jpg')
                setCurrentText('Mr. Mail')
            } else setCurrentText('')
        }
        // Initial call
        onHashChange()
        // Subscribe to hash changes
        window.addEventListener('hashchange', onHashChange)
        // Cleanup
        return () => {
            window.removeEventListener('hashchange', onHashChange)
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
                <span className="logo-text">{currentText}</span>
            </a>
            <nav className="nav-links">
                <button className="nav-toggle"><i className="fa-solid fa-bars"></i></button>
                <div className="nav-dropdown">
                    <a className={setActiveNavLink("/")} href="#/">Home</a>
                    <a className={setActiveNavLink("/about")} href="#/about">About</a>
                    <a className={setActiveNavLink("/mail")} href="#/mail">Mail</a>
                    <a className={setActiveNavLink("/note")} href="#/note">Notes</a>
                    <a className={setActiveNavLink("/book")} href="#/book">Books</a>
                </div>
                <a className={setActiveNavLink("/")} href="#/">Home</a>
                <a className={setActiveNavLink("/about")} href="#/about">About</a>
                <a className={setActiveNavLink("/mail")} href="#/mail">Mail</a>
                <a className={setActiveNavLink("/note")} href="#/note">Notes</a>
                <a className={setActiveNavLink("/book")} href="#/book">Books</a>
            </nav>
        </header>
    )
}