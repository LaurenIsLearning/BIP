import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ComparisonPage from "./pages/ComparisonPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/comparison" element={<ComparisonPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
