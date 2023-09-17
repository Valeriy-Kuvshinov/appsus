export const NoteImg = React.memo(({ info, showText }) => {
    return <div>
        <img src={info.url} alt={info.title} loading="lazy" />
        { showText && <div className='note-text'>{info.txt}</div> }
    </div>
})