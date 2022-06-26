/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';

import './styles.css'

import { useFormik } from 'formik';
import { InsertRestaurantDialogForm, InsertRestaurantDialogSchema, UpdateRestaurantDialogForm, UpdateRestaurantDialogSchema } from './schema';
import { useValidateInput } from '../../../hooks/useValidateInput'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils'
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';

import { Loading } from '../../Loading';

import { RestaurantCategoryService } from '../../../services/restaurant-category/RestaurantCategory';
import { Restaurant, RestaurantCategory } from '../../../services/employee/Models'
import { RestaurantService } from '../../../services/restaurant/RestaurantService';


interface RestaurantDialogProps {
    restaurant?: Restaurant
    visible: boolean
    onHide(): void
}

enum Action {
    INSERT,
    UPDATE
}

export const RestaurantsDialog = ({ restaurant, visible, onHide }: RestaurantDialogProps) => {
    const action: Action = restaurant?.id ? Action.UPDATE : Action.INSERT
    const labelMain = action === Action.INSERT ? "Cadastrar" : "Alterar"

    const [tabPanelCurrent, setTabPanelCurrent] = useState(0)
    const [restaurantCategory, setRestaurantCategory] = useState<any[]>([])
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null);

    const loadingRestaurantCategory = () => {
        setShowSpinnerLoading(true)

        RestaurantCategoryService.get().then((categories: RestaurantCategory[]) => {
            const insertCategories: any[] = []
            categories.forEach(c => {
                insertCategories.push({
                    'name': c.name,
                    'code': c.id,
                })
            })

            setRestaurantCategory(insertCategories)
        })

        setShowSpinnerLoading(false)
    }

    useEffect(() => {
        setTabPanelCurrent(0)
        loadingRestaurantCategory()
    }, [])

    const nextTabPanel = (index: number) => {
        setTabPanelCurrent(index)
    }

    const handleSubmitInsert = async (form: InsertRestaurantDialogForm) => {
        setShowSpinnerLoading(true)

        try {
            await RestaurantService.insert({
                name: form.name,
                description: form.description,
                restaurantCategoryId: form.restaurantCategory.code,
                active: form.active,
                address: {
                    cep: form.cep,
                    city: form.city,
                    country: form.country,
                    district: form.district,
                    number: form.number,
                    state: form.state,
                    street: form.street,
                },
                person: {
                    birthDate: form.birthDatePerson,
                    document: form.document,
                    name: form.namePerson,
                    phone: form.phone,
                },
                user: {
                    email: form.email
                }
            })

            showSuccess('Restaurante cadastrado com sucesso!',
                `Restaurante ${form.name} cadastrado com sucesso no sistema!`)
            onHide()

        } catch (error: any) {
            console.log(error)
            showError(`Falha ao ${labelMain} o restaurante no sistema!`,
                error.message)
        }

        setTabPanelCurrent(0)
        setShowSpinnerLoading(false)
    }

    const handleSubmitUpdate = async (form: UpdateRestaurantDialogForm) => {
        setShowSpinnerLoading(true)

        try {
            await RestaurantService.update({
                name: form.name,
                id: restaurant?.id,
                description: form.description,
                addressId: restaurant?.addressId,
                restaurantCategoryId: form.restaurantCategory.code,
                active: form.active,
                address: {
                    cep: form.cep,
                    city: form.city,
                    country: form.country,
                    district: form.district,
                    number: form.number,
                    state: form.state,
                    street: form.street,
                    id: restaurant?.addressId
                }
            })

            showSuccess('Restaurante alterado com sucesso!',
                `Restaurante ${form.name} alterado com sucesso no sistema!`)
            onHide()

        } catch (error: any) {
            console.log(error)
            showError(`Falha ao alterar o restaurante no sistema!`,
                error.message)
        }
        setTabPanelCurrent(0)
        setShowSpinnerLoading(false)
    }

    const getRestaurantCategoryDefault = (): any => {
        if (action === Action.UPDATE) {
            return {
                name: restaurant?.restaurantCategory?.name,
                code: restaurant?.restaurantCategory?.id
            }
        }

        if (restaurantCategory.length > 0)
            return restaurantCategory[0]

        return null
    }

    let formik: any

    if (action === Action.INSERT) {
        formik = useFormik({
            enableReinitialize: true,
            initialValues: {
                name: '',
                description: '',
                restaurantCategory: getRestaurantCategoryDefault(),
                active: true,
                cep: '',
                street: '',
                district: '',
                city: '',
                number: '',
                country: '',
                state: '',
                namePerson: '',
                birthDatePerson: undefined,
                phone: '',
                document: '',
                email: '',
            },
            validationSchema: InsertRestaurantDialogSchema,
            onSubmit: handleSubmitInsert,
        })
    } else {
        formik = useFormik({
            initialValues: {
                name: restaurant?.name ? restaurant.name : '',
                description: restaurant?.description ? restaurant.description : '',
                restaurantCategory: restaurant?.restaurantCategory ? {
                    name: restaurant.restaurantCategory.name,
                    code: restaurant.restaurantCategoryId
                } : getRestaurantCategoryDefault(),
                active: restaurant?.active ? restaurant.active : true,
                cep: restaurant?.address ? restaurant.address.cep : '',
                street: restaurant?.address ? restaurant.address.street : '',
                district: restaurant?.address ? restaurant.address.district : '',
                city: restaurant?.address ? restaurant.address.city : '',
                number: restaurant?.address ? restaurant.address.number : '',
                country: restaurant?.address ? restaurant.address.country : '',
                state: restaurant?.address ? restaurant.address.state : '',
            },
            validationSchema: UpdateRestaurantDialogSchema,
            onSubmit: handleSubmitUpdate
        })
    }

    const { isFormFieldValid } = useValidateInput(formik)

    const renderFooter = () => {
        if (action === Action.UPDATE) {
            switch (tabPanelCurrent) {
                case 0:
                    return (
                        <Button
                            label='Próximo'
                            onClick={() => nextTabPanel(1)}
                        />
                    )
                case 1:
                    return (
                        <div>
                            <Button label='Voltar' onClick={() => nextTabPanel(0)}></Button>
                            <Button type='submit' label={labelMain} onClick={() => formik.handleSubmit()}></Button>
                        </div>
                    )
            }
        } else {
            switch (tabPanelCurrent) {
                case 0:
                    return (
                        <Button
                            label='Próximo'
                            onClick={() => nextTabPanel(1)}
                        />
                    )
                case 1:
                    return (
                        <div>
                            <Button
                                label='Voltar'
                                onClick={() => nextTabPanel(0)}
                            />
                            <Button
                                label='Próximo'
                                onClick={() => nextTabPanel(2)}
                            />
                        </div>
                    )
                case 2:
                    return (
                        <div>
                            <Button label='Voltar' onClick={() => nextTabPanel(1)}></Button>
                            <Button type='submit' label={labelMain} onClick={async () => await formik.handleSubmit()}></Button>
                        </div>
                    )
            }
        }
    }

    const onChangeRestaurantCategory = (value: any) => {
        formik.setFieldValue("restaurantCategory", value)
    }

    const showSuccess = (sumary, detail: string) => {
        toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
    }

    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    return (
        <div className='container-restaurants-dialog'>
            <Toast ref={toast} />
            <Loading visible={showSpinnerLoading} />
            <Dialog header={action === Action.UPDATE ? 'Alterar Cadastro do ' + formik.values.name : 'Cadastrar restaurante'} onHide={onHide} visible={visible} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} footer={renderFooter}>
                <TabView className="tabview-header-icon" activeIndex={tabPanelCurrent} onTabChange={(e) => setTabPanelCurrent(e.index)}>
                    <TabPanel header="Restaurante" disabled={tabPanelCurrent !== 0}>
                        <div className="restaurants-dialog-groups">
                            <div className="restaurants-dialog-group">
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
                                    <Dropdown
                                        value={formik.values.restaurantCategory || restaurantCategory[0]}
                                        options={restaurantCategory}
                                        onChange={(e) => onChangeRestaurantCategory(e.target.value)}
                                        optionLabel="name"
                                        name="restaurantCategory"
                                    />
                                    <label htmlFor="restaurantCategory">Categoria</label>
                                </span>
                            </div>

                            <div className="restaurants-dialog-group">
                                <span className="p-float-label">
                                    <InputText
                                        id="description"
                                        autoComplete='off'
                                        value={formik.values.description}
                                        name="description"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('description') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="description">Descrição</label>
                                </span>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Endereço" disabled={tabPanelCurrent !== 1}>
                        <div className="restaurants-dialog-groups">
                            <div className="restaurants-dialog-group">
                                <span className="p-float-label">
                                    <InputText
                                        id="country"
                                        value={formik.values.country}
                                        name="country"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('country') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="country">País</label>
                                </span>
                                <span className="p-float-label">
                                    <InputMask
                                        id="cep"
                                        mask="99999-999"
                                        value={formik.values.cep}
                                        name="cep"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('cep') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="cep">CEP</label>
                                </span>
                            </div>

                            <div className="restaurants-dialog-group">
                                <span className="p-float-label">
                                    <InputText
                                        id="state"
                                        value={formik.values.state}
                                        name="state"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('state') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="state">Estado</label>
                                </span>
                                <span className="p-float-label">
                                    <InputText
                                        id="city"
                                        value={formik.values.city}
                                        name="city"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('city') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="city">Cidade</label>
                                </span>

                            </div>
                            <div className="restaurants-dialog-group">
                                <span className="p-float-label">
                                    <InputText
                                        id="district"
                                        value={formik.values.district}
                                        name="district"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('district') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="district">Bairro</label>
                                </span>
                            </div>

                            <div className="restaurants-dialog-group group-street">
                                <span className="p-float-label">
                                    <InputText
                                        id="street"
                                        value={formik.values.street}
                                        name="street"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('street') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="street">Rua</label>
                                </span>
                                <span className="p-float-label">
                                    <InputText
                                        id="number"
                                        value={formik.values.number}
                                        name="number"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('number') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="number">Número</label>
                                </span>
                            </div>
                        </div>
                    </TabPanel>
                    {action === Action.INSERT &&
                        <TabPanel header="Gerente" disabled={tabPanelCurrent !== 2}>
                            <div className="restaurants-dialog-groups">
                                <div className="restaurants-dialog-group">
                                    <span className="p-float-label">
                                        <InputText
                                            id="namePerson"
                                            autoComplete='off'
                                            value={formik.values.namePerson}
                                            name="namePerson"
                                            onChange={formik.handleChange}
                                            className={classNames({ 'p-invalid': isFormFieldValid('namePerson') }, 'input p-inputtext-sm block mb-2')}
                                        />
                                        <label htmlFor="namePerson">Nome completo</label>
                                    </span>
                                </div>
                                <div className="restaurants-dialog-group">
                                    <span className="p-float-label">
                                        <InputMask
                                            id="document"
                                            mask="999.999.999-99"
                                            value={formik.values.document}
                                            name="document"
                                            onChange={formik.handleChange}
                                            className={classNames({ 'p-invalid': isFormFieldValid('document') }, 'input p-inputtext-sm block mb-2')}
                                        />
                                        <label htmlFor="document">CPF</label>
                                    </span>
                                    <span className="p-float-label">
                                        <InputMask
                                            id="phone"
                                            mask="(99) 99999-9999"
                                            value={formik.values.phone}
                                            name="phone"
                                            onChange={formik.handleChange}
                                            className={classNames({ 'p-invalid': isFormFieldValid('phone') }, 'input p-inputtext-sm block mb-2')}
                                        />
                                        <label htmlFor="phone">Telefone</label>
                                    </span>
                                </div>
                            </div>
                            <div className="restaurants-dialog-group">
                                <span className="p-float-label">
                                    <Calendar
                                        id="birthDatePerson"
                                        value={formik.values.birthDatePerson}
                                        name="birthDatePerson"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('birthDatePerson') }, 'input p-inputtext-sm block mb-2')}
                                        dateFormat="dd/mm/yy"
                                        showIcon
                                        onMonthChange={(e) => console.log(e)}
                                    />
                                    <label htmlFor="birthDatePerson">Data de nascimento</label>
                                </span>
                                <span className="p-float-label">
                                    <InputText
                                        id="email"
                                        value={formik.values.email}
                                        name="email"
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('email') }, 'input p-inputtext-sm block mb-2')}
                                    />
                                    <label htmlFor="email">E-mail</label>
                                </span>
                            </div>
                        </TabPanel>
                    }
                </TabView>
            </Dialog>
        </div>
    )
}