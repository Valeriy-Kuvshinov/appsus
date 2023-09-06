const { memo } = React

export const NoteVideo = memo(({ info }) => {
    const youtubeEmbedUrl = (url) => {
        const match = url.match(/(?:v=|\/v\/|youtu\.be\/)([a-zA-Z0-9_-]+)/)
        if (!match) return null
        const videoId = match[1]
        return `https://www.youtube.com/embed/${videoId}`
    }

    const embedUrl = youtubeEmbedUrl(info.url);
    if (!embedUrl) return <p>Invalid YouTube URL</p>

    return (
        <div style={{ position: 'relative', paddingBottom: '100%', height: 0, overflow: 'hidden' }}>
            <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups"
            ></iframe>
        </div>
    )
})