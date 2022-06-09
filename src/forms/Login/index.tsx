/* eslint-disable no-restricted-globals */
import React, { useState, useRef } from 'react';

import "./styles.css"
import { LoginSchema } from './schema'
import { useValidateInput } from '../../hooks/useValidateInput'
import { FormLogin } from '../../services/auth/Model';
import { AuthService } from '../../services/auth/AuthService';

import { useFormik } from 'formik'

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';

import { Loading } from '../../components/Loading';

export const LoginForm = () => {
    const [checked, setChecked] = useState(false);
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null);

    const handleSubmit = async (data: FormLogin) => {
        setShowSpinnerLoading(true)
        try {
            await AuthService.login(data).then((authenticade) => {
                if (authenticade) {
                    location.href = './home'
                } else {
                    showError("E-mail ou senha incorretos!", "Tente novamente!")
                }
            })
        } catch (error: any) {
            showError('Erro ao realizar o login!', 'Erro: ' + error.message)
        }

        setShowSpinnerLoading(false)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: handleSubmit
    })

    const { isFormFieldValid, getFormErrorMessage } = useValidateInput(formik)

    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    return (
        <div className="content-box">
            <Toast ref={toast} />
            <Loading visible={showSpinnerLoading} />
            <div className="form-box">
                <h2>BackOffice</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="field">
                        <div className="input-box p-float-label">
                            <InputText
                                id="email"
                                autoComplete='off'
                                value={formik.values.email}
                                name="email"
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': isFormFieldValid('email') }, 'input p-inputtext-sm block mb-2')}
                            />
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <small className="p-error">{getFormErrorMessage('email')}</small>
                    </div>
                    <div className="field">
                        <div className="input-box p-float-label">
                            <Password
                                id="password"
                                autoComplete='off'
                                value={formik.values.password}
                                name="password"
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': isFormFieldValid('email') }, 'input p-inputtext-sm block mb-2')}
                                feedback={false}
                            />
                            <label htmlFor="password">Senha</label>
                        </div>
                        <small className="p-error">{getFormErrorMessage('password')}</small>
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
    )
}