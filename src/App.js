import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import TaskListPage from './pages/TaskListPage';
import ChartPage from './pages/ChartPage';
import "./App.css"

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/task-list" element={<TaskListPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
