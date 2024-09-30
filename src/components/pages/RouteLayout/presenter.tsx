import { Outlet } from "react-router-dom"
import { HeaderWithMenuLinks } from "../../uniqueParts/HeaderWithMenuLinks"

export const RouteLayout = () => {
    return (
        <div className="flex flex-col w-screen">
        <HeaderWithMenuLinks />
        <div className="flex flex-row h-full w-full bg-slate-100">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    )
}