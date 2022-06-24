import React, { useState, useRef, useEffect } from 'react';

import './styles.css'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar';
import { InputSwitch } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';

import { Loading } from '../../components/Loading';

import { Restaurant } from '../../services/employee/Models';
import { RestaurantService } from '../../services/restaurant/RestaurantService';
import { RestaurantsDialog } from '../../components/Dialogs/RestaurantsDialog';

export const Restaurants = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>()
    const [visibleDialog, setVisibleDialog] = useState(false)
    const [restaurantCurrent, setRestaurantCurrent] = useState<Restaurant | undefined>(undefined)
    const toast = useRef<any>(null)
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)

    useEffect(() => {
        buildRestaurant()
    }, [])

    const buildRestaurant = async () => {
        setShowSpinnerLoading(true)

        await RestaurantService.get().then((data: Restaurant[]) => setRestaurants(data))

        setShowSpinnerLoading(false)
    }

    const leftToolbarTemplate = () => {
        return (
            <Button
                label="Adicionar restaurante"
                icon="pi pi-plus"
                className="p-button-primary mr-2"
                onClick={() => {
                    setRestaurantCurrent(undefined)
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

    const changeStatusRestaurant = async (row: Restaurant) => {
        setShowSpinnerLoading(true)

        try {
            await RestaurantService.update({
                name: row.name,
                id: row.id,
                description: row.description,
                addressId: row.addressId,
                restaurantCategoryId: row.restaurantCategoryId,
                active: !row.active,
                address: {
                    cep: row.address.cep,
                    city: row.address.city,
                    country: row.address.country,
                    district: row.address.district,
                    number: row.address.number,
                    state: row.address.state,
                    street: row.address.street,
                    id: row.address.id
                }
            })
            showSuccess("Alterado o status do restaurante com sucesso!",
                ``
            )
            buildRestaurant()
        } catch (error: any) {
            showError("Erro ao alterar o status do restaurante!", `Erro ao alterar: ${error.message}`)
        }
        setShowSpinnerLoading(false)
    }

    const actionBodyTemplate = (row: Restaurant) => {
        return (
            <div className='restaurants-action'>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-info mr-2"
                    onClick={() => {
                        setRestaurantCurrent(row)
                        setVisibleDialog(true)
                    }} />
                <InputSwitch
                    checked={row.active}
                    onChange={async () => changeStatusRestaurant(row)}
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
        buildRestaurant()
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
            <RestaurantsDialog onHide={() => loadingAndSetVisibleDialog(false)} visible={visibleDialog} restaurant={restaurantCurrent} />
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <div className='panel'>
                <DataTable value={restaurants}>
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
                        field='description'
                        header='Descrição'
                    />
                    <Column
                        field='restaurantCategory.name'
                        header='Categoria'
                    />
                    <Column
                        field='address.country'
                        header='País'
                    />
                    <Column
                        field='address.state'
                        header='Estado'
                    />
                    <Column
                        field='address.city'
                        header='Cidade'
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