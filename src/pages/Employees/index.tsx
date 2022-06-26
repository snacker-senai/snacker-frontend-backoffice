/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import './styles.css'

import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable'

import { EmployeesService } from '../../services/employee/EmployeesService';
import { Employee } from '../../services/employee/Models';
import { EmployeeDialog } from '../../components/Dialogs/EmployeeDialog';
import { Loading } from '../../components/Loading';
import { Column } from 'primereact/column';
import moment from 'moment';
import { AuthService } from '../../services/auth/AuthService';

const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [employeeCurrent, setEmployeeCurrent] = useState<Employee | undefined>(undefined)
    const [visibleDialog, setVisibleDialog] = useState(false)
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null);

    useEffect(() => {
        buildEmployees()
    }, [])

    const buildEmployees = async () => {
        setShowSpinnerLoading(true)

        try {
            const data = await EmployeesService.get()
            const infoUserLogged = await AuthService.getInfoUserLogged()

            for (let i = 0; i < data.length; i++) {
                if ((data[i].email === infoUserLogged?.email && data[i].userType?.name === infoUserLogged?.role)
                    || data[i].userType?.name === 'Admin') {
                    data.splice(i, 1)
                }
            }

            setEmployees(data)
        } catch (error: any) {
            console.log(error)
            showError("Erro ao buscar os usuários!", `Erro: ${error.message}`)
        }

        setShowSpinnerLoading(false)
    }

    const loadingAndSetVisibleDialog = (visible: boolean) => {
        setVisibleDialog(visible)
        buildEmployees()
    }

    const columnActions = (employee: Employee) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-info"
                    onClick={() => {
                        setEmployeeCurrent(employee)
                        setVisibleDialog(true)
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-primary"
                    onClick={async () => {
                        setShowSpinnerLoading(true)

                        try {
                            await EmployeesService.del(employee.id)
                            showSuccess("Usuário excluído com sucesso!",
                                `Usuário ${employee.person.name} removido do sistema!`
                            )
                            buildEmployees()
                        } catch (error: any) {
                            showError("Erro ao remover usuário!", `Erro ao remover: ${error.message}`)
                        }

                        setShowSpinnerLoading(false)
                    }}
                />
            </>
        );
    }

    const leftToolbar = () => {
        return (
            <Button
                label="Adicionar funcionário"
                icon="pi pi-plus"
                className="p-button-primary mr-2"
                onClick={() => {
                    setEmployeeCurrent(undefined)
                    setVisibleDialog(true)
                }}
            />
        )
    };

    const showSuccess = (sumary, detail: string) => {
        toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
    }

    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    return (
        <div className="container-employees">
            <Loading visible={showSpinnerLoading} />
            <Toast ref={toast} />
            <EmployeeDialog onHide={() => loadingAndSetVisibleDialog(false)} visible={visibleDialog} employee={employeeCurrent} />
            <Toolbar className="mb-2" left={leftToolbar}></Toolbar>
            <div className='panel'>
                <DataTable
                    value={employees}
                    stripedRows
                    paginator
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    rows={15}
                >
                    <Column
                        field='person.name'
                        header='Nome'
                    />
                    <Column
                        field='person.document'
                        header='CPF'
                    />
                    <Column
                        field='person.birthDate'
                        header='Data de nascimento'
                        body={(data) => moment(data.person.birthDate).format('DD/MM/yyyy')}
                    />
                    <Column
                        field='userType.name'
                        header='Tipo'
                    />
                    <Column
                        field='person.phone'
                        header='Telefone'
                    />
                    <Column
                        field='email'
                        header='E-mail'
                    />
                    <Column
                        style={{ width: '8rem' }}
                        field=""
                        header=""
                        body={columnActions}
                        exportable={false}
                        className='employees-action'
                    />
                </DataTable>
            </div>
        </div >
    )
}

export { Employees }