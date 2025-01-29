import {Outlet, useLocation} from "react-router-dom";
import SideMenu from "../sideMenu/sideMenu.tsx";

const Layout = () => {
    const location = useLocation();

    const showSideMenu = ["/home", "/profile", "/search", "/explore", "/create", "/notifications", "/messages"].includes(location.pathname);

    return (
       <div>
           {showSideMenu && <SideMenu />}
           <main>
           <Outlet />

           </main>
       </div>
    );
};

export default Layout;