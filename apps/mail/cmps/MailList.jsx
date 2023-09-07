import { EmailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
import { FilterBar } from "./FilterBar.jsx"


const { useState, useEffect } = React

export function MailList() {
    const [emails, getEmails] = useState([])

    EmailService.resetFilters()
    useEffect(() => {
        EmailService.query().then(emails => getEmails(emails))
    }, [])

    if (emails.length === 0) return null

    return <section className="mails">
       
        <ul className="mail-line">
        <FilterBar val={emails} func={getEmails} />
            {emails.map(mail =>
                <li key={mail.id} className="mail-box">
                    <MailPreview email={mail} />
                </li>
            )}
        </ul>
    </section>
}
