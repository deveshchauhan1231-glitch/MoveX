import {createBrowserRouter,RouterProvider} from "react-router-dom";
import axios from "axios";
import Login from "./pages/auth/login.jsx";
import Home from "./pages/Home.jsx"
import Register from "./pages/auth/register.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Exercises from "./pages/Exercises.jsx"
import Info from "./pages/Info.jsx";
import LogWorkout from "./pages/LogWorkout.jsx"
import Sahay from "./pages/Sahay.jsx"
import UserInfo from "./pages/userInfo.jsx"
import About from "./pages/About.jsx";
import Logout from "./pages/Logout.jsx";
import NotFound from "./pages/NotFound.jsx";
import CalorieCounter from "./pages/CalorieCounter.jsx";
import DatabaseUnavailable from "./pages/DatabaseUnavailable.jsx"

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 503 && window.location.pathname !== "/db-error") {
      window.location.href = "/db-error";
    }
    return Promise.reject(error);
  }
);

export default function App(){
  const router= createBrowserRouter([
    {
      path:"/",
      element:<Home />
    },
    
    {
       path:"/Signup",
       element:<Register />
    },
    {
      path:"/Login",
      element:<Login />
    },
    {
      path:"/About",
      element:<About />
    },
    {
      path:"/DashBoard",
      element:<Dashboard />
    },
    {
      path:"/Exercises",
      element:<Exercises />
    },
    {
       path:"/iexercise/:name",
       element:<Info />
    },
    {
      path:"/LogWorkout",
      element:<LogWorkout />
    },
    {
      path:"/Sahay",
      element:<Sahay />
    },
    {
      path:"/userInfo",
      element:<UserInfo />
    },
    {
      path:"/logout",
      element:<Logout />
    },{
      path:"*",
      element:<NotFound />
    },{
      path:"/calorie-counter",
      element:<CalorieCounter />
    }
    ,{
      path:"/db-error",
      element:<DatabaseUnavailable />
    }
    
  ])
  return(
    <>
    <RouterProvider router={router} />
    </>
  )
}
