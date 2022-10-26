/* eslint-disable no-restricted-globals */
import React, { useState, useRef } from 'react';

import "./styles.css"
import { ChangePasswordSchema } from './schema'
import { useValidateInput } from '../../hooks/useValidateInput'

import { useFormik } from 'formik'

import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';

import { Loading } from '../../components/Loading';
import { InputText } from 'primereact/inputtext';
import { ChangePasswordService } from '../../services/change-password/ChangePasswordService';
import { useHistory } from 'react-router';
import { AuthService } from '../../services/auth/AuthService';

export interface ChangePasswordFormProps {
    emailProps?: string, oldPasswordProps?: string
}

export const ChangePasswordForm = ({ emailProps, oldPasswordProps }: ChangePasswordFormProps) => {
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null);
    const history = useHistory()

    const handleSubmit = async (data: { oldPassword: string, newPassword: string }) => {
        setShowSpinnerLoading(true)
        try {
            if (oldPasswordProps !== data.oldPassword) {
                showError('Ops!', 'As informações inseridas não estão coesas com a do sistema!')
            } else {
                const token = await ChangePasswordService.changePasswordAndGetTokenSession({
                    email: emailProps ?? "",
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                })

                AuthService.setTokenInLocal(token)
                ChangePasswordService.removeLocalInfoUserIsChangePassword()
                history.push('/dashboard')
            }
        } catch (error: any) {
            showError('Erro ao trocar a senha!', 'Erro: ' + error.message)
        }

        setShowSpinnerLoading(false)
    }

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: ''
        },
        validationSchema: ChangePasswordSchema,
        onSubmit: handleSubmit
    })

    const { isFormFieldValid, getFormErrorMessage } = useValidateInput(formik)

    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 7000 });
    }

    return (
        <div className="content-box">
            <Toast ref={toast} />
            <Loading visible={showSpinnerLoading} />
            <div className="form-box">
                <h2>Desbloqueio da conta</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="field">
                        <div className="input-box p-float-label">
                            <InputText
                                id="email"
                                autoComplete='off'
                                value={emailProps}
                                name="email"
                                className='input p-inputtext-sm block mb-2'
                                disabled={true}
                            />
                            <label htmlFor="email">E-mail</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="input-box p-float-label">
                            <Password
                                id="oldPassword"
                                autoComplete='off'
                                value={formik.values.oldPassword}
                                name="oldPassword"
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': isFormFieldValid('oldPassword') }, 'input p-inputtext-sm block mb-2')}
                                feedback={false}
                            />
                            <label htmlFor="oldPassword">Senha antiga</label>
                        </div>
                        <small className="p-error">{getFormErrorMessage('oldPassword')}</small>
                    </div>
                    <div className="field">
                        <div className="input-box p-float-label">
                            <Password
                                id="newPassword"
                                autoComplete='off'
                                value={formik.values.newPassword}
                                name="newPassword"
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': isFormFieldValid('newPassword') }, 'input p-inputtext-sm block mb-2')}
                                feedback={false}
                            />
                            <label htmlFor="newPassword">Nova senha</label>
                        </div>
                        <small className="p-error">{getFormErrorMessage('newPassword')}</small>
                    </div>

                    <div className="input-box">
                        <Button label="Desbloquear" className="p-button-outlined button" />
                    </div>
                </form>
            </div>
        </div>
    )
}