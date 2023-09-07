import { EmailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
import { SideBar } from "./SideBar.jsx"

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function FilteredMail() {
    const [emails, getEmails] = useState([])
    const params = useParams()

    useEffect(() => {
        EmailService.setFilterBy(params.filterType)
        EmailService.query().then(emails => getEmails(emails))
    }, [params.filterType])

    if (emails.length === 0) return null

    // if (emails.length === 0) return

    return <section className="filtered-mails">
             <SideBar/>
               <section className="mails">
      
               <ul className="mail-line">
                 {emails.map(mail =>
                  <li key={mail.id} className="mail-box">
                    <MailPreview email={mail} />
                  </li>
                )}
               </ul>
              </section>
           </section> 
}