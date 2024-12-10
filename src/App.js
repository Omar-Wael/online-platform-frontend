import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/Layout';
import Register from './components/Auth/Register';
import CourseDetail from './components/CourseDetail';
import LessonDetail from './pages/LessonDetailPage';
import CourseForm from './components/CourseForm';
import LessonForm from './components/LessonForm';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Instructor routes */}
            <Route path="/instructor/courses/create" element={<CourseForm />} />
            <Route path="/instructor/courses/:id/edit" element={<CourseForm isEditMode={true} />} />
            <Route path="/instructor/lessons/create" element={<LessonForm />} />
            <Route path="/instructor/courses/:courseId/lessons/:lessonId/edit" element={<LessonForm isEditMode={true} />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonDetail />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;

