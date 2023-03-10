import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { exampleLoader } from "./loaders";
import { Error, Layout, Loader } from "~/components";
import { GlobalStyle, ThemeProvider, theme } from "~/theme";

const Example: React.LazyExoticComponent<React.FC> = lazy(
  () => import("~/components/Example")
);

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      path: "/",
      children: [
        {
          element: (
            <Suspense fallback={<Loader />}>
              <Example />
            </Suspense>
          ),
          index: true,
          loader: exampleLoader,
        },
        {
          element: <Error />,
          path: "error",
        },
        {
          element: <Navigate to="error" replace />,
          path: "*",
        },
      ],
    },
  ]);

  return (
    <ThemeProvider {...{ theme }}>
      <GlobalStyle />
      <RouterProvider {...{ router }} />
    </ThemeProvider>
  );
};

export { App };
