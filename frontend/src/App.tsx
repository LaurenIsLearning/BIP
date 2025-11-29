import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ComparisonPage from "./pages/ComparisonPage";
import AdminPage from "./pages/AdminPage.tsx";
import StatsPage from "./pages/StatsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/Comparison/:teamOneId?/:teamTwoId?"
        element={<ComparisonPage />}
      />
      <Route path="/Admin" element={<AdminPage />} />
      <Route path="/Stats/:teamId?" element={<StatsPage />} />
      <Route path="/Login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
