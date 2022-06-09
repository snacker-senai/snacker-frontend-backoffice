/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import './styles.css'

import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Carousel } from 'primereact/carousel';
import { Toast } from 'primereact/toast';

import { EmployeesService } from '../../services/employee/EmployeesService';
import { Employee } from '../../services/employee/Models';
import { EmployeeDialog } from '../../components/Dialogs/EmployeeDialog';
import { Loading } from '../../components/Loading';

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
            await EmployeesService.get().then((data: Employee[]) => setEmployees(data))
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

    const footer = (employee: Employee) => {
        return (
            <div className='card-footer'>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        setEmployeeCurrent(employee)
                        setVisibleDialog(true)
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning"
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
            </div>
        );
    }

    const rightToolbar = () => {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    className="p-inputtext-sm block mb-2"
                    placeholder="Pesquise..."

                />
            </span>
        )
    }

    const leftToolbar = () => {
        return (
            <Button
                label="Adicionar funcionário"
                icon="pi pi-plus"
                className="p-button-success mr-2"
                onClick={() => {
                    setEmployeeCurrent(undefined)
                    setVisibleDialog(true)
                }}
            />
        )
    }

    const header = <Toolbar className="mb-2" left={leftToolbar} right={rightToolbar}></Toolbar>

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '850px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '600px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const employeeTemplate = (employee: Employee) => {
        return (
            <Card
                key={employee.personId}
                title={employee.person.name}
                subTitle={employee.person.document}
                style={{ width: '17em', height: '100%' }}
                footer={footer(employee)}
            >
                <p><strong>Data de nascimento:</strong> {employee.person.birthDate?.toString()}</p>
                <p><strong>Tipo de usuário:</strong> {employee.userType?.name}</p>
                <p><strong>Telefone:</strong> {employee.person.phone}</p>
                <p><strong>CPF:</strong> {employee.person.document}</p>
                <p><strong>E-mail:</strong> {employee.email}</p>
                <p><strong>CEP:</strong> {employee.person.address.cep}</p>
                <p><strong>País:</strong> {employee.person.address.country}</p>
                <p><strong>Estado:</strong> {employee.person.address.state}</p>
                <p><strong>Bairro:</strong> {employee.person.address.district}</p>
                <p><strong>Rua:</strong> {employee.person.address.street}</p>
                <p><strong>Número:</strong> {employee.person.address.number}</p>
            </Card>
        );
    }

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
            <div className="card">
                <Carousel value={employees} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
                    itemTemplate={employeeTemplate} header={header} />
            </div>
        </div >
    )
}

export { Employees }