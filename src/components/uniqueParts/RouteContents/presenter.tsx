import React from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { RouteLayout } from '../../pages/RouteLayout'

interface ContentsProps {
  contents: {
    link: string
    key: string
    component: React.ElementType
  }[]
}

export const  Contents = (props: ContentsProps) => {
    const routes = generateRoutes(props.contents);
    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />
}

const generateRoutes = (contents: ContentsProps['contents']) => {
    return createRoutesFromElements(
        <>
        <Route element={<RouteLayout />}>
          {contents.map((content) => (
              <Route
              key={content.key}
              path={content.link}
              element={<content.component label={content.key} />}
              />
          ))}
          <Route path="*" element={<p>{'見つかりません。'}</p>} />
        </Route>
        </>
    )
}




