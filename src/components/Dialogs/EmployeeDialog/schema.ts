import * as Yup from 'yup'

export interface EmployeeDialogForm {
    name: string | ''
    document: string | ''
    cellphone: string | ''
    dateBirth: Date | undefined
    email: string | ''
    password: string | ''
    userType: any
}

export const EmployeeDialogSchema = Yup.object().shape({
    name: Yup.string().required('Informe o nome!'),
    document: Yup.string().required('Informe o CPF!'),
    cellphone: Yup.string().required('Informe o telefone!'),
    dateBirth: Yup.string().required('Informe a data de nascimento!'),
    email: Yup.string().email().required('Informe o e-mail!'),
    password: Yup.string().required('Informe a senha!'),
    userType: Yup.object().shape({
        name: Yup.string().required()
    }).required('Informe o tipo de usuário!')
})