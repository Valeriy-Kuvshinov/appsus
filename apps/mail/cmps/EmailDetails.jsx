import { EmailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function EmailDetails(){
    const [emails, getEmails] = useState([])
    // const [index,getIndex] = useEffect(0)
    const params = useParams()
    useEffect(() => {
        EmailService.setFilterBy(params.filterType)
        EmailService.query().then(emails => getEmails(emails))
    }, [])

    function toNote() {
        EmailService.createNoteFromEmail(params.emailId)
          .then(() => {
            console.log("Converted to note")
          })
      }
      function deleteMail() {
        EmailService.trash(emails[index])
    
      }
    
    if(emails.length===0) return
    var index=emails.findIndex((email)=>email.id===params.emailId)
    return <section className="email-details">
             <div className="details-header detail">
             <div>{emails[index].subject}</div>
             <div>
             <button onClick={toNote}>
               <i className="fa-regular fa-note-sticky"></i>
             </button>
             <button onClick={deleteMail}>
               <i className="fa-solid fa-trash"></i>
             </button>
             </div>
             </div>
             <div className="detail">{emails[index].from}</div>
             <div className="detail details-body">{emails[index].body}</div>
           </section>
}