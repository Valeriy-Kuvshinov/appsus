
// const { useState , useEffect} = React
import { EmailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailPreview({email}){
    // console.log(email)
    // const [emails, getEmails] = useState(email)
    
    function changeStarSelection(ev){
        // console.log(emails.isStar)
        // if (emails.isStar===true) {
        //     emails.isStar=false
        // } else {
        //     emails.isStar=true
        // }
        // getEmails(emails)
    }
    function toNote(){
        console.log('note')
    }
    function deleteMail(){
        EmailService.remove(email.id)

    }
    return <section className="mail">
            
            <div className="innerBox">
              <button onClick={changeStarSelection}>
                {(email.isStar===true)?
                <i className="fa-solid fa-star starred"></i>:
                <i className="fa-regular fa-star"></i>}
              </button>
              <button>X</button>
              <button>X</button>
              <p>{email.from}</p>
            </div>
              <p>{email.subject}</p>
              <p>{email.sentAt}</p>
              <button onClick={toNote}>
              <i className="fa-regular fa-note-sticky"></i>
              </button>
              <button onClick={deleteMail}>
              <i className="fa-solid fa-trash"></i>
              </button>
           </section>
}