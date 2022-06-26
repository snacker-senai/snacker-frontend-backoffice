import { NavItem, PropsNavBar } from "./Models";
import { Link } from 'react-router-dom'

import './styles.css'
import { useMenu } from "../../context/MenuContext";

const Navbar = (props: PropsNavBar) => {
    const { selectedMenu } = useMenu()

    const getLiClassName = (menuId: number) => {
        if (menuId === selectedMenu) return 'nav-active'
    }

    const logout = () => {
        localStorage.removeItem("accessToken")
        window.location.href = "/login"
    }

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="logo">
                    <a href="/principal" className="nav-link">
                        <span className="link-text logo-text">SNACKER</span>
                    </a>
                </li>
                {props.navigationBars && props.navigationBars.map((navigation: NavItem) => (
                    <li key={navigation.label} className={`nav-item ${getLiClassName(navigation.id)}`}>
                        <Link to={navigation.linkTo} className="nav-link">
                            <i className={"pi " + navigation.icon}></i>
                            <span className="link-text">{navigation.label}</span>
                        </Link>
                    </li>
                ))}
                <li className="nav-item" style={{ cursor: 'pointer' }}>
                    <span className="nav-link" onClick={logout}>
                        <i className="pi pi-power-off"></i>
                        <span className="link-text">Sair</span>
                    </span>
                </li>
            </ul>
        </nav>
    )
}

export { Navbar }
