const { useState } = React

export const NoteTodos = React.memo(({ info, changeInfo, isEditing }) => {
    return (
        <div>
            {info.todos.map((todo, idx) => (
                todo.txt.trim() === '' ? null : (
                    <div key={idx}>
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    value={todo.txt}
                                    onChange={(e) => changeInfo(e.target.value, idx)}
                                />
                            </div>
                        ) : (
                            <div><i className="fa-solid fa-circle-dot"></i> {todo.txt}</div>
                        )}
                    </div>
                )
            ))}
        </div>
    )
})