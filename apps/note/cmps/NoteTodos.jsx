export function NoteTodos({ info, changeInfo }) {
    return (
        <div>
            {info.todos.map((todo, idx) => (
                <div key={idx}>{todo.txt}</div>
            ))}
        </div>
    )
}