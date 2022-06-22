/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './styles.css'

import { Image } from 'primereact/image';
import { ChangePasswordForm } from '../../forms/ChangePassword';
import { AuthService } from '../../services/auth/AuthService';
import { useHistory } from 'react-router';
import { ChangePasswordService, InfoChangePasswordLocal } from '../../services/change-password/ChangePasswordService';

export const ChangePassword = () => {
    const logo = require('../../assets/change-password.png')
    const history = useHistory()
    const [form, setForm] = useState<InfoChangePasswordLocal>()

    useEffect(() => {
        const data = ChangePasswordService.getLocalInfoUserIsChangePassword()

        if (AuthService.userIsLogged() || data === null)
            history.push('/login')
        else
            setForm(data)
    }, [])

    return (
        <main className="change-password-container" >
            <div className="img-box">
                <Image src={logo} />
            </div>
            <ChangePasswordForm emailProps={form?.email} oldPasswordProps={form?.oldPassword} />
        </main>
    )
}