import { useEffect, useState, useRef } from 'react';

import './styles.css'

import { useFormik } from 'formik';
import { ProductDialogSchema, ProductForm } from './schema';
import { useValidateInput } from '../../../hooks/useValidateInput'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';


import { Product, ProductCategory } from "./../../../services/product/Models";
import { Loading } from '../../Loading';
import { ProductService } from '../../../services/product/ProductService';
import { ProductCategoryService } from '../../../services/product-category/ProductCategoryService';

interface PropsProductDialog {
    product?: Product
    visible: boolean
    onHide(): void
}

export const ProductDialog = (props: PropsProductDialog) => {
    const [productsCategory, setProductsCategory] = useState<any[]>([])
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null);

    const loadingProductsCategory = async () => {
        setShowSpinnerLoading(true)

        try {
            await ProductCategoryService.get().then((products: ProductCategory[]) => {
                const productsCategory: any[] = []
                products.forEach(type => {
                    productsCategory.push({
                        'name': type.name,
                        'code': type.id,
                    })
                })

                setProductsCategory(productsCategory)
            })
        } catch (error: any) {
            showError('Falha ao buscar as categorias dos produtos', `Erro: ${error.message}`)
        }



        setShowSpinnerLoading(false)
    }

    useEffect(() => {
        loadingProductsCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (form: ProductForm) => {
        setShowSpinnerLoading(true)

        try {
            await ProductService.set({
                id: props.product?.id,
                name: form.name,
                active: form.active,
                description: form.description,
                image: form.image,
                price: Number(form.price),
                productCategoryId: form.productCategory.code,
                preReady: form.preReady
            })
            showSuccess(`Produto ${props.product?.id ? "alterado" : "cadastrado"} com sucesso!`,
                `Produto ${form.name} ${props.product?.id ? "alterado" : "cadastrado"} com sucesso no sistema!`)
            formik.resetForm()
            props.onHide()
        } catch (error: any) {
            console.log(error)
            showError(`Falha ao ${props.product?.id ? "alterar" : "cadastrar"} o produto no sistema!`,
                error.message)
        }

        setShowSpinnerLoading(false)
    }

    const getProductCategoryDefault = (): any => {
        if (props.product?.productCategory) {
            return {
                name: props.product.productCategory.name,
                code: props.product.productCategory.id
            }
        }

        if (productsCategory.length > 0)
            return productsCategory[0]

        return null
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: props.product?.name ? props.product.name : '',
            active: props.product?.active ? props.product.active : false,
            preReady: props.product?.preReady ? props.product.preReady : false,
            description: props.product?.description ? props.product.description : '',
            image: props.product?.image ? props.product.image : '',
            price: props.product?.price ? props.product.price : 0,
            productCategory: getProductCategoryDefault()
        },
        validationSchema: ProductDialogSchema,
        onSubmit: handleSubmit,
    })

    const { isFormFieldValid } = useValidateInput(formik)

    const renderFooter = () => {
        return (
            <Button type='submit' label={props.product?.id ? 'Alterar' : 'Cadastrar'} onClick={() => formik.handleSubmit()}></Button>
        )
    }

    const onChangeProductCategory = (value: any) => {
        formik.setFieldValue("productCategory", value)
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
            <Dialog header={props.product?.id ? 'Alterar Cadastro do ' + formik.values.name : 'Cadastrar Produto'} onHide={props.onHide} visible={props.visible} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} footer={renderFooter}>
                <div className="product-dialog-groups">
                    <div className="product-dialog-group">
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
                        <span className="p-float-label">
                            <InputText
                                id="description"
                                value={formik.values.description}
                                name="description"
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': isFormFieldValid('description') }, 'input p-inputtext-sm block mb-2')}
                            />
                            <label htmlFor="document">Descrição</label>
                        </span>
                    </div>

                    <div className="product-dialog-group">
                        <span className="p-float-label">
                            <InputText
                                id="image"
                                value={formik.values.image}
                                name="image"
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': isFormFieldValid('image') }, 'input p-inputtext-sm block mb-2')}
                            />
                            <label htmlFor="cellphone">URL da imagem</label>
                        </span>
                        <span className="p-float-label">
                            <InputText
                                id="price"
                                value={formik.values.price}
                                name="price"
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': isFormFieldValid('price') }, 'input p-inputtext-sm block mb-2')}
                            />
                            <label htmlFor="cellphone">Preço</label>
                        </span>
                    </div>
                    <div className="product-dialog-group">
                        <span className="p-float-label">
                            <Dropdown
                                value={formik.values.productCategory || productsCategory[0]}
                                options={productsCategory}
                                onChange={(e) => onChangeProductCategory(e.target.value)}
                                optionLabel="name"
                                name="productsCategory"
                            />
                            <label htmlFor="productsCategory">Categoria</label>
                        </span>
                    </div>
                    <div className="product-dialog-group" style={{ justifyContent: 'right' }}>
                        <div className="field-checkbox">
                            <label htmlFor="preReady">Sem&nbsp;preparo</label>
                            <Checkbox
                                id='preReady'
                                inputId="preReady"
                                name='preReady'
                                value={formik.values.preReady}
                                checked={formik.values.preReady}
                                onChange={formik.handleChange}
                                className="gambgamb"
                            />
                        </div>
                        <div className="field-checkbox">
                            <label htmlFor="active">Ativo</label>
                            <Checkbox
                                id='active'
                                inputId="active"
                                name='active'
                                value={formik.values.active}
                                checked={formik.values.active}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>
                </div>
            </Dialog >
        </div >
    )
}