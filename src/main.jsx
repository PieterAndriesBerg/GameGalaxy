import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import Home from "./pages/Home/Home.jsx";
import Genres from "./pages/Genres/Genres.jsx";
import Mood from "./pages/Mood/Mood.jsx";
import Random from "./pages/Random/Random.jsx";
import Developers from "./pages/Developers/Developers.jsx";
import Top100 from "./pages/Top100/Top100.jsx";
import GameDetailsPage from "./pages/GameDetails/GameDetailsPage.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/genres",
    element: <Genres />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mood",
    element: <Mood />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/random",
    element: <Random />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/developers",
    element: <Developers />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/top100",
    element: <Top100 />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/games/:id",
    element: <GameDetailsPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
