/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';

import './styles.css'

import { useFormik } from 'formik';
import { EmployeeDialogForm, EmployeeDialogSchema } from './schema';
import { useValidateInput } from '../../../hooks/useValidateInput'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils'
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';

import { EmployeesService } from '../../../services/employee/EmployeesService';
import { Employee, UserType } from "./../../../services/employee/Models";
import UserTypeService from '../../../services/user-type/UserTypeService';
import { Loading } from '../../Loading';

interface PropsEmployeeDialog {
    employee?: Employee
    visible: boolean
    onHide(): void
}

export const EmployeeDialog = (props: PropsEmployeeDialog) => {
    const [tabPanelCurrent, setTabPanelCurrent] = useState(0)
    const [usersType, setUsersType] = useState<any[]>([])
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null);

    const loadingUsersTypes = () => {
        setShowSpinnerLoading(true)

        UserTypeService.get().then((types: UserType[]) => {
            const usersType: any[] = []
            types.forEach(type => {
                usersType.push({
                    'name': type.name,
                    'code': type.id,
                })
            })

            setUsersType(usersType)
        })

        setShowSpinnerLoading(false)
    }

    useEffect(() => {
        loadingUsersTypes()
    }, [])

    const nextTabPanel = (index: number) => {
        setTabPanelCurrent(index)
    }

    const handleSubmit = async (form: EmployeeDialogForm) => {
        setShowSpinnerLoading(true)

        try {
            await EmployeesService.set({
                id: props.employee?.id,
                email: form.email,
                password: form.password,
                personId: props.employee?.personId,
                person: {
                    document: form.document,
                    birthDate: form.dateBirth,
                    phone: form.cellphone,
                    name: form.name,
                    id: props.employee?.personId,
                },
                userTypeId: form.userType.code,
            })
            showSuccess(`Usuário ${props.employee?.id ? "alterado" : "cadastrado"} com sucesso!`,
                `Usuário ${form.name} ${props.employee?.id ? "alterado" : "cadastrado"} com sucesso no sistema!`)
            props.onHide()
        } catch (error: any) {
            console.log(error)
            showError(`Falha ao ${props.employee?.id ? "alterar" : "cadastrar"} o usuário no sistema!`,
                error.message)
        }

        setShowSpinnerLoading(false)
    }

    const getUserTypeDefault = (): any => {
        if (props.employee?.userTypeId) {
            return {
                name: props.employee.userType?.name,
                code: props.employee.userType?.id
            }
        }

        if (usersType.length > 0)
            return usersType[0]

        return null
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: props.employee?.person.name ? props.employee.person.name : '',
            document: props.employee?.person.document ? props.employee.person.document : '',
            cellphone: props.employee?.person.phone ? props.employee.person.phone : '',
            dateBirth: props.employee?.person.birthDate ? new Date(props.employee.person.birthDate) : undefined,
            email: props.employee?.email ? props.employee.email : '',
            password: props.employee?.password ? props.employee.password : '',
            userType: getUserTypeDefault()
        },
        validationSchema: EmployeeDialogSchema,
        onSubmit: handleSubmit,
    })

    const { isFormFieldValid } = useValidateInput(formik)

    const renderFooter = () => {
        switch (tabPanelCurrent) {
            case 0:
                return (
                    <Button
                        label='Próximo'
                        onClick={() => nextTabPanel(1)}
                    />
                )
            case 1:
                return (
                    <div>
                        <Button label='voltar' onClick={() => nextTabPanel(1)}></Button>
                        <Button type='submit' label={props.employee?.id ? 'alterar' : 'cadastrar'} onClick={() => formik.handleSubmit()}></Button>
                    </div>
                )
        }
    }

    const onChangeUserType = (value: any) => {
        formik.setFieldValue("userType", value)
    }

    const showSuccess = (sumary, detail: string) => {
        toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
    }

    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    const onHide = () => {
        props.onHide()
        setTabPanelCurrent(0)
    }

    return (
        <div>
            <Toast ref={toast} />
            <Loading visible={showSpinnerLoading} />
            <Dialog header={props.employee?.id ? 'Alterar Cadastro do ' + formik.values.name : 'Cadastrar funcionário'} onHide={onHide} visible={props.visible} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} footer={renderFooter}>
                <TabView className="tabview-header-icon" activeIndex={tabPanelCurrent} onTabChange={(e) => setTabPanelCurrent(e.index)}>
                    <TabPanel header="Dados pessoais" disabled={tabPanelCurrent !== 0}>
                        <div className="employee-dialog-groups">
                            <div className="employee-dialog-group">
                                <span className="p-float-label">
                                    <InputText
                                        id="name"
                                        autoComplete='off'
                                        value={formik.values.name}
                                        name="name"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('name') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="name">Nome completo</label>
                                </span>
                                <span className="p-float-label">
                                    <Calendar
                                        id="dateBirth"
                                        value={formik.values.dateBirth}
                                        name="dateBirth"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('dateBirth') }, 'input p-inputtext-sm block mb-2')}
                                        dateFormat="dd/mm/yy"
                                        showIcon
                                        onMonthChange={() => { }}
                                    />
                                    <label htmlFor="dateBirth">Data de nascimento</label>
                                </span>
                            </div>

                            <div className="employee-dialog-group">
                                <span className="p-float-label">
                                    <InputMask
                                        id="document"
                                        mask="999.999.999-99"
                                        value={formik.values.document}
                                        name="document"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('document') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="document">CPF</label>
                                </span>
                                <span className="p-float-label">
                                    <InputMask
                                        id="phone"
                                        mask="(99) 99999-9999"
                                        value={formik.values.cellphone}
                                        name="cellphone"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('cellphone') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="cellphone">Telefone</label>
                                </span>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel header="Usuário" disabled={tabPanelCurrent !== 2}>
                        <div className="employee-dialog-group">
                            <span className="p-float-label">
                                <InputText
                                    id="email"
                                    value={formik.values.email}
                                    name="email"
                                    onChange={formik.handleChange}
                                    className={classNames({ 'p-invalid': isFormFieldValid('email') }, 'input p-inputtext-sm block mb-2')}
                                />
                                <label htmlFor="email">E-mail</label>
                            </span>
                            <span className="p-float-label">
                                <Password
                                    id='password'
                                    feedback={false}
                                    value={formik.values.password}
                                    name="password"
                                    onChange={formik.handleChange}
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') }, 'input p-inputtext-sm block mb-2')}
                                />
                                <label htmlFor="password">Senha</label>
                            </span>
                        </div>
                        <div className="employee-dialog-group">
                            <span className="p-float-label">
                                <Dropdown
                                    value={formik.values.userType || usersType[0]}
                                    options={usersType}
                                    onChange={(e) => onChangeUserType(e.target.value)}
                                    optionLabel="name"
                                    name="userType"
                                />
                                <label htmlFor="userType">Tipo de usuário</label>
                            </span>
                        </div>
                    </TabPanel>
                </TabView>
            </Dialog>
        </div>
    )
}