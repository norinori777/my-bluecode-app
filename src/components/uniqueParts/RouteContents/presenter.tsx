import React from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { RouteLayout } from '../../pages/RouteLayout'
import { ComponentMap, ContentItem } from '../../../Reducks/contents/types'

interface ContentsProps {
  contents: ContentItem[],
  componentMap: ComponentMap
}

export const  Contents = (props: ContentsProps) => {
    const routes = generateRoutes(props.contents, props.componentMap);
    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />
}

const generateRoutes = (contents: ContentsProps['contents'], componentMap: ComponentMap) => {
    return createRoutesFromElements(
        <>
          <Route element={<RouteLayout />}>
            {contents.map((content) => {
                const Component = componentMap[content.componentId]
                return (
                  <Route
                  key={content.key}
                  path={content.link}
                  element={<Component label={content.key} />}
                  />
                )
              })}
            <Route path="*" element={<p>{'見つかりません。'}</p>} />
          </Route>
        </>
    )
}




