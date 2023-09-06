
const { Link } = ReactRouterDOM

export function SideBar() {
  console.log('bread')

  function changeFilter(ev) {
    console.log(ev.target.id)
  }

  return <section className="mailbox-chooser">
    <button className="mail-btn"><Link to={`/mail/compose`}>
      <i className="fa-solid fa-pen-nib"></i></Link>compose</button>
    <button onClick={changeFilter} id='inbox' className="mail-btn chosen">
      <i className="fa-solid fa-inbox"></i> Mailbox</button>
    <button onClick={changeFilter} id='star' className="mail-btn">
      <i className="fa-regular fa-star"></i> Starred</button>
    <button onClick={changeFilter} id='sent' className="mail-btn">
      <i className="fa-regular fa-paper-plane"></i> Sent</button>
    <button onClick={changeFilter} id='draft' className="mail-btn">
      <i className="fa-regular fa-file"></i> Drafts</button>
    <button onClick={changeFilter} id='trash' className="mail-btn">
      <i className="fa-solid fa-trash"></i> Trash</button>
  </section>
}