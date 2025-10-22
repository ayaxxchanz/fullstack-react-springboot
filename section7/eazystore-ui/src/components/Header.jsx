import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons"

const Header = () => {
  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2";
    return (
        <header className="border-b border-gray-300 sticky top-0 z-20 bg-secondary">
            <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
                <a href="/" className="text-center text-lg font-primary font-semibold text-primary py-2">
                    <FontAwesomeIcon icon={faTags} className="mr-2" />
                    <span className="font-bold">Eazy Stickers</span>
                </a>
                <nav className="flex items-center py-2 z-10">
                    <ul className="flex space-x-6">
                        <li>
                            <a href="/" className={navLinkClass}>Home</a>
                        </li>
                        <li>
                            <a href="/about" className={navLinkClass}>About</a>
                        </li>
                        <li>
                            <a href="/contact" className={navLinkClass}>Contact</a>
                        </li>
                        <li>
                            <a href="/login" className={navLinkClass}>Login</a>
                        </li>
                        <li>
                            <a href="/cart" className="text-primary py-2">
                                <FontAwesomeIcon icon={faShoppingBasket} />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header