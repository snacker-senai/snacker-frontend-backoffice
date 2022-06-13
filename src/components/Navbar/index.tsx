import { NavItem, PropsNavBar } from "./Models";
import { Link } from 'react-router-dom'

import './styles.css'

const Navbar = (props: PropsNavBar) => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="logo">
                    <a href="/principal" className="nav-link">
                        <span className="link-text logo-text">SNACKER</span>
                    </a>
                </li>
                {props.navigationBars.map((navigation: NavItem) => (
                    <li key={navigation.label} className="nav-item nav-active">
                        <Link to={navigation.linkTo} className="nav-link">
                            <i className={"pi " + navigation.icon}></i>
                            <span className="link-text">{navigation.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export { Navbar }
