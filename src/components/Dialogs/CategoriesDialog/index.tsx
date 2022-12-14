/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef } from 'react';

import './styles.css'

import { useFormik } from 'formik';
import { ProductsCategoryDialogSchema, ProductsCategoryForm } from './schema';
import { useValidateInput } from '../../../hooks/useValidateInput'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast';


import { ProductCategory } from "./../../../services/product/Models";
import { Loading } from '../../Loading';
import { ProductCategoryService } from '../../../services/product-category/ProductCategoryService';
import { useFormIsValid, useResetForm } from '../../../util/form';

interface ProspProductsCategroyDialog {
    productCategory?: ProductCategory
    visible: boolean
    onHide(): void
}

export const ProductsCategoryDialog = (props: ProspProductsCategroyDialog) => {
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null);

    const handleSubmit = async (form: ProductsCategoryForm) => {
        setShowSpinnerLoading(true)

        try {
            const active = props.productCategory?.active ?? true

            await ProductCategoryService.set({
                id: props.productCategory?.id,
                name: form.name,
                active: active
            })
            showSuccess(`Categoria ${props.productCategory?.id ? "alterado" : "cadastrado"} com sucesso!`,
                `Categoria ${form.name} ${props.productCategory?.id ? "alterado" : "cadastrado"} com sucesso no sistema!`)
            formik.resetForm()
            props.onHide()
        } catch (error: any) {
            console.log(error)
            showError(`Falha ao ${props.productCategory?.id ? "alterar" : "cadastrar"} o categoria no sistema!`,
                error.message)
        }

        setShowSpinnerLoading(false)
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: props.productCategory?.name ? props.productCategory.name : ''
        },
        validationSchema: ProductsCategoryDialogSchema,
        onSubmit: handleSubmit,
    })

    const { isFormFieldValid } = useValidateInput(formik)

    const disabledButton = !useFormIsValid(formik)

    const renderFooter = () => {
        return (
            <Button type='submit' disabled={disabledButton} label={props.productCategory?.id ? 'Alterar' : 'Cadastrar'} onClick={() => formik.handleSubmit()}></Button>
        )
    }

    const showSuccess = (sumary, detail: string) => {
        toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
    }

    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    useResetForm(props.visible, formik)

    return (
        <div>
            <Toast ref={toast} />
            <Loading visible={showSpinnerLoading} />
            <Dialog header={props.productCategory?.id ? 'Alterar Cadastro do ' + formik.values.name : 'Cadastrar Categoria'} onHide={props.onHide} visible={props.visible} breakpoints={{ '960px': '75vw' }} style={{ width: '35vw' }} footer={renderFooter}>
                <div className="products-category-dialog-groups">
                    <div className="products-category-dialog-group">
                        <span className="p-float-label">
                            <InputText
                                id="name"
                                autoComplete='off'
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