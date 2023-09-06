export const NoteImg = React.memo(({ info }) => {
    return <img src={info.url} alt={info.title} loading="lazy" />
})