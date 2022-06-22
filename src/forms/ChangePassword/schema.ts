import * as Yup from 'yup'

export const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Informe a senha antiga!'),
    newPassword: Yup.string().required('Informe a nova senha!')
})
