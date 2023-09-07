
import { EmailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function FilterBar({ val, func }) {
    // const [emails, filterEmails] = useState([])
    const [emails, getEmails] = useState([])
    const [filter, setFilter] = useState('all')
    // var filter

    function onFilterChange(type) {
        setFilter(type)
        EmailService.setFilterBy2(type)
        EmailService.query().then(sortedEmails => func(sortedEmails))
    }
    // function onFilterChange(type) {
    //     filter = type
    //     EmailService.setFilterBy2(type)
    //     console.log(filter)
    //     func(val)
    //     EmailService.query().then(console.log)
    // }
    // useEffect(() => {
    //     console.log('test')
    //     EmailService.query().then(emails => filterEmails(emails))
    // }, [filter])

    useEffect(() => {
        EmailService.query().then(emails => getEmails(emails))
    }, [filter])
    console.log(emails)

    if (emails.length === 0) return null

    return <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="Date">Date</option>
        <option value="Subject">Subject</option>
    </select>
}