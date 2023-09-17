const { useState } = React

export const NoteVideo = ({ info, showText }) => {
    const [isVideoClicked, setIsVideoClicked] = useState(false)

    const youtubeEmbedUrl = (url) => {
        const match = url.match(/(?:v=|\/v\/|youtu\.be\/)([a-zA-Z0-9_-]+)/)
        if (!match) return null
        const videoId = match[1]
        return `https://www.youtube.com/embed/${videoId}`
    }
    const embedUrl = youtubeEmbedUrl(info.url)
    const videoId = embedUrl ? embedUrl.split('https://www.youtube.com/embed/')[1] : null
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null

    if (!embedUrl) return <p>Invalid YouTube URL</p>

    return (
        <div>
            <div onClick={() => setIsVideoClicked(true)} style={{ cursor: 'pointer', position: 'relative', padding: '50%', height: 0, overflow: 'hidden' }}>
                {!isVideoClicked && (
                    <React.Fragment>
                        <img src={thumbnailUrl} alt="Video Thumbnail" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                        <i className="fa-solid fa-circle-play" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '4em', color: 'red' }}></i>
                    </React.Fragment>
                )}
                {isVideoClicked && (
                    <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        src={embedUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                    ></iframe>
                )}
            </div>
            {showText && <div className='note-text'>{info.txt}</div>}
        </div>
    )
}