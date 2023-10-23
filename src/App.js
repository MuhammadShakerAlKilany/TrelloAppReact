import store from "./Store/store";
import { Provider } from "react-redux";
import logo from './logo.svg';
import './App.css';
import TokenContextProvider from './context/tokenContext';
import UserContextProvider from './context/userContext';
import { GoogleOAuthProvider } from "@react-oauth/google";
import RootLayout from "./app/layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./app/signup/signup";
import User from "./app/user/user";
import Tasks from "./app/tasks/tasks";
import 'bootstrap/dist/js/bootstrap'
const rout = createBrowserRouter([
  {
    path: "",
    Component: RootLayout, children: [{ path: "login", element: <Login /> }, 
    { path: "signup", Component: Signup },
    {path:"user",Component:User},
    {path:"tasks",Component:Tasks}
  ]
  },])
function App() {
  return <>

    <RouterProvider router={rout}></RouterProvider>;
  </>

}

export default App;
