import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const [isShown, setIsShown] = useState(false)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setIsShown(true)
            setTimeout(() => setIsShown(false), 5000)
            setTimeout(() => setMsg(null), 5500)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    if (!msg) return null

    return (
        <section className={`user-msg ${msg.type} ${isShown ? 'show' : 'hide'}`}>
            <p>{msg.txt}</p>
        </section>
    )
}