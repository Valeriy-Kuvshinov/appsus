import { EmailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
import { FilterBar } from "./FilterBar.jsx"


const { useState, useEffect } = React

export function MailList() {
    const [emails, getEmails] = useState([])

    useEffect(() => {
        console.log('test')
        EmailService.query().then(emails => getEmails(emails))
    }, [])
    
    if (emails.length === 0) return
    return <section className="mails"> 
        <FilterBar val={emails} func={getEmails}/>
        <ul className="mail-line">
            {emails.map(mail =>
                <li key={mail.id} className="mail-box">
                    <MailPreview email={mail} />
                </li>
            )}
        </ul>
    </section>
}
