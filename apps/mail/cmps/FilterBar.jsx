
import { EmailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function FilterBar({val,func}){
    
    const [emails, filterEmails] = useState([])
    var filter
    function onFilterChange(type){
        filter=type
        EmailService.setFilterBy2(type)
        console.log(filter)
        func(val)
        EmailService.query().then(console.log)
    }
    useEffect(() => {
        console.log('test')
        EmailService.query().then(emails => filterEmails(emails))
    }, [filter])
    console.log(emails)

    return <select onChange={(e) => onFilterChange(e.target.value)}>
              <option value="all">All</option>
              <option value="Date">Date</option>
              <option value="Subject">Subject</option>
           </select>
}