/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from 'react';

import './styles.css';

import { useFormik } from 'formik';
import { useValidateInput } from '../../../hooks/useValidateInput';
import { RestaurantCategoriesForm } from './schema';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';


import { RestaurantCategory } from '../../../services/employee/Models';
import { RestaurantCategoryService } from '../../../services/restaurant-category/RestaurantCategory';
import { Loading } from '../../Loading';
import { ProductsCategoryDialogSchema } from '../CategoriesDialog/schema';

interface PropsRestaurantCategoriesDialog {
    category?: RestaurantCategory
    visible: boolean
    onHide(): void
}

export const RestaurantCategoriesDialog = (props: PropsRestaurantCategoriesDialog) => {
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null);

    const handleSubmit = async (form: RestaurantCategoriesForm) => {
        setShowSpinnerLoading(true)

        try {
            const active = props.category?.active ?? true

            await RestaurantCategoryService.createOrUpdate({
                id: props.category?.id,
                name: form.name,
                active
            })
            
            showSuccess('Categoria salva com sucesso!', 'Categoria salva com sucesso!')
            props.onHide()
        } catch (error: any) {
            console.log(error)
            showError(`Falha ao salvar a categoria no sistema!`, error.message)
        }

        setShowSpinnerLoading(false)
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: props.category?.name ? props.category.name : ''
        },
        validationSchema: ProductsCategoryDialogSchema,
        onSubmit: handleSubmit,
    })

    const { isFormFieldValid } = useValidateInput(formik)

    const renderFooter = () => {
        return (
            <Button type='submit' label={props.category?.id ? 'Alterar' : 'Cadastrar'} onClick={() => formik.handleSubmit()}></Button>
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
            <Dialog header={props.category?.id ? 'Alterar cadastro' : 'Cadastrar categoria'} onHide={props.onHide} visible={props.visible} breakpoints={{ '960px': '75vw' }} style={{ width: '35vw' }} footer={renderFooter}>
                <div className="products-category-dialog-groups">
                    <div className="products-category-dialog-group">
                        <span className="p-float-label">
                            <InputText
                                id="name"
                                autoComplete="off"
                                value={formik.values.name}
                                name="name"
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': isFormFieldValid('name') }, 'input p-inputtext-sm block mb-2')}
                            />
                            <label htmlFor="name">Nome</label>
                        </span>
                    </div>
                </div>
            </Dialog >
        </div >
    )
}