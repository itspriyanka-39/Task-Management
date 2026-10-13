
import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/form";
import TaskList from "./components/list";
import TaskFilter from "./components/filter";
import {
  CheckSquare,
  Sun,
  ListTodo,
  Clock3,
  CircleCheck,
  Plus,
  ClipboardCheck,
} from "lucide-react";

function App() {

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");

      if (!savedTasks) return [];

      const parsedTasks = JSON.parse(savedTasks);

      return Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch (error) {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(newTask) {
    setTasks((previousTasks) => [newTask, ...previousTasks]);
  }
  function handleEditTask(updatedTask) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }

  function handleToggleTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function handleDeleteTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  }

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Unable to save tasks:", error);
    }
  }, [tasks]);


  return (
    <div className="App">
      <header className="top-header">
        <div className="brand">
          <div className="brand-logo" aria-hidden="true">
            <ClipboardCheck />
          </div>

          <div>
            <h1>Task Manager</h1>
            <p>Manage your tasks efficiently</p>
          </div>
        </div>

        <div className="header-decoration" aria-hidden="true">

        </div>
      </header>

      <main>
        <section className="welcome-section">
          <div className="welcome-copy">
            <h2>
              Get Started! <span aria-hidden="true">👋</span>
            </h2>
            <p>Organize your day, one task at a time.</p>
          </div>




        </section>

        <section className="stats" aria-label="Task statistics">
          <div className="stat-card total-stat">
            <div className="stat-icon" aria-hidden="true">
              <ListTodo />
            </div>
            <div className="stat-info">
              <h2>Total tasks</h2>
              <p>{tasks.length}</p>
            </div>
          </div>

          <div className="stat-card active-stat">
            <div className="stat-icon" aria-hidden="true">
              <Clock3 />

            </div>
            <div className="stat-info">
              <h2>Active tasks</h2>
              <p>{tasks.filter((task) => !task.completed).length}</p>
            </div>
          </div>

          <div className="stat-card completed-stat">
            <div className="stat-icon" aria-hidden="true">
              <CircleCheck />
            </div>
            <div className="stat-info">
              <h2>Completed tasks</h2>
              <p>{tasks.filter((task) => task.completed).length}</p>
            </div>
          </div>
        </section>

        <section className="task-section">
          <TaskForm
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />

          <div className="tasks-column">
            <TaskFilter
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
            />

            <TaskList
              tasks={visibleTasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              hasAnyTasks={tasks.length > 0}
              onEditTask={handleEditTask}
              onSelectEdit={setEditingTask}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
