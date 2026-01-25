import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBasket, faTags, faSun, faMoon, faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useCart } from "../store/cart-context";
import { useAuth } from "../store/auth-context";
import { toast } from "react-toastify";

const Header = () => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") === "dark" ? "dark" : "light";
    });
    
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const userMenuRef = useRef();

    const toggleAdminMenu = () => setAdminMenuOpen((prev) => !prev);
    const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

    const {totalQuantity} = useCart(); // totalQuantity from initialCartContext
    const {isAuthenticated, user, logout} = useAuth();
    const isAdmin = user?.roles?.includes("ROLE_ADMIN"); // to show/hide the Admin dropdown based upon roles

    useEffect(() => {
        if (theme === "dark") {
        document.documentElement.classList.add("dark");
        } else {
        document.documentElement.classList.remove("dark");
        }
        setAdminMenuOpen(false);
        setUserMenuOpen(false);
        const handleClickOutside = (event) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
            setUserMenuOpen(false);
            setAdminMenuOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, [theme, location.pathname]);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        toast.success("Logged out successfully!");
        navigate("/home");
    };

    const dropdownLinkClass =
        "block w-full text-left px-4 py-2 text-lg font-primary font-semibold text-primary dark:text-dark hover:bg-gray-100 dark:hover:bg-gray-600";

    const navLinkClass =
        "text-center text-lg font-semibold py-2";
        return (
            <header className="border-b border-gray-300 sticky top-0 z-20 bg-secondary">
                <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
                    <Link to="/" className="text-center text-lg font-semibold py-2">
                        <FontAwesomeIcon icon={faTags} className="mr-2" />
                        <span className="font-bold">Eazy Stickers</span>
                    </Link>
                    <nav className="flex items-center z-10">
                        <ul className="flex space-x-6 items-center">
                            <li>
                                <NavLink to="/home" className={({isActive}) => {
                                    return isActive ? `underline underline-offset-8 decoration-4 ${navLinkClass}` : navLinkClass;
                                }}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className={({isActive}) => {
                                    return isActive ? `underline underline-offset-8 decoration-4 ${navLinkClass}` : navLinkClass;
                                }}>About</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={({isActive}) => {
                                    return isActive ? `underline underline-offset-8 decoration-4 ${navLinkClass}` : navLinkClass;
                                }}>Contact</NavLink>
                            </li>
                            <li>
                            {isAuthenticated ? (
                                <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={toggleUserMenu}
                                    className="relative text-primary"
                                >
                                    <span className={navLinkClass}>
                                    {`Hello ${
                                        user.name.length > 5
                                        ? `${user.name.slice(0, 5).trim()}...`
                                        : user.name
                                    }`}
                                    </span>
                                    <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className="text-primary dark:text-light w-6 h-6"
                                    />
                                </button>
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 w-48 bg-normalbg dark:bg-darkbg border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20 transition ease-in-out duration-200">
                                    <ul className="py-2">
                                        <li>
                                        <Link to="/profile" className={dropdownLinkClass}>
                                            Profile
                                        </Link>
                                        </li>
                                        <li>
                                        <Link to="/orders" className={dropdownLinkClass}>
                                            Orders
                                        </Link>
                                        </li>
                                        {isAdmin && (
                                        <li>
                                            <button
                                            onClick={toggleAdminMenu}
                                            className={`${dropdownLinkClass} flex items-center justify-between`}
                                            >
                                            Admin
                                            <FontAwesomeIcon icon={faAngleDown} />
                                            </button>
                                            {isAdminMenuOpen && (
                                            <ul className="ml-4 mt-2 space-y-2">
                                                <li>
                                                <Link
                                                    to="/admin/orders"
                                                    className={dropdownLinkClass}
                                                >
                                                    Orders
                                                </Link>
                                                </li>
                                                <li>
                                                <Link
                                                    to="/admin/messages"
                                                    className={dropdownLinkClass}
                                                >
                                                    Messages
                                                </Link>
                                                </li>
                                            </ul>
                                            )}
                                        </li>
                                        )}

                                        <li>
                                        <Link
                                            to="/home"
                                            onClick={handleLogout}
                                            className={dropdownLinkClass}
                                        >
                                            Logout
                                        </Link>
                                        </li>
                                    </ul>
                                    </div>
                                )}
                                </div>
                            ) : (
                                <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? `underline underline-offset-8 decoration-4 ${navLinkClass}` : navLinkClass
                                }
                                >
                                Login
                                </NavLink>
                            )}
                            </li>
                            <li>
                                <Link to="/cart" className="relative text-primary py-2">
                                    <FontAwesomeIcon icon={faShoppingBasket} className="fa-lg" />
                                    <div className="absolute -top-2 -right-6 text-xs bg-light text-dark font-semibold rounded-full px-2 py-1 leading-none">
                                        {totalQuantity}
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <button onClick={toggleTheme}
                                    className="flex items-center justify-center mx-3 w-8 h-8 rounded-full border bg-dark dark:bg-light dark:text-dark border-primary transition duration-300 hover:bg-amber-200 dark:hover:text-light"
                                    aria-label="Toggle theme"
                                    >
                                    <FontAwesomeIcon icon={theme == "dark" ? faMoon : faSun} className="w-4 h-4"/>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
}

export default Header