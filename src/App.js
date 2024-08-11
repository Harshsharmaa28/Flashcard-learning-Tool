import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FlashcardPage } from './components/FlashCard/FlashcardPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<FlashcardPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
