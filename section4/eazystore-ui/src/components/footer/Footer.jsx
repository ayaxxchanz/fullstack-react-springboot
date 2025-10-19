import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
// import './footer.css'
import styles from './Footer.module.css'
import styled from "styled-components";

// const H1 = styled.h1`
//   color: #5b21b6;
//   text-align: center;
// `;

export default function Footer(){
    const isActive = Math.random() > 0.5;
    return (
        <>
            {/* <H1>Demo of Styled Components from Footer</H1>
            <EazyButton $primary>Submit</EazyButton> */}
            {/* <h1
                className={`${styles["my-heading"]} ${
                isActive ? styles["primary-color"] : styles["secondary-color"]
                } `}
            >
                Demo of Global CSS Scope from Home
            </h1> */}
            {/* <h1
                style={{
                textAlign: "center",
                color: isActive ? "#5B21B6" : "#333",
                }}
            >
                Demo of Global CSS Scope from Footer
            </h1> */}
            {/* <h1 className="my-heading">Demo of Global CSS Scope from Footer</h1> */}
            <footer className="footer">
                Built with <FontAwesomeIcon icon={faHeart} className="footer-icon" /> 
                by <a href="https://www.aliya-h.com/" target="_blank" rel="noreferrer">Aliya H.</a>
            </footer>
        </>
    )
}