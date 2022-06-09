import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Informe o seu e-mail!'),
    password: Yup.string().required('Informe a sua senha!')
})
