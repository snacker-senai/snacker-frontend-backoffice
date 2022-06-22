import React, { useState, useRef, useEffect } from 'react';

import './styles.css'

import { ProductCategory } from '../../services/product/Models';
import { ProductsCategoryDialog } from '../../components/Dialogs/CategoriesDialog';
import { ProductCategoryService } from '../../services/product-category/ProductCategoryService';

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar';
import { Loading } from '../../components/Loading';
import { Fieldset } from 'primereact/fieldset';
import { Tag } from 'primereact/tag';
import { InputSwitch } from 'primereact/inputswitch';

export const Categories = () => {
    const [productsCategory, setProductsCategory] = useState<ProductCategory[]>()
    const [visibleDialog, setVisibleDialog] = useState(false)
    const [productCategoryCurrent, setProductCategoryCurrent] = useState<ProductCategory | undefined>(undefined)
    const toast = useRef<any>(null)
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)

    useEffect(() => {
        buildProductsCategory()
    }, [])

    const buildProductsCategory = async () => {
        setShowSpinnerLoading(true)

        await ProductCategoryService.get().then((data: ProductCategory[]) => setProductsCategory(data))

        setShowSpinnerLoading(false)
    }

    const leftToolbarTemplate = () => {
        return (
            <Button
                label="Adicionar categoria"
                icon="pi pi-plus"
                className="p-button-primary mr-2"
                onClick={() => {
                    setProductCategoryCurrent(undefined)
                    setVisibleDialog(true)
                }}
            />
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" />
            </span>
        )
    }

    const updateStatus = async (category: ProductCategory) => {
        setShowSpinnerLoading(true)
        try {
            await ProductCategoryService.set({
                id: category.id,
                name: category.name,
                active: !category.active,
            })
            showSuccess('Atualizado com sucesso!', 'Status da categoria alterado para com sucesso!')
            buildProductsCategory()
        } catch (error: any) {
            showError('Erro ao atualizar status', 'Erro: ' + error.message)
        }

        setShowSpinnerLoading(false)
    }

    const actionBodyTemplate = (row: ProductCategory) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-info p-mx-2"
                    onClick={() => {
                        setProductCategoryCurrent(row)
                        setVisibleDialog(true)
                    }} />
                <InputSwitch
                    checked={row.active}
                    onChange={async () => await updateStatus(row)}
                />
            </React.Fragment>
        )
    }

    const showSuccess = (sumary, detail: string) => {
        toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
    }

    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    const loadingAndSetVisibleDialog = (visible: boolean) => {
        setVisibleDialog(visible)
        buildProductsCategory()
    }

    const statusCategory = (row: ProductCategory) => {
        if (row.active) {
            return (
                <Tag
                    className="mr-2"
                    icon="pi pi-check"
                    severity="success"
                    value="ATIVO"
                />
            )
        }

        return (
            <Tag
                className="mr-2"
                icon="pi pi-exclamation-triangle"
                severity="warning"
                value="INATIVO"
            />
        )
    }

    return (
        <div className="container-categories">
            <Toast ref={toast} />
            <Loading visible={showSpinnerLoading} />
            <ProductsCategoryDialog onHide={() => loadingAndSetVisibleDialog(false)} visible={visibleDialog} productCategory={productCategoryCurrent} />
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <div className='panel'>
                <Fieldset legend="Aviso" toggleable>
                    <p>Ao inativar uma categoria, todos os produtos respectivos ao mesmo serão invativados juntos!.</p>
                </Fieldset>
                <DataTable value={productsCategory} >
                    <Column
                        body={statusCategory}
                        header='Status'
                    />
                    <Column
                        field='name'
                        header='Nome'
                    />
                    <Column
                        style={{ width: '10rem' }}
                        field=""
                        header=""
                        body={actionBodyTemplate}
                        exportable={false}
                        className='categories-action'
                    />
                </DataTable>
            </div>
        </div>
    )
}