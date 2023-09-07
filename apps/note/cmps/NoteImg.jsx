export const NoteImg = React.memo(({ info }) => {
    return <div>
        <img src={info.url} alt={info.title} loading="lazy" />
        <div>{info.txt}</div>
    </div>
})