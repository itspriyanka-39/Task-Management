

import { useEffect, useState } from "react";
import { Plus, FileText, AlignLeft, Pencil } from "lucide-react";

function TaskForm({ onAddTask, editingTask, onEditTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setError("");
    } else {
      setTitle("");
      setDescription("");
      setError("");
    }
  }, [editingTask]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    if (editingTask) {
      onEditTask({
        ...editingTask,
        title: title.trim(),
        description: description.trim(),
      });
      onCancelEdit();
    } else {
      onAddTask({
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });
    }

    setTitle("");
    setDescription("");
    setError("");
  }

  function handleCancel() {
    setTitle("");
    setDescription("");
    setError("");
    onCancelEdit();
  }

  return (
    <div className="create-task">
      <h2 className="form-heading">
        <span className="form-heading-icon" aria-hidden="true">
          {editingTask ? (
            <Pencil size={26} />
          ) : (
            <Plus size={30} strokeWidth={2.5} />
          )}
        </span>
        {editingTask ? "Edit Task" : "Create Task"}
      </h2>

      <p className="form-subtitle">
        {editingTask
          ? "Update your task details."
          : "Add something you want to accomplish."}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task title *</label>

          <div className="input-with-icon">
            <FileText
              size={18}
              aria-hidden="true"
              className="field-icon"
            />

            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Finish React assignment"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setError("");
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "title-error" : undefined}
              required
            />
          </div>

          {error && (
            <p className="error-message" id="title-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>

          <div className="input-with-icon textarea-wrapper">
            <AlignLeft
              size={18}
              aria-hidden="true"
              className="field-icon"
            />

            <textarea
              id="description"
              name="description"
              placeholder="Add some details..."
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>

        <button className="add-button" type="submit">
          {editingTask ? (
            <Pencil size={19} />
          ) : (
            <Plus size={21} strokeWidth={2.8} />
          )}
          <span>{editingTask ? "Save Changes" : "Add Task"}</span>
        </button>

        {editingTask && (
          <button
            className="add-button"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskForm;
