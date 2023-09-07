
import { EmailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export function SideBar() {
  console.log('bread')

  function changeFilter(ev) {
    console.log(ev.target.id)
    if(ev.target.id==='starred') EmailService.setFilterBy('isStar')
    if(ev.target.id==='sent') EmailService.setFilterBy('isSent')
    // if(ev.target.id==='draft') EmailService.setFilterBy('isStar')
    if(ev.target.id==='trash') EmailService.setFilterBy('isTrash')
    console.log(EmailService.query())
  }

  return <section className="mailbox-chooser">
    <button className="mail-btn"><Link to={`/mail/compose`}>
      <i className="fa-solid fa-pen-nib"></i></Link>compose</button>
    <button onClick={changeFilter} id='inbox' className="mail-btn chosen"><Link to={`/mail`}>
      <i className="fa-solid fa-inbox"></i></Link>Mailbox</button>
    <button onClick={changeFilter} id='starred' className="mail-btn"><Link to={`/mail/filtered/starred`}>
      <i className="fa-regular fa-star"></i>Starred</Link></button>
    <button onClick={changeFilter} id='sent' className="mail-btn"><Link to={`/mail/filtered/sent`}>
      <i className="fa-regular fa-paper-plane"></i> Sent</Link></button>
    <button onClick={changeFilter} id='draft' className="mail-btn"><Link to={`/mail/filtered/drafts`}>
      <i className="fa-regular fa-file"></i> Drafts</Link></button>
    <button onClick={changeFilter} id='trash' className="mail-btn"><Link to={`/mail/filtered/trash`}>
      <i className="fa-solid fa-trash"></i> Trash</Link></button>
  </section>
}