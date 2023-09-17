export function NoteLabels({ labels, removeLabel }) {
    return (
        <div className="labels">
            {labels.map((label, idx) => (
                <span
                    key={idx}
                    className="label-span"
                    style={label.style}
                    onClick={() => removeLabel(label)}
                >
                    {label.type}
                </span>
            ))}
        </div>
    )
}