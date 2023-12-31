import { EmailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
import { FilterBar } from "./FilterBar.jsx"


const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function MailList() {
    const [emails, getEmails] = useState([])
    const params = useParams()

    EmailService.resetFilters()
    useEffect(() => {
        EmailService.setFilterBy(params.filterType)
        EmailService.query().then(emails => getEmails(emails))
    }, [emails])

    function changeStarSelection(emailId) {
        const email=emails.find((email)=>email.id===emailId)
        EmailService.star(email)
      }

    if (emails.length === 0) return null

    // console.log('emails from maillist: ',emails)

    return <section className="mails">
       
        <ul className="mail-line">
        <FilterBar val={emails} func={getEmails} />
            {emails.map(mail =>
                <li key={mail.id} className="mail-box">
                    <MailPreview changeStarSelection={changeStarSelection} email={mail} />
                </li>
            )}
        </ul>
    </section>
}
