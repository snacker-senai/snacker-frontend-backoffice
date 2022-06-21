import * as Yup from 'yup'

export const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string().required('Informe sua senha!'),
    confirmPassword: Yup.string().required('Informe a confirmação da senha!')
})
