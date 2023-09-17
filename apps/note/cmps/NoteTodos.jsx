const { useState, useEffect } = React

export const NoteTodos = React.memo(({ info, changeInfo, isEditing }) => {
    const [todos, setTodos] = useState(info.todos)

    useEffect(() => {
        setTodos(info.todos)
    }, [info.todos])

    const handleUpdateTodos = (newText, idx) => {
        const updatedTodos = [...todos]
        updatedTodos[idx].txt = newText

        setTodos(updatedTodos)
    }

    useEffect(() => {
        const cleanedTodos = todos.filter((todo) => todo.txt.trim() !== '')
        if (JSON.stringify(cleanedTodos) !== JSON.stringify(todos)) {
            setTodos(cleanedTodos)
            changeInfo(cleanedTodos)
        }
    }, [todos])

    return (
        <div>
            {todos.map((todo, idx) => (
                <div key={idx}>
                    {isEditing ? (
                        <input
                            type="text"
                            value={todo.txt}
                            onChange={(e) => handleUpdateTodos(e.target.value, idx)}
                        />
                    ) : (
                        <div><i className="fa-solid fa-circle-dot"></i> {todo.txt}</div>
                    )}
                </div>
            ))}
        </div>
    )
})