// src/App.tsx
import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import MainLayout from "./layouts/MainLayout"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import Projects3DPage from "./pages/Projects3DPage"
import ProjectsPage from "./pages/ProjectsPage"

function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="projects/3d" element={<Projects3DPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App
