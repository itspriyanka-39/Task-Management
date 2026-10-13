
function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask,
    onSelectEdit, hasAnyTasks = false, }) {

    if (tasks.length === 0) {
        return (
            <div className="task-list">
                <h2>Your Tasks</h2>
                <p>0 tasks in your list</p>

                <div className="empty-state">
                    <span aria-hidden="true">📝</span>

                    <h3>
                        {hasAnyTasks ? "No matching tasks" : "No tasks yet"}
                    </h3>

                    <p>
                        {hasAnyTasks
                            ? "Try a different search or select another filter."
                            : "Add your first task to get started!"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="task-list">
            <h2>Your Tasks</h2>
            <p>{tasks.length} tasks in your list</p>

            <div className="task-items">
                {tasks.map((task) => (
                    <div className="task-item" key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleTask(task.id)}
                            aria-label={`Mark ${task.title} as complete`}
                        />

                        <div className="task-content">
                            <h3 className={task.completed ? "completed" : ""}>
                                {task.title}
                            </h3>

                            {task.description && <p>{task.description}</p>}

                            <span className={task.completed ? "status done" : "status active"}>
                                {task.completed ? "Completed" : "Active"}
                            </span>
                        </div>
                        <button
                            className="delete-button"
                            onClick={() => onSelectEdit(task)}
                            aria-label={`Edit ${task.title}`}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-button"
                            onClick={() => onDeleteTask(task.id)}
                            aria-label={`Delete ${task.title}`}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;
