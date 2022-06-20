import { LoginForm } from "../../forms/Login"
import { Image } from 'primereact/image';

import "./styles.css"

const Login = () => {
    const logo = require('../../assets/login.png')

    return (
        <main className="login-main">
            <div className="img-box">
                <Image src={logo} />
            </div>
            <LoginForm />
        </main>
    )
}

export { Login }