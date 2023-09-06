
// const { useState , useEffect} = React
import { EmailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailPreview({ email }) {
  // console.log(email)
  // const [emails, getEmails] = useState(email)

  function changeStarSelection(ev) {
    // console.log(emails.isStar)
    // if (emails.isStar===true) {
    //     emails.isStar=false
    // } else {
    //     emails.isStar=true
    // }
    // getEmails(emails)
  }
  function toNote() {
    EmailService.createNoteFromEmail(email.id)
      .then(() => {
        console.log("Converted to note")
      })
  }
  function deleteMail() {
    EmailService.remove(email.id)

  }

  return <section className="mail">
    <div className="innerBox">
      <button onClick={changeStarSelection}>
        {/* {console.log(email.isStar)} */}
        {(email.isStar === true) ?
          <i className="fa-solid fa-star starred"></i> :
          <i className="fa-regular fa-star"></i>}
      </button>
      <p>{email.from}</p>
    </div>
    <p>{email.subject}</p>
    <p>{email.sentAt}</p>
    <div className='mail-buttons'>
      <button onClick={toNote}>
        <i className="fa-regular fa-note-sticky"></i>
      </button>
      <button onClick={deleteMail}>
        <i className="fa-solid fa-trash"></i>
      </button>
      <button>
        <Link to={`/mail/details/${email.id}`}>
          <i className="fa-solid fa-expand"></i>
        </Link>
      </button>
    </div>
  </section>
}
