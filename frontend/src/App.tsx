import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ComparisonPage from "./pages/ComparisonPage";
import AdminPage from "./pages/AdminPage";
import StatsPage from './pages/StatsPage.tsx'
import LoginPage from './pages/LoginPage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Comparison" element={<ComparisonPage />} />
      <Route path="/Admin" element={<AdminPage />} />
      <Route path="/Stats" element={<StatsPage teamId={3 /*Placeholder*/}/>}/>
      <Route path="/Login" element={<LoginPage />}/>
    </Routes>
  );
}

export default App;
