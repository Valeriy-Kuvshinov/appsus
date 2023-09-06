import { EmailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
import { MailDetails } from "./MailDetails.jsx"



const { useState , useEffect} = React

const { Routes, Route, Navigate } = ReactRouterDOM

export function MailList() {
    const [emails, getEmails] = useState([])

    useEffect(()=>{
        EmailService.query().then(emails => getEmails(emails))
    },[])

    // console.log(emails)
    if(emails.length===0)return
        return <section>
                
                <ul>
                  {emails.map(mail=>
                  <li key={mail.id}>
                   <MailPreview email={mail}/>
                  </li>
                 )}
                </ul>
                <MailDetails/>
              </section>
}
