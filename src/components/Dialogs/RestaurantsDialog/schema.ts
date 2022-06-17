import * as Yup from 'yup'

export interface InsertRestaurantDialogForm {
    name: string | ''
    description: string | ''
    restaurantCategory: any
    active: boolean
    cep: string | ''
    street: string | ''
    district: string | ''
    city: string | ''
    number: string | ''
    country: string | ''
    state: string | ''
    namePerson: string | ''
    birthDatePerson: Date | undefined
    phone: string | ''
    document: string | ''
    email: string | ''
}

export interface UpdateRestaurantDialogForm {
    name: string | ''
    description: string | ''
    restaurantCategory: any
    active: boolean
    cep: string | ''
    street: string | ''
    district: string | ''
    city: string | ''
    number: string | ''
    country: string | ''
    state: string | ''
}

export const InsertRestaurantDialogSchema = Yup.object().shape({
    name: Yup.string().required('Informe o nome!'),
    description: Yup.string().required('Informe a descrição!'),
    restaurantCategory: Yup.object().shape({
        name: Yup.string().required()
    }).required('Informe a categoria!'),
    active: Yup.boolean(),
    cep: Yup.string().required('Informe o CEP!'),
    street: Yup.string().required('Informe a estrada!'),
    district: Yup.string().required('Informe o bairro!'),
    city: Yup.string().required('Informe a cidade!'),
    number: Yup.string().required('Informe o número!'),
    country: Yup.string().required('Informe o país!'),
    state: Yup.string().required('Informe o estado!'),
    namePerson: Yup.string().required('Informe o nome do Gerente!'),
    birthDatePerson: Yup.string().required('Informe a data de nascimento do Gerente!'),
    phone: Yup.string().required('Informe o telefone do Gerente!'),
    document: Yup.string().required('Informe o CPF do Gerente!'),
    email: Yup.string().required('Informe o e-mail do Gerente!'),
})

export const UpdateRestaurantDialogSchema = Yup.object().shape({
    name: Yup.string().required('Informe o nome!'),
    description: Yup.string().required('Informe a descrição!'),
    restaurantCategory: Yup.object().shape({
        name: Yup.string().required()
    }).required('Informe a categoria!'),
    active: Yup.boolean(),
    cep: Yup.string().required('Informe o CEP!'),
    street: Yup.string().required('Informe a estrada!'),
    district: Yup.string().required('Informe o bairro!'),
    city: Yup.string().required('Informe a cidade!'),
    number: Yup.string().required('Informe o número!'),
    country: Yup.string().required('Informe o país!'),
    state: Yup.string().required('Informe o estado!'),
})
