import { EmailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function FilteredMail(){
    const [emails, getEmails] = useState([])
    const params = useParams()
    useEffect(() => {
        EmailService.setFilterBy(params.filterType)
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