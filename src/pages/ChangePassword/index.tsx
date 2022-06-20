import './styles.css'

import { Image } from 'primereact/image';
import { ChangePasswordForm } from '../../forms/ChangePassword';

export const ChangePassword = () => {
    const logo = require('../../assets/change-password.png')

    return (
        <main className="change-password-container" >
            <div className="img-box">
                <Image src={logo} />
            </div>
            <ChangePasswordForm />
        </main>
    )
}