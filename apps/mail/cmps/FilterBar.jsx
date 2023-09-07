
export function FilterBar(){
    function onFilterChange(type){
        console.log(type)
    }

    return <select onChange={(e) => onFilterChange(e.target.value)}>
    <option value="all">All</option>
    <option value="Date">Date</option>
    <option value="Name">Name</option>
</select>
}