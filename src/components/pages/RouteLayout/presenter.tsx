import { Outlet } from "react-router-dom"
import { HeaderWithMenuLinks } from "../../uniqueParts/HeaderWithMenuLinks"
import { Suspense } from "react"

export const RouteLayout = () => {
    return (
        <div className="flex flex-col w-screen">
        <HeaderWithMenuLinks />
        <div className="flex flex-row h-full w-full bg-slate-100">
          <div>
            <Suspense fallback={<div>読み込み中</div>} >
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    )
}