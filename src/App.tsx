import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";
import MovieDetailPage from "./pages/MovieDetailPage";
import WatchPage from "./pages/WatchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ServicePage from "./pages/ServicePage";

function App() {
  const basePath = import.meta.env.VITE_BASE_URL || "/";

  return (
    <Router basename={basePath}>
      <div className="min-h-screen bg-black">
        <Sidebar />
        <main className="ml-20">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/service/:serviceSlug" element={<ServicePage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/watch/:type/:id" element={<WatchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
