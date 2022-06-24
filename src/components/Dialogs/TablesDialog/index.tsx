/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from 'react';

import './styles.css';

import { useFormik } from 'formik';
import { useValidateInput } from '../../../hooks/useValidateInput';
import { TablesDialogSchema, TablesForm } from './schema';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';


import { Table } from '../../../services/table/Models';
import { TableService } from '../../../services/table/TableService';
import { Loading } from '../../Loading';

interface PropsTablesDialog {
    table?: Table
    visible: boolean
    onHide(): void
    onCreate(table: Table): void
}

export const TablesDialog = (props: PropsTablesDialog) => {
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null);

    const handleSubmit = async (form: TablesForm) => {
        setShowSpinnerLoading(true)

        try {
            const active = props.table?.active ?? true

            const createdTable = await TableService.createOrUpdate({
                id: props.table?.id,
                number: form.number,
                active
            })

            if (!props.table?.id) {
                props.onCreate(createdTable)
            }
            
            showSuccess('Mesa salva com sucesso!', 'Mesa salva com sucesso!')
            props.onHide()
        } catch (error: any) {
            console.log(error)
            showError(`Falha ao salvar a mesa no sistema!`, error.message)
        }

        setShowSpinnerLoading(false)
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            number: props.table?.number ? props.table.number : ''
        },
        validationSchema: TablesDialogSchema,
        onSubmit: handleSubmit,
    })

    const { isFormFieldValid } = useValidateInput(formik)

    const renderFooter = () => {
        return (
            <Button type='submit' label={props.table?.id ? 'Alterar' : 'Cadastrar'} onClick={() => formik.handleSubmit()}></Button>
        )
    }

    const showSuccess = (sumary, detail: string) => {
        toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
    }

    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    return (
        <div>
            <Toast ref={toast} />
            <Loading visible={showSpinnerLoading} />
            <Dialog header={props.table?.id ? 'Alterar cadastro' : 'Cadastrar mesa'} onHide={props.onHide} visible={props.visible} breakpoints={{ '960px': '75vw' }} style={{ width: '35vw' }} footer={renderFooter}>
                <div className="products-category-dialog-groups">
                    <div className="products-category-dialog-group">
                        <span className="p-float-label">
                            <InputText
                                id="number"
                                autoComplete='off'
                                value={formik.values.number}
                                name="number"
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': isFormFieldValid('number') }, 'input p-inputtext-sm block mb-2')}
                            />
                            <label htmlFor="number">Número</label>
                        </span>
                    </div>
                </div>
            </Dialog >
        </div >
    )
}