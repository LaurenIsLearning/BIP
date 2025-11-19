import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./siteStyles.css";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StatsPage from "./pages/StatsPage.tsx";
import ComparisonPage from "./pages/ComparisonPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/Stats/:id", element: <StatsPage /> },
  {
    path: "/TeamComparison/teamOne/:teamOne/teamTwo/:teamTwo",
    element: <ComparisonPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
