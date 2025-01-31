import styles from "./sideMenu.module.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import create from "../../assets/create/create.svg";
import create_fill from "../../assets/create/create_fill.svg";
import explore from "../../assets/explore/explore.svg";
import explore_fill from "../../assets/explore/explore_fill.svg";
import home from "../../assets/home/home.svg";
import home_fill from "../../assets/home/home_fill.svg";
import logo from "../../assets/logo/logo.svg";
import messages from "../../assets/messages/messages.svg";
import messages_fill from "../../assets/messages/messages_fill.svg";
import notifications from "../../assets/notifications/notifications.svg";
import notifications_fill from "../../assets/notifications/notifications_fill.png";
import profile from "../../assets/profile/profile.svg";
import profile_fill from "../../assets/profile/profile.fill.svg";
import search from "../../assets/search/search.svg";
import search_fill from "../../assets/search/search_fill.svg";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

const menuItems = [
    {id:1, icon: home, activeIcon: home_fill, link: "/", label: "Home"},
    {id:2, icon: search, activeIcon: search_fill, link: "/search", label: "Search"},
    {id:3, icon: explore, activeIcon: explore_fill, link: "/explore", label: "Explore"},
    {id:4, icon: create, activeIcon: create_fill, link: "/create", label: "Create"},
    {id:5, icon: notifications, activeIcon: notifications_fill, link: "/notifications", label: "Notifications"},
    {id:6, icon: messages, activeIcon: messages_fill, link: "/messages", label: "Messages"},
    {id:7, icon: profile, activeIcon: profile_fill, link: "/profile", label: "Profile"},
];

const SideMenu = ({ openCreatePostModal }) => {
    const location = useLocation();
    const [showTopMenu, setShowTopMenu] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            setShowTopMenu(window.scrollY < lastScrollY);
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Верхнее меню (лайки и сообщения только на моб) */}
            <div className={`${styles.topMenu} ${showTopMenu ? styles.visible : styles.hidden}`}>
                <Link to="/notifications" className={styles.icon}>
                    <img
                        src={location.pathname === "/notifications" ? notifications_fill : notifications}
                        alt="Notifications"
                    />
                </Link>
                <Link to="/messages" className={styles.icon}>
                    <img
                        src={location.pathname === "/messages" ? messages_fill : messages}
                        alt="Messages"
                    />
                </Link>
            </div>

            {/* Боковое меню ПК и нижнее меню моб */}
            <nav className={styles.sideMenu}>
                <img src={logo} alt="Logo" className={styles.logo} />
                {menuItems.map((item) => (
                    (item.label !== "Notifications" && item.label !== "Messages") && (
                        <Link
                            key={item.id}
                            to={item.link}
                            className={`${styles.menuItem} ${location.pathname === item.link ? styles.active : ""}`}
                        >
                            <img
                                src={location.pathname === item.link ? item.activeIcon : item.icon}
                                alt={item.label}
                            />
                            <span>{item.label}</span>
                        </Link>
                    )
                ))}
                {/* Кнопка создания поста */}
                {/*<button onClick={openCreatePostModal} className={styles.createButton}>*/}
                {/*    <img src={create} alt="Create" />*/}
                {/*    <span>Create</span>*/}
                {/*</button>*/}
            </nav>
        </>
    );
};

export default SideMenu;