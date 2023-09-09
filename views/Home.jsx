
export function Home() {
    return <section className="home">
        <div className='home-wrapper'>
            <h1>Welcome to Our Home Page!</h1>
            <img src="imgs/welcome.jpg" alt="home background" />
        </div>
        <div className="projects">
            <h2>Our Projects</h2>
            <div className='project-wrapper'>
                <img className='project-logo' src="imgs/mister-mail.jpg" alt="mails logo" />
                <div className="project-info">
                    <h2>Mr. Mail</h2>
                    <h4>Looking for an alternative to Gmail or Hotmail, have no fear, Mr. Mail is here!</h4>
                </div>
                <img className='project-showcase' src="imgs/mails.png" alt="mails showcase" />
            </div>
            <div className='project-wrapper'>
                <img className='project-logo' src="imgs/miss-notes.jpg" alt="notes logo" />
                <div className="project-info">
                    <h2>Ms. Keep</h2>
                    <h4>It is always good to take a note of what you have to do, thankfully Ms. Keep does the job!</h4>
                </div>
                <img className='project-showcase' src="imgs/notes.png" alt="notes showcase" />
            </div>
            <div className='project-wrapper'>
                <img className='project-logo' src="imgs/miss-book.jpg" alt="books logo" />
                <div className="project-info">
                    <h2>Ms. Books</h2>
                    <h4>If you ever wanted to read a book outside of Amazon, look no further, and go to Ms. Books!</h4>
                </div>
                <img className='project-showcase' src="imgs/books.png" alt="books showcase" />
            </div>
        </div>
    </section>
}