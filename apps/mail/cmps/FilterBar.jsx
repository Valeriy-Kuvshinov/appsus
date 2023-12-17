
import { EmailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function FilterBar({ val, func }) {
    
    const [emails, getEmails] = useState([])
    const [filter, setFilter] = useState('all')

    function onFilterChange(type) {
        setFilter(type)
        EmailService.setFilterBy2(type)
        EmailService.query().then(sortedEmails => func(sortedEmails))
    }

    useEffect(() => {
        EmailService.query().then(emails => getEmails(emails))
    }, [filter])

    if (emails.length === 0) return null

    return <select className="mail-filter" onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="Date">Date</option>
        <option value="Subject">Subject</option>
    </select>
}