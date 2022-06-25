import { useEffect, useRef, useState } from 'react';

import './styles.css';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';

import { Loading } from '../../components/Loading';

import { RestaurantCategoriesDialog } from '../../components/Dialogs/RestaurantCategoriesDialog';
import { Restaurant, RestaurantCategory } from '../../services/employee/Models';
import { RestaurantCategoryService } from '../../services/restaurant-category/RestaurantCategory';
import { InputSwitch } from 'primereact/inputswitch';

export const RestaurantCategories = () => {
    const [categories, setCategories] = useState<RestaurantCategory[]>()
    const [visibleDialog, setVisibleDialog] = useState(false)
    const [currentCategory, setCurrentCategory] = useState<RestaurantCategory>()
    const toast = useRef<any>(null)
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)

    useEffect(() => {
      buildCategories()
    }, [])

    const buildCategories = async () => {
      setShowSpinnerLoading(true)

      const categories = await RestaurantCategoryService.get()
      setCategories(categories)

      setShowSpinnerLoading(false)
    }

    const leftToolbarTemplate = () => {
      return (
        <Button
          label="Adicionar categoria"
          icon="pi pi-plus"
          className="p-button-primary mr-2"
          onClick={() => {
            setCurrentCategory(undefined)
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

    const changeStatus = async (data: RestaurantCategory) => {
        setShowSpinnerLoading(true)

        try {
            await RestaurantCategoryService.createOrUpdate({
              id: data.id,
              name: data.name,
              active: !data.active
            })
            showSuccess('Categoria atualizada com sucesso!', '')
            buildCategories()
        } catch (error: any) {
            showError("Erro ao alterar o status do restaurante!", `Erro ao alterar: ${error.message}`)
        }
        setShowSpinnerLoading(false)
    }

    const actionBodyTemplate = (data: RestaurantCategory) => {
        return (
            <div className='restaurants-action'>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-info mr-2"
                    onClick={() => {
                        setCurrentCategory(data)
                        setVisibleDialog(true)
                    }} />
                <InputSwitch
                    checked={data.active}
                    onChange={async () => changeStatus(data)}
                />
            </div>
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
        buildCategories()
    }

    const statusRestaurant = (row: Restaurant) => {
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
        <div className="container-restaurants">
            <Toast ref={toast} />
            <Loading visible={showSpinnerLoading} />
            <RestaurantCategoriesDialog 
              onHide={() => loadingAndSetVisibleDialog(false)} 
              visible={visibleDialog} 
              category={currentCategory} 
            />
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <div className='panel'>
                <DataTable
                  value={categories}
                  stripedRows
                  paginator
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" 
                  rows={15}
                >
                    <Column
                        field=""
                        header="Status"
                        body={statusRestaurant}
                        exportable={false}
                    />
                    <Column
                        field='name'
                        header='Nome'
                    />
                    <Column
                        style={{ width: '10rem' }}
                        field=""
                        header="Editar/Status"
                        body={actionBodyTemplate}
                        exportable={false}
                    />
                </DataTable>
            </div>
        </div>
    )
}