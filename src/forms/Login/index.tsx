import React, { useState } from 'react';
import "./styles.css"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Checkbox } from 'primereact/checkbox';

export const LoginForm = () => {
    const logo = require('../../assets/home.png')
    const [checked, setChecked] = useState(false);

    return (
        <main>
            <div className="img-box">
                <Image src={logo} />
            </div>
            <div className="content-box">
                <div className="form-box">
                    <h2>BackOffice</h2>
                    <form>
                        <div className="input-box p-float-label">
                            <InputText id="username" className="input p-inputtext-sm block mb-2" autoComplete='off' />
                            <label htmlFor="username">Username</label>
                        </div>

                        <div className="input-box p-float-label">
                            <InputText id="password" className="input p-inputtext-sm block mb-2" autoComplete='off' />
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="field-checkbox">
                            <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} />
                            <label htmlFor="binary"> Lembrar-me</label>
                        </div>


                        <div className="input-box">
                            <Button label="Entrar" className="p-button-outlined button" />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}