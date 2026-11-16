// Import React hooks
// useState stores data
// useEffect runs code when something changes
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// Default tasks shown when the application is opened for the first time
const defaultTasks = [
  { id: 1, text: "Learn JavaScript", completed: false },
  { id: 2, text: "Build a to-do list", completed: true },
  { id: 3, text: "Practice DOM manipulation", completed: false },
  { id: 4, text: "Save tasks in local storage", completed: false },
  { id: 5, text: "Make it look good", completed: false },
];

function App() {
  // Store all tasks in state
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return defaultTasks;
    }
  });

  // Store the text entered by the user
  const [taskInput, setTaskInput] = useState("");

  // Store the currently selected filter
  const [filter, setFilter] = useState("all");

  // Store the selected theme
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme;
    } else {
      return "light";
    }
  });

  // Save tasks whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save the selected theme whenever the theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to add a new task
  const handleAddTask = (e) => {
    e.preventDefault();

    if (taskInput.trim() === "") {
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      text: taskInput.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  // Function to mark a task as completed or active
  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  // Function to delete an individual task
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(updatedTasks);
  };

  // Function to remove all completed tasks
  const handleClearCompleted = () => {
    const updatedTasks = tasks.filter((task) => {
      return task.completed === false;
    });

    setTasks(updatedTasks);
  };

  // Filter tasks according to the selected filter button
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return task.completed === false;
    }

    if (filter === "completed") {
      return task.completed === true;
    }

    return true;
  });

  // Count the number of active tasks
  const activeTasks = tasks.filter((task) => {
    return task.completed === false;
  }).length;

  // Count the number of completed tasks
  const completedTasks = tasks.filter((task) => {
    return task.completed === true;
  }).length;

  // Display the application UI
  return (
    // Main background
    <div
      className={`min-h-screen flex items-center justify-center p-4 sm:p-8 transition-colors duration-300 ${
        theme === "dark"
          ? "dark bg-navy-950 bg-[radial-gradient(120%_100%_at_50%_0%,#12305f_0%,#0a1a3a_45%,#040b1d_100%)] text-white"
          : "bg-slate-50"
      }`}
    >
      {/* Main Task Manager Card */}
      <div className="w-full max-w-4xl rounded-2xl border p-6 sm:p-10 shadow-2xl transition-colors duration-300 bg-white border-slate-200 shadow-slate-200/60 dark:bg-navy-900/85 dark:border-navy-700 dark:shadow-[0_25px_80px_-20px_rgba(42,86,163,0.45)] dark:backdrop-blur-sm">
        {/* Header: Title and Subtitle */}
        <div className="flex justify-between items-start gap-4 mb-12">
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-navy-50">
              My To Do List
            </h1>

            <p className="text-base sm:text-2xl mt-3 text-slate-500 dark:text-navy-200">
              Stay organized and get things done.
            </p>
          </div>

          {/* Button to switch between Light and Dark mode */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {
              if (theme === "light") {
                setTheme("dark");
              } else {
                setTheme("light");
              }
            }}
            className="shrink-0 rounded-xl border p-3 text-xl transition hover:scale-105 bg-slate-100 border-slate-200 dark:bg-navy-850 dark:border-navy-700 dark:hover:border-navy-500 dark:hover:bg-navy-800"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
        </div>

        {/* Form to add new tasks */}
        <form
          onSubmit={handleAddTask}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          {/* Input field for entering a task */}
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task..."
            className="min-w-0 flex-1 rounded-xl border-2 px-5 py-4 text-lg outline-none transition bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-lime-400 dark:bg-navy-850 dark:border-navy-700 dark:text-navy-50 dark:placeholder:text-navy-300 dark:focus:border-lime-400"
          />

          {/* Button to submit the new task */}
          <Button
            type="submit"
            className="rounded-xl bg-lime-400 px-8 py-4 text-lg font-bold text-slate-950 hover:bg-lime-300 active:scale-95"
          >
            Add
          </Button>
        </form>

        {/* Filter buttons: All, Active and Completed */}
        <div className="flex flex-wrap gap-3 mb-9">
          {["all", "active", "completed"].map((item) => (
            <Button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-xl border-2 px-6 py-3 text-base sm:text-lg capitalize transition ${
                filter === item
                  ? "bg-lime-400 border-lime-400 text-slate-950 font-semibold hover:bg-lime-300"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:border-lime-400 dark:bg-navy-850 dark:border-navy-700 dark:text-navy-100 dark:hover:border-lime-400 dark:hover:bg-navy-800"
              }`}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* Display the task list */}
        <div className="space-y-4">
          {/* Show a message if there are no tasks */}
          {tasks.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-navy-700 py-12 text-center">
              <p className="text-lg text-slate-500 dark:text-navy-200">
                No tasks yet. Add your first task!
              </p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-navy-700 py-12 text-center">
              <p className="text-lg text-slate-500 dark:text-navy-200">
                No {filter} tasks found.
              </p>
            </div>
          ) : (
            // Display each task using map()
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 rounded-xl border-2 p-4 sm:p-5 transition-colors bg-white border-slate-200 hover:border-slate-300 dark:bg-navy-850 dark:border-navy-700 dark:hover:border-navy-500"
              >
                {/* Checkbox to complete or uncomplete a task */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  className="h-6 w-6 shrink-0 cursor-pointer accent-lime-400"
                  aria-label="Complete task"
                />

                {/* Display task text */}
                <p
                  className={`flex-1 min-w-0 break-words text-base sm:text-xl ${
                    task.completed
                      ? "line-through text-slate-400 dark:text-navy-400"
                      : "text-slate-800 dark:text-navy-50"
                  }`}
                >
                  {task.text}
                </p>

                {/* Button to delete an individual task */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTask(task.id)}
                  className="shrink-0 p-2 text-red-500 transition hover:text-red-700 hover:scale-110 dark:text-red-400 dark:hover:text-red-300"
                  aria-label="Delete task"
                  title="Delete task"
                >
                  {/* Trash icon using SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v5" />
                    <path d="M14 11v5" />
                  </svg>
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Footer: Active task count and Clear Completed button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-slate-200 dark:border-navy-700">
          {/* Display the number of remaining active tasks */}
          <p className="text-base sm:text-lg text-slate-500 dark:text-navy-200">
            {activeTasks} active {activeTasks === 1 ? "task" : "tasks"}
          </p>

          {/* Remove all completed tasks */}
          <Button
            type="button"
            variant="outline"
            onClick={handleClearCompleted}
            disabled={completedTasks === 0}
            className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-base sm:text-lg text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
          >
            Clear Completed
          </Button>
        </div>
      </div>
    </div>
  );
}

// Make App available to main.jsx
export default App;
