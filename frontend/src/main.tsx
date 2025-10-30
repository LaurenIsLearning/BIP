import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './siteStyles.css'
import HomePage from './pages/HomePage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'

const router = createBrowserRouter([
  {path: "/", element: <HomePage />},
  {path: "/Comparison", element: <App />}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
