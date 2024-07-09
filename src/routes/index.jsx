import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Wines from "../components/Wines";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: "wines",
            element: <Wines/>,
            children: [
                // {
                //     path: "/wines/:id",
                //     element: <Wine/>,
                // }
            ]
        },
      ],
    },
  ]);