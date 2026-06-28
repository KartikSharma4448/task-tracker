// Root application component with route configuration.

import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import { useTheme } from './context/ThemeContext';

function App() {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px'
          }
        }}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id/edit" element={<TaskForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
