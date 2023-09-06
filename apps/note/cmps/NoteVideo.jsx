const { useState } = React

export const NoteVideo = ({ info }) => {
    const [isVideoClicked, setIsVideoClicked] = useState(false);

    const youtubeEmbedUrl = (url) => {
        const match = url.match(/(?:v=|\/v\/|youtu\.be\/)([a-zA-Z0-9_-]+)/)
        if (!match) return null
        const videoId = match[1]
        return `https://www.youtube.com/embed/${videoId}`
    }

    const embedUrl = youtubeEmbedUrl(info.url)
    const thumbnailUrl = `https://img.youtube.com/vi/${embedUrl}/0.jpg`

    if (!embedUrl) return <p>Invalid YouTube URL</p>

    return (
        <div onClick={() => setIsVideoClicked(true)} style={{ cursor: 'pointer', position: 'relative', padding: '50%', height: 0, overflow: 'hidden' }}>
            {!isVideoClicked && (
                <img src={thumbnailUrl} alt="Video Thumbnail" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
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
    )
}