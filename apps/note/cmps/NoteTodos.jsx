export const NoteTodos = React.memo(({ info }) => {
    return (
        <div>
            {info.todos.map((todo, idx) => (
                <div key={idx}>{todo.txt}</div>
            ))}
        </div>
    )
})