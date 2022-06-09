import { NavItem, PropsNavBar } from "./Models";

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
                        <a href={navigation.linkTo} className="nav-link">
                            <i className={"pi " + navigation.icon}></i>
                            <span className="link-text">{navigation.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export { Navbar }