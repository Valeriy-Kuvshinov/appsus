
import { EmailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export function SideBar() {

  return <section className="mailbox-chooser">
    <div className="mail-choosers1">
    <Link to={'/mail/compose'}><button className="mail-btn">
      <i className="fa-solid fa-pen-nib"></i>compose</button></Link>
    <Link to={'/mail'}><button id='inbox' className="mail-btn chosen">
      <i className="fa-solid fa-inbox"></i>Mailbox</button></Link>
    <Link to={'/mail/filtered/starred'}><button id='starred' className="mail-btn">
      <i className="fa-regular fa-star"></i>Starred</button></Link>
      </div>
    <div className="mail-choosers2">
    <Link to={'/mail/filtered/sent'}><button id='sent' className="mail-btn">
      <i className="fa-regular fa-paper-plane"></i> Sent</button></Link>
    <Link to={'/mail/filtered/drafts'}><button id='draft' className="mail-btn">
      <i className="fa-regular fa-file"></i> Drafts</button></Link>
    <Link to={'/mail/filtered/trash'}> <button id='trash' className="mail-btn">
      <i className="fa-solid fa-trash"></i> Trash</button></Link>
    </div>
  </section>
}