
import { EmailService } from "../services/mail.service.js"

const { useLocation } = ReactRouterDOM
const { useEffect } = React

export function EmailCompose() {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const defaultSubject = query.get('subject')
    const defaultBody = query.get('body')

    useEffect(() => {
        if (defaultSubject) document.getElementById('mailSubject').value = defaultSubject
        if (defaultBody) document.getElementById('mailBody').value = defaultBody
    }, [defaultSubject, defaultBody])

    function updateTo(ev) {
        console.log(ev.target.value)
    }
    function updateSubject(ev) {
        console.log(ev.target.value)
    }
    function updateBody(ev) {
        console.log(ev.target.value)
    }
    function addMail() {
        var to = document.getElementById('mailTo').value
        var subject = document.getElementById('mailSubject').value
        var body = document.getElementById('mailBody').value
        const newEmail = EmailService.getEmptyEmail(subject, body, false, Date.now(), null, 'user@pegasus.com', to, false)
        EmailService.save(newEmail)
    }
    return <section className="mail-details">
        <input type="email" onChange={updateTo} className="input" id="mailTo" placeholder="To"></input>
        <input type="text" onChange={updateSubject} className="input" id="mailSubject" placeholder="Subject"></input>
        <input type="text" onChange={updateBody} className="mail-body input" id="mailBody" placeholder=""></input>
        <button onClick={addMail}>confirm mail</button>
    </section>
}