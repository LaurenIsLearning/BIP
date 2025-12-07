import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ComparisonPage from "./pages/ComparisonPage";
import AdminPage from "./pages/AdminPage.tsx";
import StatsPage from "./pages/StatsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import { AuthContext, AuthProvider } from "./components/AuthContext.tsx";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/Comparison/:teamOneId?/:teamTwoId?"
        element={<ComparisonPage />}
      />
      <Route path="/Admin" element={<AdminPage />} />
      <Route path="/Stats/:teamId?" element={<StatsPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Profile" element={<ProfilePage />} />
    </Routes>
    </AuthProvider>
    
  );
}

export default App;
