import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

export default function Footer(){
    return (
        <footer className="flex justify-center items-center py-4 text-light dark:text-dark">
            Built with <FontAwesomeIcon icon={faHeart} className="text-red-600 mx-1 animate-pulse" /> 
            by <a href="https://www.aliya-h.com/" target="_blank" rel="noreferrer" className="font-semibold px-1 transition-colors duration-300 hover:text-gray-600 dark:hover:text-secondary">Aliya H.</a>
        </footer>
    )
}