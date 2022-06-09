import * as Yup from 'yup'

export interface EmployeeDialogForm {
    name: string | ''
    document: string | ''
    cellphone: string | ''
    dateBirth: Date | undefined
    country: string | ''
    cep: string | ''
    state: string | ''
    city: string | ''
    district: string | ''
    street: string | ''
    number: string | ''
    email: string | ''
    password: string | ''
    userType: any
}

export const EmployeeDialogSchema = Yup.object().shape({
    name: Yup.string().required('Informe o nome!'),
    document: Yup.string().required('Informe o CPF!'),
    cellphone: Yup.string().required('Informe o telefone!'),
    dateBirth: Yup.string().required('Informe a data de nascimento!'),
    country: Yup.string().required('Informe o país!'),
    cep: Yup.string().required('Informe o cep!'),
    state: Yup.string().required('Informe o estado!'),
    city: Yup.string().required('Informe a cidade!'),
    district: Yup.string().required('Informe o bairro!'),
    street: Yup.string().required('Informe a rua!'),
    number: Yup.number().required('Informe o número!'),
    email: Yup.string().email().required('Informe o e-mail!'),
    password: Yup.string().required('Informe a senha!'),
    userType: Yup.object().shape({
        name: Yup.string().required()
    }).required('Informe o tipo de usuário!')
})