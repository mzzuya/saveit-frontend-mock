import Main from "../component/pages/main/Main";
import Login from "../component/pages/login/Login";
import { createBrowserRouter } from "react-router-dom";
// import NotFound from "../pages/NotFound";

const routers = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/main", element: <Main /> },
//   { path: "*", element: <NotFound /> },
]);

export default routers;
