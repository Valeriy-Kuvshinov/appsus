const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { EmailCompose } from "./apps/mail/cmps/EmailCompose.jsx"
import { EmailDetails } from "./apps/mail/cmps/EmailDetails.jsx"
import { BookDetails } from "./apps/books/cmps/BookDetails.jsx"
import { BookIndex } from "./apps/books/views/BookIndex.jsx"
import { BookAdd } from "./apps/books/cmps/book-add.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/filtered/:filterType" element={<MailIndex />} />
                <Route path="/mail/compose" element={<EmailCompose />} />
                <Route path="/mail/details/:emailId" element={<EmailDetails />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/book" element={<BookIndex />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
                <Route path="/book/add" element={<BookAdd />} />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}