
function TaskFilter({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}) {
  return (
    <div className="task-filters">
      <input
        type="search"
        placeholder="Search tasks by title..."
        aria-label="Search tasks by title"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <div className="filter-buttons">
        {["all", "active", "completed"].map((option) => (
          <button
            key={option}
            type="button"
            className={filter === option ? "filter-button selected" : "filter-button"}
            onClick={() => onFilterChange(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilter;
