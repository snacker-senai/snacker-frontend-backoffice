import './styles.css'

import { useState } from "react";
import { NavItem } from '../NavbarV2/Models';
import { AuthService } from '../../services/auth/AuthService';

interface Props {
    navigationBars: NavItem[] | null
}

export const NavbarV2 = ({ navigationBars }: Props) => {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
    }

    return (
        <nav className="navbar-items">
            <h1 className="navbar-logo">

                <i className="fa fa-utensils"></i> Snacker
            </h1>
            <div className="menu-icons" onClick={handleClick}>
                <i
                    className={clicked ? "fas fa-times" : "fas fa-bars"}
                ></i>
            </div>

            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                {navigationBars?.map((item, index) => (

                    <li key={index}>
                        <a className="nav-links" href={item.linkTo}>
                            <i className={item.icon}></i>
                            {item.label}
                        </a>
                    </li>
                ))}
                <li>
                    <a className="nav-links" onClick={AuthService.logoutUser} href='/login'>
                        <i className='fa-solid fa-power-off'></i>
                        Sair
                    </a>
                </li>
            </ul>
        </nav>
    )
}