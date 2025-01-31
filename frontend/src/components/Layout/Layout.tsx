import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import SideMenu from "../sideMenu/sideMenu.tsx";
import CreatePostModal from "../CreatePostModal/CreatePostModal.tsx";

const Layout = () => {
    const location = useLocation();
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

    const showSideMenu = ["/home", "/profile", "/search", "/explore", "/notifications", "/messages", "/edit-profile"].includes(location.pathname);

    const handleOpenCreatePostModal = () => {
        setIsCreatePostModalOpen(true);
    };

    const handleCloseCreatePostModal = () => {
        setIsCreatePostModalOpen(false);
    };

    return (
        <div>
            {showSideMenu && <SideMenu openCreatePostModal={handleOpenCreatePostModal} />}

            {/* Модальное окно создания поста */}
            {isCreatePostModalOpen && <CreatePostModal onClose={handleCloseCreatePostModal} />}

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;