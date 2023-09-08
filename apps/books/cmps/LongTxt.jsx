
const { useState, useEffect } = React

export function LongTxt({ txt, length = 100 }) {
    const [isLongTextShown, setIsLongTextShown] = useState(false)

    function toggleLongText() {
        setIsLongTextShown(!isLongTextShown)
    }

    return (
        <div>
            {isLongTextShown ? txt : txt.slice(0, length)}
            <div>
                {txt.length > length && <button onClick={toggleLongText}>
                    {isLongTextShown ? 'Read Less' : 'Read More'}
                </button>}</div>
        </div>
    )
}