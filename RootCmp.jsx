const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { EmailCompose } from "./apps/mail/cmps/EmailCompose.jsx"
import { EmailDetails } from "./apps/mail/cmps/EmailDetails.jsx"
import { FilteredMail } from "./apps/mail/cmps/FilteredMail.jsx"

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/compose" element={<EmailCompose/>}/>
                <Route path="/mail/details/:emailId" element={<EmailDetails/>}/>
                <Route path="/mail/filtered/:filterType" element={<FilteredMail/>}/>
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
        </section>
    </Router>
}
