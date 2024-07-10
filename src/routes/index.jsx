import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Wines from "../components/Wines";
import WineForm from "../components/WineForm";
import WineDetail from "../components/WineDetail";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "wines",
          element: <Wines/>
        },
        {
          path: "favorite-wines",
          element: <Wines/>
        },
        {
          path: "wines/new",
          element: <WineForm/> // components render by router when path is visited
        },
        {
          path: "wines/:wineId",
          element: <WineDetail/> 
        },
      ]
    },
  ]);