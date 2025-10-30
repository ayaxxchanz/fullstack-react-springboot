import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBasket, faTags, faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";

const Header = () => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        if(theme === "dark"){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

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
                                <NavLink to="/login" className={({isActive}) => {
                                    return isActive ? `underline underline-offset-8 decoration-4 ${navLinkClass}` : navLinkClass;
                                }}>Login</NavLink>
                            </li>
                            <li>
                                <Link to="/cart">
                                    <FontAwesomeIcon icon={faShoppingBasket} className="fa-lg" />
                                </Link>
                            </li>
                        </ul>
                        <button onClick={toggleTheme}
                            className="flex items-center justify-center mx-3 w-8 h-8 rounded-full border bg-dark dark:bg-light dark:text-dark border-primary transition duration-300 hover:bg-amber-200 dark:hover:text-light"
                            aria-label="Toggle theme"
                            >
                            <FontAwesomeIcon icon={theme == "dark" ? faMoon : faSun} className="w-4 h-4"/>
                        </button>
                    </nav>
                </div>
            </header>
        )
}

export default Header