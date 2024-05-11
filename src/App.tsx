import React from 'react';
import logo from './logo.svg';
import './App.css';
import RouterComponent from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <RouterComponent />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
