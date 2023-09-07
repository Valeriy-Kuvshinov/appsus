import { EmailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"



const { useState, useEffect } = React

export function MailList() {
    const [emails, getEmails] = useState([])

    useEffect(() => {
        EmailService.query().then(emails => getEmails(emails))
    }, [])
    
    if (emails.length === 0) return
    return <section className="mails">
        <ul className="mail-line">
            {emails.map(mail =>
                <li key={mail.id} className="mail-box">
                    <MailPreview email={mail} />
                </li>
            )}
        </ul>
    </section>
}
