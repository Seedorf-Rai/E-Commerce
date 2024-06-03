import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css'
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path : "/login",
    element : <Login/>,
  },
  {
    path : "/signup",
    element : <Signup/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
