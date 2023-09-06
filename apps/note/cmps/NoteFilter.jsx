
const { useState, useEffect } = React

export const NoteFilter = ({ onSearchChange, onFilterTypeChange, searchTerm, filterType }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <select
                onChange={(e) => onFilterTypeChange(e.target.value)}
                value={filterType}
            >
                <option value="all">All</option>
                <option value="NoteTxt">Text</option>
                <option value="NoteImg">Image</option>
                <option value="NoteVideo">Video</option>
                <option value="NoteTodos">To-dos</option>
            </select>
        </div>
    )
}