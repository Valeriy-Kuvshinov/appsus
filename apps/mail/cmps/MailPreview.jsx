
// const { useState , useEffect} = React

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
    return <section className="mail">
            
            <div className="innerBox">
              <button onClick={changeStarSelection}>
                {/* {console.log(emails.isStar)} */}
                {(email.isStar===true)?
                <i className="fa-solid fa-star"></i>:
                <i className="fa-regular fa-star"></i>}
              </button>
              <button>X</button>
              <button>X</button>
              <p>{email.from}</p>
            </div>
              <p>{email.subject}</p>
              <p>{email.sentAt}</p>
              <Link to={`/mail/details/${email.id}`}>S</Link>
           </section>
}