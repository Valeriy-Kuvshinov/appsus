export const NoteImg = React.memo(({ info, changeInfo }) => {
    return <img src={info.url} alt={info.title} loading="lazy" />
})