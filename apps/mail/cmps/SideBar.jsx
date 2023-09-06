
export function SideBar(){
    console.log('bread')

    function changeFilter(ev){
        console.log(ev.target.id)
    }

    return <section className="mailbox-chooser">
              <button onClick={changeFilter} id='inbox'><i className="fa-solid fa-inbox"></i> Mailbox</button>
              <button onClick={changeFilter} id='star'><i className="fa-regular fa-star"></i> Starred</button>
              <button onClick={changeFilter} id='sent'><i className="fa-regular fa-paper-plane"></i> Sent</button>
              <button onClick={changeFilter} id='draft'><i className="fa-regular fa-file"></i> Drafts</button>
              <button onClick={changeFilter} id='trash'><i className="fa-solid fa-trash"></i> Trash</button>
           </section>
}