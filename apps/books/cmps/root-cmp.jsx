
import { Home } from './pages/HomePage.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { About } from './pages/AboutUS.jsx'
import { AddReview } from './cmps/AddReview.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

export function App() {
    return (
        <section className='app main-layout'>
            <Router>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/book/:bookId' element={<BookDetails />} />
                        <Route path='/review' element={<AddReview />} />
                        <Route path='/book/edit/:bookId' element={<BookEdit />} />
                        <Route path='/book/edit' element={<BookEdit />} />
                        <Route path='/book' element={<BookIndex />} />
                    </Routes>
                </main>
            </Router>

            <div>
                <UserMsg />
            </div>

            <footer className="app-footer">
                <p>© 2023 Valeriy Kuvshinov - All rights reserved</p>
            </footer>
        </section>
    )
}