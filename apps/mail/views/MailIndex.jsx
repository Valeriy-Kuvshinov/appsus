import { FilterBar } from "../cmps/FilterBar.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { SideBar } from "../cmps/SideBar.jsx"

export function MailIndex() {
    return <section className="main-mail">
        <SideBar/>
        <div className="not-side-bar">
        <FilterBar/>
        <MailList/>
        </div>
    </section>
}
