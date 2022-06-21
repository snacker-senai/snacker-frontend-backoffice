import React, { useState, useRef, useEffect } from 'react';

import './styles.css'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar';
import { ProductCategory } from '../../services/product/Models';
import { ProductCategoryService } from '../../services/product-category/ProductCategoryService';
import { ProductsCategoryDialog } from '../../components/Dialogs/CategoriesDialog';
import { Loading } from '../../components/Loading';

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
                className="p-button-info mr-2"
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

    const actionBodyTemplate = (row: ProductCategory) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success p-mx-2"
                    onClick={() => {
                        setProductCategoryCurrent(row)
                        setVisibleDialog(true)
                    }} />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning p-mx-2"
                    onClick={async () => {
                        setShowSpinnerLoading(true)

                        try {
                            await ProductCategoryService.del(row.id)
                            showSuccess("Categoria excluído com sucesso!",
                                `Categoria ${row.name} removido do sistema!`
                            )
                            buildProductsCategory()
                        } catch (error: any) {
                            showError("Erro ao remover categoria!", `Erro ao remover: ${error.message}`)
                        }

                        setShowSpinnerLoading(false)
                    }}
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

    return (
        <div className="container-categories">
            <Toast ref={toast} />
            <Loading visible={showSpinnerLoading} />
            <ProductsCategoryDialog onHide={() => loadingAndSetVisibleDialog(false)} visible={visibleDialog} productCategory={productCategoryCurrent} />
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <div className='panel'>
                <DataTable value={productsCategory} >
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