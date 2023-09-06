
import { EmailService } from "../services/mail.service.js"

const { useState , useEffect} = React

const { Link, useParams, Routes, Route, Navigate } = ReactRouterDOM

export function MailDetails({mail}){
    
    const [email, setMail] = useState(mail)
    const params = useParams()

    console.log(email)

    useEffect(() => {
         loadMail()
      }, [params.mailId])
    
    
    function loadMail() {
         EmailService.get(params.mailId)
             .then(setMail)
            .catch(err => {
                console.log('err:', err)
            })
        
    }
    
    function updateFrom(ev){
        console.log(ev.target.value)
        email.from=ev.target.value
        console.log('bread')
    }
    function updateTo(){
        console.log('bread')
    }
    function updateSubject(){
        console.log('bread')
    }
    function updateBody(){
        console.log('bread')
    }
    if(email===undefined)return
    var from=email.from
    var to=email.to
    var subject=email.subject
    var body=email.body
    return <section className="mail-details">
        <input type="email" onChange={updateFrom} className="input" id="mailFrom" placeholder="From"></input>
        <input type="email" onChange={updateTo} className="input" id="mailTo" placeholder="To"></input>
        <input type="text" onChange={updateSubject} className="input" id="mailSubject" placeholder="Subject"></input>
        <input type="text" onChange={updateBody} className="mail-body input" id="mailBody" placeholder=""></input>
    </section>
}