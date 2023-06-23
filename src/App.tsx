import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardLayout from './layouts/dashboard';
import TodoPage from './views/TodoPage';
import LoginPage from './views/LoginPage';
import { useAppSelector } from './hooks/useStore';

function App() {
  const token = useAppSelector(store => store.user.token);
  
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/dashboard" />} />
      <Route path='/login' element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route index element={<h1>Hello World</h1>} />
        <Route path='todos' element={<TodoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
