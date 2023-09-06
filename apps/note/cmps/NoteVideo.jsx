export function NoteVideo({ info, changeInfo }) {
    const youtubeEmbedUrl = (url) => {
        const match = url.match(/(?:v=|\/v\/|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        if (!match) return null
        const videoId = match[1]
        return `https://www.youtube.com/embed/${videoId}`
    }

    const embedUrl = youtubeEmbedUrl(info.url)
    if (!embedUrl) return <p>Invalid YouTube URL</p>

    return (
        <iframe
            width="560"
            height="315"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    )
}