import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import './footer.css'

export default function Footer(){
    return (
        <footer className="footer">
            Built with <FontAwesomeIcon icon={faHeart} className="footer-icon" /> 
            by <a href="https://www.aliya-h.com/" target="_blank" rel="noreferrer">Aliya H.</a>
        </footer>
    )
}