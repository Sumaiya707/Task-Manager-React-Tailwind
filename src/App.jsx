import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import TaskManager from "@/pages/TaskManager";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Navigation */}
        <nav className="flex items-center gap-4 border-b bg-white px-6 py-4">
          <Link
            to="/"
            className="font-semibold text-slate-800 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/tasks"
            className="font-semibold text-slate-800 hover:text-blue-600"
          >
            Task Manager
          </Link>
        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskManager />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
