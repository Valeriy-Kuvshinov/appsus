import { EmailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
import { EmailCompose } from "./EmailCompose.jsx"



const { useState , useEffect} = React

const { Link, useParams, Routes, Route, Navigate } = ReactRouterDOM

export function MailList() {
    const [emails, getEmails] = useState([])

    useEffect(()=>{
        EmailService.query().then(emails => getEmails(emails))
    },[])

    function checkMail(ev){
        console.log(ev.target.id)
    }
    if(emails.length===0)return
        return <section className="mails">
                <Link to={`/mail/compose`}>compose</Link>
                <ul>
                  {emails.map(mail=>
                  <li key={mail.id} className="mail-box">
                   <MailPreview email={mail}/>
                   {/* <button onClick={checkMail} id={mail.id}>check</button> */}
                   {/* <Link to={`/mail/details/${mail.id}`}>t</Link> */}
                  </li>
                 )}
                </ul>
              </section>
}
